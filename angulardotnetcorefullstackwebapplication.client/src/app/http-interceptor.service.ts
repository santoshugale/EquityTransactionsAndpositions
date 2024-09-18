import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
    // inject required services here
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // before sending the request to backend
    // update the request to send additional details like
    // get the csrf token from cookies and add to the header 
    const modifiedReq = req.clone({
      setHeaders: { 'X-XSRF-TOKEN': 'csrfToken' },
    });
    console.log('http handler');
    return next.handle(modifiedReq);
  }
}
