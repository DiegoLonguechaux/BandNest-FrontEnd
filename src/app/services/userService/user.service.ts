import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  constructor() { }

  getUser() {
    return this.http.get<{ data: UserModel }>(`${environment.apiUrl}/me`);
  }

  updateUser(userData: Partial<UserModel>) {
    return this.http.patch<UserModel>(`${environment.apiUrl}/me/update`, userData);
  }
}
