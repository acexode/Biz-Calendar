import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumarDeProgramariComponent } from './numar-de-programari.component';

describe('NumarDeProgramariComponent', () => {
  let component: NumarDeProgramariComponent;
  let fixture: ComponentFixture<NumarDeProgramariComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NumarDeProgramariComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumarDeProgramariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
