import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable()
export class MetroAuthInterceptor implements HttpInterceptor {
  metroApiKey = environment.metroApiKey;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ setHeaders: { api_key: this.metroApiKey } });
    return next.handle(request);
  }

}
