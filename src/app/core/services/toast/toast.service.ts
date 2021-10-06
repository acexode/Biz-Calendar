import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: any;

  constructor(public toastController: ToastController) { }
  async presentToastWithDurationDismiss(
    message: string = 'message',
    cssClass: 'success' | 'error' = 'error',
    duration: number = 3000
  ) {
    this.toast = await this.toastController.create({
      cssClass,
      message,
      duration,
    });
    this.toast.present();
  }
  async presentToastWithNoDurationDismiss(
    message: string = 'message',
    cssClass: 'success' | 'error' = 'error',
  ) {
    this.toast = await this.toastController.create({
      cssClass,
      message,
    });
    this.toast.present();
  }
  dismissToast() {
    this.toast.dismiss();
  }
}
