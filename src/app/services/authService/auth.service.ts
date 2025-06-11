import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
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
    return this.initializeCsrf().pipe(
      switchMap(() => {
        return this.http.post(`${environment.apiUrl}/login`, credentials, {
          withCredentials: true,
          headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
        }).pipe(
          tap((response: any) => {
            this.isLoggedInSubject.next(true);
          }),
          catchError((error) => {
            console.error('Erreur lors de la connexion :', error);
            this.isLoggedInSubject.next(false);
            return throwError(() => error);
          })
        );
      })
    );
  }

  // register
  register(credentials: { firstname: string; lastname: string; name: string; email: string; password: string; password_confirmation: string; role: string }): Observable<any> {
    return this.initializeCsrf().pipe(
      switchMap(() => {
        return this.http.post(`${environment.apiUrl}/register`, credentials, {
          withCredentials: true,
          headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
        }).pipe(
          tap((response: any) => {
            this.isLoggedInSubject.next(true);
          }),
          catchError((error) => {
            console.error('Erreur lors de l\'inscription :', error);
            return of(null);
          })
        );
      })
    )
  }

  /**
   * Déconnexion utilisateur
   */
  // logout(): void {
  //   this.http.post(`${environment.apiUrl}/logout`, {}, {
  //     withCredentials: true,
  //   }).pipe(
  //     tap(() => {
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

  // logout(): void {
  //   localStorage.removeItem('auth_token'); // Supprime le token
  //   this.isLoggedInSubject.next(false);
  //   this.router.navigate(['/login']); // Redirige vers la page de connexion
  // }

  checkAuth(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/check-auth`, {
    }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(true);
      }),
      catchError((error) => {
        console.error('Erreur lors de la vérification d\'authentification :', error);
        this.isLoggedInSubject.next(false);
        return of(false);
      })
    );
  }
  
  getCurrentUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user`, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
    }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté :', error);
        return of(null);
      })
    );
  }
}