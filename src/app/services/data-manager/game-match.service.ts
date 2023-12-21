import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError} from 'rxjs'
import { NeptuneApi } from '../http-api';

@Injectable({
  providedIn: 'root'
})
export class GameMatchService {

  constructor(private _http: HttpClient) {}

  getDetailSerieForMatch(idGame: number): Observable<any> {
    const url = `${NeptuneApi.detailSerieMatch}${idGame}?withMatchSummaries=true`;
    return this._http.get<any>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getDetailGameForMatch(idMatch: number, idGame: number): Observable<any> {
    const url = `${NeptuneApi.detailGameMatch}${idMatch}/summary?seriesId=${idGame}&postgame=true`;
    return this._http.get<any>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getDetailH2H(idteamHome: number, idTeamAway: number): Observable<any> {
    const url = `${NeptuneApi.teams}${idteamHome}/${idTeamAway}/h2h`;
    return this._http.get<any>(url).pipe(retry(1), catchError(this.errorHandl));
  }
 
  getPlayers(idRosterHome: number, idRosterAway: number): Observable<any> {
    const url = `${NeptuneApi.listPlayers}${idRosterHome},${idRosterAway}`;
    return this._http.get<any>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getHeroesImages(): Observable<any[]> {
    return this._http.get<any[]>('./assets/data/heroes.json');
  }

  getRealTime(idGame: number): Observable<any> {
    const url = `${NeptuneApi.detailGameMatch}${idGame}/summary/real-time`;
    return this._http.get<any>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  

 // Error handling
 errorHandl(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(() => {
    return errorMessage;
  });
}
}