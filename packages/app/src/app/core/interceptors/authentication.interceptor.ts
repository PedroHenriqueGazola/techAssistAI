import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authenticationService.getAuthenticatedUser()).pipe(
      switchMap((authenticatedUser) => {
        if (!authenticatedUser?.token) {
          return next.handle(req);
        }

        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authenticatedUser.token}`,
          },
        });

        return next.handle(cloned);
      })
    );
  }
}
