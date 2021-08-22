import { Injectable } from '@angular/core';
import { isPlatform, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  isWeb = false;
  isWeb$: BehaviorSubject<boolean> = new BehaviorSubject(this.isWeb);
  isDesktopWidth$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private platform: Platform) {
    this.isWebPlatform();
    this.checkWidth();
  }

  private isWebPlatform() {
    if (isPlatform('desktop') || isPlatform('mobileweb') || isPlatform('pwa')) {
      this.isWeb = true;
      this.isWeb$.next(this.isWeb);
      return this.isWeb;
    } else {
      this.isWeb = false;
      this.isWeb$.next(this.isWeb);
      return this.isWeb;
    }
  }

  private checkWidth() {
    const width = this.platform.width();
    const largeWidth = width > 820;

    this.isDesktopWidth$.next(largeWidth);
  }
}
