import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GameMatchService {

  constructor(private _http: HttpClient) {}

  getDetailForMatch(matchId: number): Observable<any[]> {
    const url = `/api/matches/${matchId}`;
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