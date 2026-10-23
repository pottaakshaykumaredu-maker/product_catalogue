export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationMessage {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

type NotificationSubscriber = (notifications: NotificationMessage[]) => void;

/**
 * NotificationService
 * Angular Injectable Service pattern managing reactive toast alerts
 */
export class NotificationService {
  private notifications: NotificationMessage[] = [];
  private subscribers: NotificationSubscriber[] = [];

  subscribe(callback: NotificationSubscriber): () => void {
    this.subscribers.push(callback);
    callback([...this.notifications]);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notify(): void {
    for (const sub of this.subscribers) {
      sub([...this.notifications]);
    }
  }

  show(type: NotificationType, title: string, message: string, duration: number = 4000): void {
    const id = Math.random().toString(36).substring(2, 9);
    const item: NotificationMessage = { id, type, title, message, duration };
    this.notifications.push(item);
    this.notify();

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
  }

  success(title: string, message: string): void {
    this.show('success', title, message);
  }

  error(title: string, message: string): void {
    this.show('error', title, message);
  }

  info(title: string, message: string): void {
    this.show('info', title, message);
  }

  warning(title: string, message: string): void {
    this.show('warning', title, message);
  }

  dismiss(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notify();
  }
}

export const notificationService = new NotificationService();
