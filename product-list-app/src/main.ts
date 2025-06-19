import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js'; //Nếu bạn dùng Vite + Angular 17 standalone, thì zone.js không còn auto import như Angular CLI nữa — bạn phải tự thêm nó vào.
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
