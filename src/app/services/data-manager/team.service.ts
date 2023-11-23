import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError, map} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private _http: HttpClient) {}

  getInfoTeam(teamId: number): Observable<any> {
    const url = `/api/teams/${teamId}`;
    //const url = `/api/teams/${teamId}/matches`;
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