export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'student' | 'admin' | 'customer';
  collegeId?: string;
  department?: string;
  registeredAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  collegeId: string;
  department: string;
  termsAccepted: boolean;
}
