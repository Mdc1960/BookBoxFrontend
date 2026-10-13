import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken =getJwtToken();
  const router = inject(Router)
  if (jwtToken){
   req= req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },

    });
  }
  return next(req).pipe(
    catchError((error) => {
        if (error.status === 401 && jwtToken) {
          localStorage.removeItem('JWT_TOKEN');
          localStorage.removeItem('USERNAME');

          router.navigate(['/authentication']);
        }

        return throwError(() => error);
      })
  );
};

function getJwtToken() : string | null {
  return localStorage.getItem('JWT_TOKEN');

}
