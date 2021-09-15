import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BizSearchableRadioModalComponent } from './biz-searchable-radio-modal.component';

describe('BizSearchableRadioModalComponent', () => {
  let component: BizSearchableRadioModalComponent;
  let fixture: ComponentFixture<BizSearchableRadioModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BizSearchableRadioModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BizSearchableRadioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
