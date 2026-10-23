import { User, LoginCredentials, RegistrationData } from '../models/user.model.ts';
import { notificationService } from './notification.service.ts';

export class AuthService {
  private currentUser: User | null = null;
  private subscribers: Array<(user: User | null) => void> = [];

  constructor() {
    this.restoreSession();
  }

  private restoreSession(): void {
    try {
      const stored = localStorage.getItem('college_auth_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to restore auth session:', e);
      this.currentUser = null;
    }
  }

  subscribe(callback: (user: User | null) => void): () => void {
    this.subscribers.push(callback);
    callback(this.currentUser);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notify(): void {
    if (this.currentUser) {
      localStorage.setItem('college_auth_user', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('college_auth_user');
    }
    for (const callback of this.subscribers) {
      callback(this.currentUser);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  login(credentials: LoginCredentials): { success: boolean; message: string; user?: User } {
    // Demonstration validation logic
    if (!credentials.email || !credentials.password) {
      return { success: false, message: 'Please provide both email and password.' };
    }

    if (credentials.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    // Accept valid college student or admin credentials
    const isMockAdmin = credentials.email.includes('admin');
    const user: User = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      fullName: isMockAdmin ? 'Lab Evaluator (Faculty)' : (credentials.email.split('@')[0].replace(/[._]/g, ' ').toUpperCase() || 'Student Scholar'),
      email: credentials.email.toLowerCase(),
      role: isMockAdmin ? 'admin' : 'student',
      collegeId: 'WT-2026-LAB',
      department: 'Computer Science & Engineering',
      registeredAt: new Date().toISOString()
    };

    this.currentUser = user;
    this.notify();
    notificationService.success('Authentication Successful', `Welcome back, ${user.fullName}!`);
    return { success: true, message: 'Login successful.', user };
  }

  register(data: RegistrationData): { success: boolean; message: string; user?: User } {
    if (!data.fullName || !data.email || !data.password || !data.confirmPassword) {
      return { success: false, message: 'All required fields must be completed.' };
    }

    if (data.password !== data.confirmPassword) {
      return { success: false, message: 'Passwords do not match.' };
    }

    if (data.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    if (!data.termsAccepted) {
      return { success: false, message: 'You must accept the academic code of conduct & terms.' };
    }

    const newUser: User = {
      id: 'STU-' + Math.floor(10000 + Math.random() * 90000),
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone,
      role: 'student',
      collegeId: data.collegeId || 'CS-2026',
      department: data.department || 'Information Technology',
      registeredAt: new Date().toISOString()
    };

    this.currentUser = newUser;
    this.notify();
    notificationService.success('Registration Complete', `Welcome to the Catalogue, ${newUser.fullName}!`);
    return { success: true, message: 'Registration successful! Account activated.', user: newUser };
  }

  logout(): void {
    const name = this.currentUser?.fullName || 'User';
    this.currentUser = null;
    this.notify();
    notificationService.info('Logged Out', `Goodbye, ${name}. Session terminated.`);
  }
}

export const authService = new AuthService();
