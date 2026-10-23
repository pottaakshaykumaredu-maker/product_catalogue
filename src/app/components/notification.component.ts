import { notificationService, NotificationMessage } from '../services/notification.service.ts';

export class NotificationComponent {
  private notifications: NotificationMessage[] = [];

  constructor() {
    notificationService.subscribe(notifications => {
      this.notifications = notifications;
      this.render();
    });
  }

  render(targetElement?: HTMLElement): void {
    const el = targetElement || document.getElementById('app-notifications');
    if (!el) return;

    if (this.notifications.length === 0) {
      el.innerHTML = '';
      return;
    }

    el.innerHTML = `
      <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        ${this.notifications.map(item => {
          let bgClass = 'bg-white border-slate-200 text-slate-800';
          let iconColor = 'text-indigo-600';
          let iconSvg = '';

          switch (item.type) {
            case 'success':
              bgClass = 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-emerald-100';
              iconColor = 'text-emerald-600';
              iconSvg = `<svg class="w-5 h-5 ${iconColor}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>`;
              break;
            case 'error':
              bgClass = 'bg-rose-50 border-rose-300 text-rose-950 shadow-rose-100';
              iconColor = 'text-rose-600';
              iconSvg = `<svg class="w-5 h-5 ${iconColor}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>`;
              break;
            case 'warning':
              bgClass = 'bg-amber-50 border-amber-300 text-amber-950 shadow-amber-100';
              iconColor = 'text-amber-600';
              iconSvg = `<svg class="w-5 h-5 ${iconColor}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>`;
              break;
            case 'info':
            default:
              bgClass = 'bg-indigo-50 border-indigo-300 text-indigo-950 shadow-indigo-100';
              iconColor = 'text-indigo-600';
              iconSvg = `<svg class="w-5 h-5 ${iconColor}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>`;
              break;
          }

          return `
            <div class="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all animate-slide-in ${bgClass}" role="alert">
              <div class="shrink-0 mt-0.5">
                ${iconSvg}
              </div>
              <div class="flex-1 min-w-0">
                <h5 class="text-xs font-bold leading-none mb-1">${item.title}</h5>
                <p class="text-xs opacity-90 leading-relaxed">${item.message}</p>
              </div>
              <button data-dismiss-id="${item.id}" class="shrink-0 text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors" aria-label="Close notification">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Attach dismiss handlers
    el.querySelectorAll('[data-dismiss-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-dismiss-id');
        if (id) {
          notificationService.dismiss(id);
        }
      });
    });
  }
}
