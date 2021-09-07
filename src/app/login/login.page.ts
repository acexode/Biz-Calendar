import { AuthService } from './../core/services/auth/auth.service';
import { MenuController } from '@ionic/angular';
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
  errorMsg = 'Parola sau nume de utilizator incorecte';
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
  constructor(private fb: FormBuilder, private router: Router, private menu: MenuController,
    private aRoute: ActivatedRoute, private authS: AuthService
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
      if(this.returnUrl === '/'){
        this.router.navigate(['selectie-spatiu']);
      }else{
        this.router.navigate([this.returnUrl]);
      }
    }, err =>{
      console.log(err);
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    });

  }
  get utilizator() {
    return this.credentials.get('utilizator');
  }

  get password() {
    return this.credentials.get('password');
  }

}

