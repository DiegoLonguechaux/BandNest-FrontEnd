import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Initialisation CSRF pour Sanctum (évite les erreurs CSRF)
   */
  initializeCsrf(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    }).pipe(
      tap(() => console.log('CSRF cookie initialisé.')),
      catchError((error) => {
        console.error('Erreur lors de l\'initialisation CSRF :', error);
        return of(null);
      })
    );
  }

  /**
   * Connexion utilisateur
   */
   login(credentials: { email: string; password: string }): Observable<any> {
    // this.initializeCsrf();
    return this.initializeCsrf().pipe(
      switchMap(() => {
        // console.log(document.cookie);
        return this.http.post(`${environment.apiUrl}/login`, credentials, {
          withCredentials: true,
          headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }

        }).pipe(
          tap((response: any) => {
            console.log('Connexion réussie.');
            this.isLoggedInSubject.next(true);
            // this.currentUserSubject.next(response.user); // Stocker les infos utilisateur
          }),
          catchError((error) => {
            console.error('Erreur lors de la connexion :', error);
            this.isLoggedInSubject.next(false);
            // this.currentUserSubject.next(null);
            return of(null);
          })
        );
      })
    );
  }

  // login
  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(`${environment.apiUrl}/login`, credentials, {
  //     headers: { 'Accept': 'application/json' },}).pipe(
  //     tap((response: any) => {
  //       if (response.authorisation?.token) {
  //         localStorage.setItem('auth_token', response.authorisation.token);
  //         this.isLoggedInSubject.next(true);
  //       } else {
  //         console.warn('Aucun token reçu après login.');
  //       }
  //     }),
  //     catchError((error) => {
  //       this.isLoggedInSubject.next(false);
  //       return of(null);
  //     })
  //   );
  // }

  // register
  register(data: { firstname: string; lastname: string; name: string; email: string; password: string; password_confirmation: string; role: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, data, {
      withCredentials: true,
    }).pipe(
      tap(() => console.log('Inscription réussie')),
      catchError((error) => {
        console.error('Erreur lors de l\'inscription :', error);
        return of(null);
      })
    );
  }

  /**
   * Déconnexion utilisateur
   */
  // logout(): void {
  //   this.http.post(`${environment.apiUrl}/logout`, {}, {
  //     withCredentials: true,
  //   }).pipe(
  //     tap(() => {
  //       console.log('Déconnexion réussie.');
  //       this.isLoggedInSubject.next(false);
  //       this.currentUserSubject.next(null);
  //       this.router.navigate(['/login']); // Redirige vers la page de connexion
  //     }),
  //     catchError((error) => {
  //       console.error('Erreur lors de la déconnexion :', error);
  //       return of(null);
  //     })
  //   ).subscribe();
  // }
  logout(): void {
    localStorage.removeItem('auth_token'); // Supprime le token
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }

  /**
   * Vérifier l'état d'authentification
   */
  // checkAuth(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/check-auth`, {
  //     withCredentials: true, 
  //   }).pipe(
  //     tap((response: any) => {
  //       console.log('Utilisateur connecté :', response.user);
  //       this.isLoggedInSubject.next(true);
  //       this.currentUserSubject.next(response.user);
  //     }),
  //     catchError((error) => {
  //       console.error('Non authentifié ou erreur :', error);
  //       this.isLoggedInSubject.next(false);
  //       this.currentUserSubject.next(null);
  //       return of(null);
  //     })
  //   );
  // }
  checkAuth(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/check-auth`, {
    }).pipe(
      tap(() => {
        console.log('Utilisateur connecté.');
        this.isLoggedInSubject.next(true);
      }),
      catchError((error) => {
        console.error('Erreur lors de la vérification d\'authentification :', error);
        this.isLoggedInSubject.next(false);
        return of(false);
      })
    );
  }

  /**
   * Récupérer les informations de l'utilisateur connecté
   */
  // getUser(): Observable<any> {
  //   return this.currentUserSubject.asObservable();
  // }
}
