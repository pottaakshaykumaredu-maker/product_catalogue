/**
 * Angular Application Bootstrap Entry Point
 * Course: Web Technologies Laboratory (Academic Project Suite)
 */

import './styles.css';
import { AppComponent } from './app/app.component.ts';

// Ensure DOM is ready before bootstrapping
function bootstrapApplication() {
  const rootElement = document.getElementById('root') || document.querySelector('app-root') as HTMLElement;
  if (!rootElement) {
    console.error('Fatal: Target root mounting element was not found in the DOM.');
    return;
  }

  const app = new AppComponent();
  app.bootstrap(rootElement);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApplication);
} else {
  bootstrapApplication();
}
