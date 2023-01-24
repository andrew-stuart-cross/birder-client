import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ITweet } from '../i-tweet.dto';

@Injectable({
  providedIn: 'root'
})
export class TweetDayService implements OnDestroy {
  private _subscription = new Subject();
  private readonly _isError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _tweet$: BehaviorSubject<ITweet | null> = new BehaviorSubject<ITweet | null>(null);

  constructor(private readonly _httpClient: HttpClient) { }

  public get isError(): Observable<boolean> {
    return this._isError$.asObservable();
  }

  public get getTweet(): Observable<ITweet | null> {
    return this._tweet$.asObservable();
  }

  public getData(): void {
    this._httpClient.get<ITweet>('api/tweets')
      .pipe(takeUntil(this._subscription))
      .subscribe({
        next: (response) => {
          this._tweet$.next(response);
        },
        error: (e) => { this._handleError(e); },
        complete: () => { if (this._isError$) this._isError$.next(false); }
      });
  }

  private _handleError(error: any) {
    this._isError$.next(true);
  }

  ngOnDestroy(): void {
    this._subscription.next('');
    this._subscription.complete();
  }
}