import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, credentials, {
      withCredentials: true, // Nécessaire pour envoyer et recevoir des cookies
    }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(true); // Met à jour l'état de connexion
      })
    );
  }

  // register
  register(data: { email: string; password: string; username: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, data, {
      withCredentials: true, // Pour gérer les cookies
    });
  }

  // logout
  logout(): void {
    this.http.post(`${environment.apiUrl}/logout`, {}, {
      withCredentials: true, // Envoie les cookies pour invalider le token côté serveur
    }).subscribe(() => {
      this.isLoggedInSubject.next(false); // Met à jour l'état de connexion
      this.router.navigate(['/login']); // Redirige vers la page de login
    });
  }

  // check auth
  checkAuth(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth-check`, {
      withCredentials: true, // Vérifie l'état d'authentification via le cookie
    }).pipe(
      tap(() => {
        this.isLoggedInSubject.next(true);
      })
    );
  }
}
