import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/authService/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injecte le AuthService
  const router = inject(Router); // Injecte le Router pour les redirections

  return authService.checkAuth().pipe(
    map((response) => {
      const isAuthenticated = !!response;
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }),
    catchError((error) => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
