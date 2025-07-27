import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  simulatorAccess: boolean;
  savedProjects: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5254/api/auth'; // Adjusted to match backend API URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check for existing session on service initialization
    this.checkExistingSession();
  }

  signUp(data: SignUpData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasSimulatorAccess(): boolean {
    const user = this.getCurrentUser();
    return user ? user.simulatorAccess : false;
  }

  private checkExistingSession(): void {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    }
  }

  saveSimulatorProject(projectData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/simulator/save-project`, projectData);
  }

  loadSimulatorProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/simulator/projects`);
  }
}
