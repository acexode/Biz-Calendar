import { AuthService } from './../core/services/auth/auth.service';
import { MenuController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInputConfig } from '../shared/models/components/ion-input-config';
import { IonTextItem } from '../shared/models/components/ion-text-item';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  showError = false;
  returnUrl: string;
  errorMsg = 'Parola sau nume de utilizator incorecte.';
  label: IonTextItem = {
    text: 'Default',
    classes: '',
    slot: 'end',
  };
  config: IonInputConfig = {
    placeholder: 'Placeholder',
    type: 'text',
    inputMode: 'text',
    size: 100,
    inputLabel: this.label,
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: false,
    disabled: false,
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private menu: MenuController,
    private aRoute: ActivatedRoute,
    private authS: AuthService,
    public toastController: ToastController
    ) {
      console.log(this.authS.userValue);
      if (this.authS.userValue) {
        this.router.navigate(['/']);
    }
     }

  inputConfig(
    label: string,
    type,
    placeholder: string = 'Type here',
    isDisabled: boolean = false,
    hasError: boolean = false
  ): IonInputConfig {
    return {
      inputLabel: {
        text: label,
        classes: '',
        slot: 'end',
      },
      inputHasError: hasError,
      inputMode:  type,
      type,
      inputAssistiveText:{
        text: hasError ? 'Camp obligatoriu' : ''
      },
      placeholder: placeholder || '',
      size: 100,
      bgwhite: false,
      disabled: isDisabled,
    };
  }


  ngOnInit() {
    this.menu.enable(false);
    this.credentials = this.fb.group({
      utilizator: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.aRoute.snapshot.queryParams.returnUrl || '/';
  }
  // Easy access for form fields
  login(){
    this.authS.login({
      username: this.utilizator.value,
      password: this.password.value,
      aRoute: this.aRoute
    }).pipe(first()).subscribe(res => {
      console.log(res);
      console.log(this.returnUrl);
      // this.authS.getParameters();
      this.authS.getParameters().subscribe((e: any) =>{
        console.log('parameters', e.parameters);
        // save parameters
        localStorage.setItem('parameters', JSON.stringify(e.parameters));
        // -------
        const obj: any = {};
        e.parameters.forEach(params =>{
          if(params.code === 'appEndHour'){
            obj.appEndHour = parseInt(params.value, 10);
          }else if(params.code === 'appStartHour'){
            obj.appStartHour = parseInt(params.value, 10);
          }
        });
        localStorage.setItem('workHours', JSON.stringify(obj));
        console.log(obj);
        if(this.returnUrl === '/'){
          this.router.navigate(['selectie-spatiu']);
        }else{
          this.router.navigate([this.returnUrl]);
        }
      });

    }, err =>{
      console.log(err);
      this.presentToast();
      // this.showError = true;
      // setTimeout(() => {
      //   this.showError = false;
      // }, 5000);
    });

  }
  get utilizator() {
    return this.credentials.get('utilizator');
  }

  get password() {
    return this.credentials.get('password');
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.errorMsg,
      duration: 5000,
      cssClass: 'toast-bg black-color m-0 s18-h24 ion-text-center px-16 py-13 text-weight-regular roboto-family-font ls-02'
    });
    toast.present();
  }

}

