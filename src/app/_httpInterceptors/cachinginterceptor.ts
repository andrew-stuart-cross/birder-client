import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpResponse,
  HttpInterceptor, HttpHandler
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { RequestCache } from '../_sharedServices/request-cache.service';


/**
 * If request is cachable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cachable,
 * pass request through to next()
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCache) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // continue if not cachable.
    if (!isCachable(request)) { return next.handle(request); }

    const cachedResponse = this.cache.get(request);
    // cache-then-refresh
    if (request.headers.get('x-refresh')) {
      const results$ = sendRequest(request, next, this.cache);
      return cachedResponse ?
        results$.pipe(startWith(cachedResponse)) :
        results$;
    }
    // cache-or-fetch
    return cachedResponse ?
      of(cachedResponse) : sendRequest(request, next, this.cache);
  }
}

/** Is this request cachable? */
function isCachable(request: HttpRequest<any>): boolean {
  return request.method === 'GET'
    && request.url.indexOf('api/observationfeed') !== 0
    && request.url.indexOf('api/observationread') !== 0
    && request.url.indexOf('api/observationanalysis') !== 0  // do not cache requests containing 'api/observationAnalysis'
    && request.url.indexOf('api/list/top') !== 0
    && request.url.indexOf('api/userprofile') !== 0
    && request.url.indexOf('api/network') !== 0
    && request.url.indexOf('api/manage') !== 0
    && request.url.indexOf('api/account/check-username') !== 0;
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
  request: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCache): Observable<HttpEvent<any>> {

  return next.handle(request).pipe(
    tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(request, event); // Update the cache.
      }
    })
  );
}
