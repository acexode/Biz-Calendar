import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingController: LoadingController) { }
  async loading(
    message: string = 'Please Wait...',
    duration: number = 3000
  ) {
    const loading = await this.loadingController.create({
            spinner: 'crescent',
            mode: 'md',
            duration,
            message,
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
    await loading.present();
  }
  loadingWithoutDuration() {

  }
}
