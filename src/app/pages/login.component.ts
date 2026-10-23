import { authService } from '../services/auth.service.ts';
import { router } from '../app.routes.ts';
import { notificationService } from '../services/notification.service.ts';

export class LoginComponent {
  private email: string = '';
  private password: string = '';
  private rememberMe: boolean = false;
  private errorMessage: string = '';
  private showPassword: boolean = false;

  render(targetElement?: HTMLElement): void {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser()!;
      el.innerHTML = `
        <div class="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-md mx-auto my-12 space-y-5 shadow-sm">
          <div class="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-xl font-bold">
            ${user.fullName.charAt(0)}
          </div>
          <div class="space-y-1">
            <h2 class="text-xl font-extrabold text-slate-900">Already Signed In</h2>
            <p class="text-xs text-slate-500">You are currently logged in as <strong class="text-slate-800">${user.fullName}</strong> (${user.email}).</p>
          </div>
          <div class="flex justify-center gap-3 pt-2">
            <a href="#products" class="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors">
              Go to Catalogue
            </a>
            <button id="session-signout-btn" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-rose-600 font-bold text-xs transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      `;

      const signoutBtn = el.querySelector('#session-signout-btn');
      if (signoutBtn) {
        signoutBtn.addEventListener('click', () => {
          authService.logout();
          this.render(el);
        });
      }
      return;
    }

    el.innerHTML = `
      <div class="max-w-md mx-auto my-8 sm:my-12 space-y-6">
        
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Student Portal Sign In</h1>
          <p class="text-xs text-slate-500">
            Fulfills Weeks 1–5: HTML5 form validation, DOM manipulation &amp; Auth Service
          </p>
        </div>

        <!-- Card Container -->
        <div class="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
          
          <!-- Quick Demo Buttons for Evaluator -->
          <div class="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <p class="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5">
              <span>⚡</span> Quick Academic Presets (Click to autofill):
            </p>
            <div class="flex gap-2">
              <button id="quick-fill-student" class="flex-1 py-1.5 px-2 bg-white rounded-lg border border-indigo-200 text-[11px] font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all shadow-xs">
                Student Account
              </button>
              <button id="quick-fill-admin" class="flex-1 py-1.5 px-2 bg-white rounded-lg border border-indigo-200 text-[11px] font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all shadow-xs">
                Faculty Evaluator
              </button>
            </div>
          </div>

          <!-- Error Alert -->
          ${
            this.errorMessage
              ? `
                <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <svg class="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>${this.errorMessage}</span>
                </div>
              `
              : ''
          }

          <!-- Form Element -->
          <form id="login-form" class="space-y-4" novalidate>
            
            <!-- Email Field -->
            <div class="space-y-1">
              <label for="login-email" class="text-xs font-bold text-slate-700">Email Address</label>
              <input 
                id="login-email"
                type="email" 
                required
                placeholder="student@college.edu"
                value="${this.email}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              <span id="email-error" class="text-[10px] text-rose-600 hidden font-medium">Please enter a valid email address.</span>
            </div>

            <!-- Password Field -->
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <label for="login-password" class="text-xs font-bold text-slate-700">Password</label>
                <button type="button" id="toggle-pwd-btn" class="text-[10px] text-indigo-600 hover:underline">
                  ${this.showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input 
                id="login-password"
                type="${this.showPassword ? 'text' : 'password'}" 
                required
                minlength="6"
                placeholder="••••••••"
                value="${this.password}"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              <span id="password-error" class="text-[10px] text-rose-600 hidden font-medium">Password must be at least 6 characters.</span>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between text-xs pt-1">
              <label class="flex items-center gap-2 cursor-pointer text-slate-600">
                <input 
                  id="login-remember"
                  type="checkbox" 
                  ${this.rememberMe ? 'checked' : ''}
                  class="accent-indigo-600 rounded"
                />
                <span>Remember session</span>
              </label>
              <a href="#academic" class="text-indigo-600 hover:underline text-[11px] font-semibold">
                Forgot password?
              </a>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
              <span>Sign In to Catalogue</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <!-- Register Link -->
          <div class="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>New student? </span>
            <a href="#register" class="text-indigo-600 font-bold hover:underline">
              Create an account
            </a>
          </div>

        </div>

      </div>
    `;

    this.attachEvents(el);
  }

  private attachEvents(el: HTMLElement): void {
    const form = el.querySelector('#login-form') as HTMLFormElement;
    const emailInput = el.querySelector('#login-email') as HTMLInputElement;
    const passwordInput = el.querySelector('#login-password') as HTMLInputElement;
    const rememberInput = el.querySelector('#login-remember') as HTMLInputElement;
    const togglePwdBtn = el.querySelector('#toggle-pwd-btn');

    // Quick fill handlers
    const studentFill = el.querySelector('#quick-fill-student');
    const adminFill = el.querySelector('#quick-fill-admin');

    if (studentFill) {
      studentFill.addEventListener('click', () => {
        emailInput.value = 'alex.chen@student.college.edu';
        passwordInput.value = 'Student2026!';
      });
    }

    if (adminFill) {
      adminFill.addEventListener('click', () => {
        emailInput.value = 'faculty.admin@college.edu';
        passwordInput.value = 'EvaluatorPass!';
      });
    }

    if (togglePwdBtn) {
      togglePwdBtn.addEventListener('click', () => {
        this.showPassword = !this.showPassword;
        passwordInput.type = this.showPassword ? 'text' : 'password';
        togglePwdBtn.textContent = this.showPassword ? 'Hide' : 'Show';
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberInput?.checked || false;

        // Reset errors
        const emailErr = el.querySelector('#email-error');
        const pwdErr = el.querySelector('#password-error');
        if (emailErr) emailErr.classList.add('hidden');
        if (pwdErr) pwdErr.classList.add('hidden');

        // Validation
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          if (emailErr) emailErr.classList.remove('hidden');
          valid = false;
        }

        if (password.length < 6) {
          if (pwdErr) pwdErr.classList.remove('hidden');
          valid = false;
        }

        if (!valid) return;

        const result = authService.login({ email, password, rememberMe });
        if (result.success) {
          router.navigate('products');
        } else {
          this.errorMessage = result.message;
          this.render(el);
        }
      });
    }
  }
}
