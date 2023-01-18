import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { INetworkUser } from '../i-network-user.dto';
import { NetworkSummaryService } from '../network-summary/network-summary.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NetworkUserService {

  constructor(private readonly _http: HttpClient, private readonly _service: NetworkSummaryService) { }

  postFollowUser(viewModel: INetworkUser): Observable<INetworkUser> {
    return this._http.post<INetworkUser>('api/network/follow', viewModel, httpOptions)
      .pipe(tap(_ => { this._onNetworkChanged(); }));
  }

  postUnfollowUser(viewModel: INetworkUser): Observable<INetworkUser> {
    return this._http.post<INetworkUser>('api/network/unfollow', viewModel, httpOptions)
      .pipe(tap(_ => { this._onNetworkChanged(); }));
  }

  // todo: move to AnnounceChangesService...
  private _onNetworkChanged(): void {
    this._service.getData();
  }
}
