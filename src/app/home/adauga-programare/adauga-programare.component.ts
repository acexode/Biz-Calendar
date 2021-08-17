import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { inputStyleGuideConfigurations } from 'src/app/style-guide/input-config-data/input-config-data';

@Component({
  selector: 'app-adauga-programare',
  templateUrl: './adauga-programare.component.html',
  styleUrls: ['./adauga-programare.component.scss'],
})
export class AdaugaProgramareComponent implements OnInit {
  inputStyleGuide = inputStyleGuideConfigurations;
  pat = inputConfigHelper({
    label: 'Pacient',
    type: 'text',
    placeholder: 'Value'
  });
  adaugaProgramareFormGroup: FormGroup = this.fb.group({
    pacient: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {}

}
