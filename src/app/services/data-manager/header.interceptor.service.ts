import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
  
  @Injectable()
  export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const bearerToken =  "bpbqwtQHgFjkJAK8Xhwf7pz2uYJwpq4cPu0zuebP7VI-Vhr8rsQ";
      const clonedRequest = req.clone({ 
        headers: req.headers.set('Authorization', `Bearer ${bearerToken}`)
        .set('Accept', 'application/vnd.neptune+json; version=1')
     });
      return next.handle(clonedRequest);
    }
  }