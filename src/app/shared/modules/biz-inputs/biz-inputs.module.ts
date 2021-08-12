import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { BizInputsService } from './services/biz-inputs.service';
import { InputMaskDirective } from './directives/input-mask.directive';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SelectComponent } from './components/select/select.component';
import { ChipsComponent } from './chips/chips.component';
import { RadiosComponent } from './components/radios/radios.component';

@NgModule({
  declarations: [
    InputComponent,
    InputMaskDirective,
    TextareaComponent,
    SelectComponent,
    ChipsComponent,
    RadiosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    InputComponent,
    TextareaComponent,
    SelectComponent,
    ChipsComponent,
    ReactiveFormsModule,
    RadiosComponent
  ],
  providers: [BizInputsService],
})
export class BizInputsModule { }
