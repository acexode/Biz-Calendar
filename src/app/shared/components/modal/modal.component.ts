import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  ionicForm: FormGroup;

  isFormSubmitted = false;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CHECK_LIST = [
    { name: 'Photography', value: 'Photography', checked: true },
    { name: 'Blogging', value: 'Blogging' },
    { name: 'Cooking', value: 'Cooking' },
    { name: 'Singing', value: 'Singing' },
    { name: 'Dancing', value: 'Dancing' },
    { name: 'Pottery', value: 'Pottery' },
    { name: 'Knitting', value: 'Knitting' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      checkboxArrayList: this.formBuilder.array([], [Validators.required])
    });

    this.onLoadCheckboxStatus();
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  updateCheckControl(cal: any, o: any) {
    if (o.checked) {
      cal.push(new FormControl(o.value));
    } else {
      cal.controls.forEach((item: FormControl, index) => {
        if (item.value === o.value) {
          cal.removeAt(index);
          return;
        }
      });
    }
  }

  onLoadCheckboxStatus() {
    const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
    this.CHECK_LIST.forEach(o => {
      this.updateCheckControl(checkboxArrayList, o);
    });
  }

  onSelectionChange(e, i) {
    const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
    this.CHECK_LIST[i].checked = e.target.checked;
    this.updateCheckControl(checkboxArrayList, e.target);

  }

  submitForm() {
    this.isFormSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log('Form Submitted', this.ionicForm.value);
    }
  }

}
