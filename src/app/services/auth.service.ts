import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  signIn(userData: { name: string; email: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      })
    );
  }

  signOut(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.currentUserSubject.value?.id}`).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
      })
    );
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}