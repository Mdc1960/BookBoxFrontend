import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/AuthenticationService/authentication.service'

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/authentication']);
  }

  if (!authService.isAdmin()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};

