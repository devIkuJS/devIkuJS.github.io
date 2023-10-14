import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError} from 'rxjs'
import { HttpApi } from '../http-api';
import { ApiMatch} from '../interfaces/match.interface';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  constructor(private _http: HttpClient) {}

  getTopMatch(): Observable<ApiMatch[]> {
    const url = HttpApi.topMatch;
    return this._http.get<ApiMatch[]>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getUpcomingMatches(): Observable<ApiMatch[]> {
    const url = HttpApi.upcomingMatches;
    return this._http.get<ApiMatch[]>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getLiveMatches(): Observable<ApiMatch[]> {
    const url = HttpApi.liveMatches;
    return this._http.get<ApiMatch[]>(url).pipe(retry(1), catchError(this.errorHandl));
  }

  getRecentMatches(): Observable<ApiMatch[]> {
    const url = HttpApi.recentMatches;
    return this._http.get<ApiMatch[]>(url).pipe(retry(1), catchError(this.errorHandl));
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