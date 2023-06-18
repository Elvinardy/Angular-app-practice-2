import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

// HTTP INTERCEPTORS - To intercept information passed from client to server
// To automatically add headers to requests (eg. tokens)
// Cannot modify original request
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request Interceptor', request)
    // to clone original request
    // only handles Requests not Response
    if(request.method === 'POST') {
      // if statement to conditionally add headers only for POST requests
      const newRequest = request.clone({ headers: new HttpHeaders({ 'token': '123456abc'})});
      return next.handle(newRequest);

    }
    return next.handle(request);
  }
}
