import { authService } from '../services/auth.service.ts';
import { router } from '../app.routes.ts';
import { notificationService } from '../services/notification.service.ts';

export class RegisterComponent {
  private errorMessage: string = '';

  render(targetElement?: HTMLElement): void {
    const el = targetElement || document.getElementById('app-main-content');
    if (!el) return;

    el.innerHTML = `
      <div class="max-w-lg mx-auto my-8 sm:my-12 space-y-6">
        
        <!-- Header -->
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Student Account Registration</h1>
          <p class="text-xs text-slate-500">
            Fulfills Weeks 1–3 (Semantic Forms &amp; CSS3) and Weeks 4–5 (JS Real-Time Form Validation)
          </p>
        </div>

        <!-- Registration Card -->
        <div class="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
          
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

          <form id="register-form" class="space-y-4" novalidate>
            
            <!-- Full Name -->
            <div class="space-y-1">
              <label for="reg-name" class="text-xs font-bold text-slate-700">Full Name *</label>
              <input 
                id="reg-name"
                type="text" 
                required
                placeholder="e.g. Akshay Kumar"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              <span id="name-error" class="text-[10px] text-rose-600 hidden font-medium">Please enter your full name (minimum 3 characters).</span>
            </div>

            <!-- Email & Phone Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label for="reg-email" class="text-xs font-bold text-slate-700">College Email *</label>
                <input 
                  id="reg-email"
                  type="email" 
                  required
                  placeholder="student@college.edu"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
                <span id="email-error" class="text-[10px] text-rose-600 hidden font-medium">Valid email required.</span>
              </div>
              <div class="space-y-1">
                <label for="reg-phone" class="text-xs font-bold text-slate-700">Phone Number *</label>
                <input 
                  id="reg-phone"
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-1234"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
                <span id="phone-error" class="text-[10px] text-rose-600 hidden font-medium">10-digit phone required.</span>
              </div>
            </div>

            <!-- College ID & Department Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label for="reg-college-id" class="text-xs font-bold text-slate-700">Student Roll / ID *</label>
                <input 
                  id="reg-college-id"
                  type="text" 
                  required
                  placeholder="e.g. 23CS0142"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all uppercase"
                />
                <span id="roll-error" class="text-[10px] text-rose-600 hidden font-medium">Roll ID is required.</span>
              </div>
              <div class="space-y-1">
                <label for="reg-dept" class="text-xs font-bold text-slate-700">Department</label>
                <select 
                  id="reg-dept"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all">
                  <option value="Computer Science & Engineering">Computer Science &amp; Eng.</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics &amp; Comm.</option>
                  <option value="Data Science & AI">Data Science &amp; AI</option>
                </select>
              </div>
            </div>

            <!-- Passwords -->
            <div class="space-y-1">
              <label for="reg-password" class="text-xs font-bold text-slate-700">Create Password *</label>
              <input 
                id="reg-password"
                type="password" 
                required
                minlength="6"
                placeholder="At least 6 characters"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              <!-- Password strength meter -->
              <div class="pt-1 space-y-1">
                <div class="flex items-center justify-between text-[10px] text-slate-600">
                  <span>Strength: <strong id="strength-label">Too Short</strong></span>
                  <span id="strength-text" class="font-mono">0 / 4</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div id="strength-bar" class="h-full bg-slate-300 w-0 transition-all"></div>
                </div>
              </div>
            </div>

            <div class="space-y-1">
              <label for="reg-confirm-password" class="text-xs font-bold text-slate-700">Confirm Password *</label>
              <input 
                id="reg-confirm-password"
                type="password" 
                required
                placeholder="Re-enter password"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              <span id="confirm-error" class="text-[10px] text-rose-600 hidden font-medium">Passwords do not match.</span>
            </div>

            <!-- Terms acceptance checkbox -->
            <div class="pt-1">
              <label class="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                <input 
                  id="reg-terms"
                  type="checkbox" 
                  required
                  class="accent-indigo-600 rounded mt-0.5"
                />
                <span class="leading-relaxed">
                  I agree to the college academic code of conduct and verify that all lab demonstration credentials provided are authentic.
                </span>
              </label>
              <span id="terms-error" class="text-[10px] text-rose-600 hidden font-medium block mt-1">You must accept the terms.</span>
            </div>

            <!-- Submit -->
            <button 
              type="submit"
              class="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 pt-2">
              <span>Complete Student Registration</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </form>

          <!-- Back to login -->
          <div class="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <a href="#login" class="text-indigo-600 font-bold hover:underline">
              Sign in here
            </a>
          </div>

        </div>

      </div>
    `;

    this.attachEvents(el);
  }

  private attachEvents(el: HTMLElement): void {
    const form = el.querySelector('#register-form') as HTMLFormElement;
    const nameInput = el.querySelector('#reg-name') as HTMLInputElement;
    const emailInput = el.querySelector('#reg-email') as HTMLInputElement;
    const phoneInput = el.querySelector('#reg-phone') as HTMLInputElement;
    const rollInput = el.querySelector('#reg-college-id') as HTMLInputElement;
    const deptSelect = el.querySelector('#reg-dept') as HTMLSelectElement;
    const pwdInput = el.querySelector('#reg-password') as HTMLInputElement;
    const confirmPwdInput = el.querySelector('#reg-confirm-password') as HTMLInputElement;
    const termsInput = el.querySelector('#reg-terms') as HTMLInputElement;

    const strengthBar = el.querySelector('#strength-bar') as HTMLElement;
    const strengthLabel = el.querySelector('#strength-label') as HTMLElement;
    const strengthText = el.querySelector('#strength-text') as HTMLElement;

    // Real-time password strength listener
    if (pwdInput && strengthBar && strengthLabel && strengthText) {
      pwdInput.addEventListener('input', () => {
        const val = pwdInput.value;
        let score = 0;
        if (val.length >= 6) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        strengthText.textContent = `${score} / 4`;

        if (score === 0) {
          strengthBar.style.width = '10%';
          strengthBar.className = 'h-full bg-slate-300 transition-all';
          strengthLabel.textContent = 'Too Short';
          strengthLabel.className = 'text-slate-500 font-bold';
        } else if (score === 1) {
          strengthBar.style.width = '25%';
          strengthBar.className = 'h-full bg-rose-500 transition-all';
          strengthLabel.textContent = 'Weak';
          strengthLabel.className = 'text-rose-600 font-bold';
        } else if (score === 2) {
          strengthBar.style.width = '50%';
          strengthBar.className = 'h-full bg-amber-500 transition-all';
          strengthLabel.textContent = 'Moderate';
          strengthLabel.className = 'text-amber-600 font-bold';
        } else if (score === 3) {
          strengthBar.style.width = '75%';
          strengthBar.className = 'h-full bg-indigo-500 transition-all';
          strengthLabel.textContent = 'Good';
          strengthLabel.className = 'text-indigo-600 font-bold';
        } else {
          strengthBar.style.width = '100%';
          strengthBar.className = 'h-full bg-emerald-500 transition-all';
          strengthLabel.textContent = 'Strong';
          strengthLabel.className = 'text-emerald-600 font-bold';
        }
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset errors
        ['#name-error', '#email-error', '#phone-error', '#roll-error', '#confirm-error', '#terms-error'].forEach(sel => {
          el.querySelector(sel)?.classList.add('hidden');
        });

        let valid = true;
        if (!nameInput.value || nameInput.value.trim().length < 3) {
          el.querySelector('#name-error')?.classList.remove('hidden');
          valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
          el.querySelector('#email-error')?.classList.remove('hidden');
          valid = false;
        }

        if (!phoneInput.value || phoneInput.value.trim().length < 7) {
          el.querySelector('#phone-error')?.classList.remove('hidden');
          valid = false;
        }

        if (!rollInput.value || rollInput.value.trim().length < 2) {
          el.querySelector('#roll-error')?.classList.remove('hidden');
          valid = false;
        }

        if (pwdInput.value !== confirmPwdInput.value) {
          el.querySelector('#confirm-error')?.classList.remove('hidden');
          valid = false;
        }

        if (!termsInput.checked) {
          el.querySelector('#terms-error')?.classList.remove('hidden');
          valid = false;
        }

        if (!valid) return;

        const regData = {
          fullName: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          collegeId: rollInput.value.trim(),
          department: deptSelect.value,
          password: pwdInput.value,
          confirmPassword: confirmPwdInput.value,
          termsAccepted: termsInput.checked
        };

        const result = authService.register(regData);
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
