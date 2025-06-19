import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
// ⚠️ Vấn đề chính: provideZonelessChangeDetection()
// Bạn đang dùng Zoneless change detection (Angular v17+), tức là:
// Angular sẽ không tự động chạy change detection sau các async operation như HTTP, setTimeout, hoặc Observable, vì bạn không còn dùng NgZone để track những thay đổi.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
};
