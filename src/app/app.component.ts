import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isTablet = false;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      if(platform.width() >= 768){
        this.isTablet = true;
      }else{
        this.isTablet = false;
      }
    });
  }
}
