import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

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
  role: 'user' | 'admin';
  simulatorAccess: boolean;
  savedProjects: any[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5254/api/auth'; // Adjusted to match backend API URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Demo admin credentials for testing
  private readonly ADMIN_CREDENTIALS = {
    email: 'admin@theonlyphysics.com',
    password: 'admin123',
    username: 'Admin',
    role: 'admin' as const,
    id: 'admin-001',
    simulatorAccess: true,
    savedProjects: [],
    createdAt: new Date()
  };

  constructor(private http: HttpClient) {
    // Check for existing session on service initialization
    this.checkExistingSession();
  }

  signUp(data: SignUpData): Observable<any> {
    // For demo purposes, simulate successful signup
    const newUser: User = {
      id: 'user-' + Date.now(),
      username: data.username,
      email: data.email,
      role: 'user',
      simulatorAccess: true,
      savedProjects: [],
      createdAt: new Date()
    };

    return of({ user: newUser, token: 'demo-token-' + Date.now() }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  login(data: LoginData): Observable<any> {
    // Check if it's admin login
    if (data.email === this.ADMIN_CREDENTIALS.email && data.password === this.ADMIN_CREDENTIALS.password) {
      const adminResponse = {
        user: this.ADMIN_CREDENTIALS,
        token: 'admin-token-' + Date.now()
      };

      return of(adminResponse).pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
        })
      );
    }

    // For demo purposes, simulate successful login for any other credentials
    const demoUser: User = {
      id: 'user-' + Date.now(),
      username: data.email.split('@')[0],
      email: data.email,
      role: 'user',
      simulatorAccess: true,
      savedProjects: [],
      createdAt: new Date()
    };

    return of({ user: demoUser, token: 'demo-token-' + Date.now() }).pipe(
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

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === 'admin' : false;
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
    return this.http.post(`${this.apiUrl}/simulator/save-project`, projectData).pipe(
      catchError(() => {
        // For demo purposes, simulate successful save
        return of({ success: true, message: 'Project saved successfully' });
      })
    );
  }

  loadSimulatorProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/simulator/projects`).pipe(
      catchError(() => {
        // For demo purposes, return empty projects array
        return of({ projects: [] });
      })
    );
  }

  // Admin-specific methods
  getAdminCredentials() {
    return {
      email: this.ADMIN_CREDENTIALS.email,
      password: this.ADMIN_CREDENTIALS.password
    };
  }

  // Method to check if user has admin privileges for specific actions
  hasAdminPrivileges(): boolean {
    return this.isAuthenticated() && this.isAdmin();
  }
}
