/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationInterceptor } from './authentication-interceptor';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { CachingInterceptor } from './cachinginterceptor';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';

// import { CachingInterceptor } from './caching-interceptor';
// import { EnsureHttpsInterceptor } from './ensure-https-interceptor';
// import { LoggingInterceptor } from './logging-interceptor';
// import { NoopInterceptor } from './noop-interceptor';
// import { TrimNameInterceptor } from './trim-name-interceptor';
// import { UploadInterceptor } from './upload-interceptor';

/** Http interceptor providers in outside-in order */
export const HttpInterceptorProviders = [
  //   { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },

  //   { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
  //   { provide: HTTP_INTERCEPTORS, useClass: TrimNameInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true, },
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },

  //   { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  //   { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  { provide: RequestCache, useClass: RequestCacheWithMap }
  // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },

];
