import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/authService/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injecte le AuthService
  const router = inject(Router); // Injecte le Router pour les redirections

  return authService.checkAuth().pipe(
    map(() => true), // Si l'utilisateur est authentifié, autorise l'accès
    catchError(() => {
      // Si une erreur survient (non authentifié), redirige vers /login
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }, // Garde l'URL cible pour une redirection après login
      });
      return of(false); // Bloque l'accès à la route
    })
  );
};
