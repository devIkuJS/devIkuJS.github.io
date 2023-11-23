import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, retry, throwError, map} from 'rxjs'
import { ApiPandaScore, OpenDota } from '../http-api';
import { ApiMatch} from '../interfaces/match.interface';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  constructor(private _http: HttpClient) {}

  getTopMatch(): Observable<ApiMatch[]> {
    const url = ApiPandaScore.topMatch;
    return this._http.get<ApiMatch[]>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getUpcomingMatches(): Observable<ApiMatch[]> {
    const url = ApiPandaScore.upcomingMatches;
    return this._http.get<ApiMatch[]>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getLiveMatches(): Observable<ApiMatch[]> {
    const url = ApiPandaScore.liveMatches;
    return this._http.get<ApiMatch[]>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getRecentMatches(): Observable<any[]> {
    //const url = OpenDota.recentMatches;
    const url = "/api/proMatches";
    return this._http.get<any[]>(url).pipe(map((el: any) => el.slice(0, 10)), 
    retry(1), catchError(this.errorHandl));
  }

  getTeams(): Observable<any[]> {
    //const url = OpenDota.recentMatches;
    const url = "/api/teams";
    return this._http.get<any[]>(url).pipe(retry(1), catchError(this.errorHandl));
     
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