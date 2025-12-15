import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

async function main() {
  try {
    if (environment.useMsw) {
      try {
        const { worker } = await import('./mocks/browser');
        await worker.start({ 
          serviceWorker: { url: '/mockServiceWorker.js' },
          onUnhandledRequest: 'bypass'
        });
        console.log('MSW started successfully');
      } catch (mswError) {
        console.warn('MSW failed to start, continuing without it:', mswError);
      }
    }
    
    await bootstrapApplication(App, appConfig);
  } catch (err) {
    console.error('Failed to bootstrap application:', err);
  }
}
main();
