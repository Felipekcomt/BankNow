import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrosRegisterComponent } from './dialog-erros-register.component';

describe('DialogErrosRegisterComponent', () => {
  let component: DialogErrosRegisterComponent;
  let fixture: ComponentFixture<DialogErrosRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogErrosRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErrosRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
