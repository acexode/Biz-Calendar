import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInputConfig } from '../shared/models/components/ion-input-config';
import { IonTextItem } from '../shared/models/components/ion-text-item';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
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
  constructor(private fb: FormBuilder, private router: Router, private menu: MenuController) { }

  inputConfig(
    label: string,
    type,
    placeholder: string = 'Type here',
    isDisabled: boolean = false,
  ): IonInputConfig {
    return {
      inputLabel: {
        text: label,
        classes: '',
        slot: 'end',
      },
      inputMode:  type,
      placeholder: placeholder || '',
      size: 100,
      minLength: 10,
      maxLength: 10,
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
  }
  // Easy access for form fields
  login(){
    console.log('submitted');
    this.router.navigate(['selectie-spatiu']);
  }
  get utilizator() {
    return this.credentials.get('utilizator');
  }

  get password() {
    return this.credentials.get('password');
  }

}
