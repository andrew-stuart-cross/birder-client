import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ObservationCountService } from '../_analysis/observation-count/observation-count.service';
import { ObservationTopFiveService } from '../_analysis/observation-top-five/observation-top-five.service';
import { IObservation } from './i-observation.dto';
import { ICreateObservation } from './observation-create/i-create-observation.dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ObservationCrudService {

  constructor(private readonly _http: HttpClient,
    private readonly _obsCountService: ObservationCountService,
    private readonly _obstopFiveService: ObservationTopFiveService) { }

  public getObservation(id: string): Observable<IObservation> {
    const options = id ?
      { params: new HttpParams().append('id', id.toString()) } : {};

    return this._http.get<IObservation>('api/Observation', options);
  }

  public addObservation(model: ICreateObservation): Observable<IObservation> {
    return this._http.post<IObservation>('api/Observation/Create', model, httpOptions)
      .pipe(tap(() => { this._onObservationsChanged(); }));
  }

  public updateObservation(id: string, viewModel: any): Observable<IObservation> {
    const options = id ?
      { params: new HttpParams().set('id', id.toString()) } :
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this._http.put<IObservation>('api/Observation/Update', viewModel, options)
      .pipe(tap(() => { this._onObservationsChanged(); }));
  }

  public deleteObservation(id: number): Observable<Number> {
    const options = id ?
      { params: new HttpParams().set('id', id.toString()) } : {};

    return this._http.delete<Number>('api/Observation/Delete', options)
      .pipe(tap(() => { this._onObservationsChanged(); }));
  }


  private _onObservationsChanged(): void {
    this._obsCountService.getData();
    this._obstopFiveService.getData();
  }
}
