import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorPayComponent } from './dialog-error-pay.component';

describe('DialogErrorPayComponent', () => {
  let component: DialogErrorPayComponent;
  let fixture: ComponentFixture<DialogErrorPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogErrorPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErrorPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
