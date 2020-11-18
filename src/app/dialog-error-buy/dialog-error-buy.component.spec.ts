import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorBuyComponent } from './dialog-error-buy.component';

describe('DialogErrorBuyComponent', () => {
  let component: DialogErrorBuyComponent;
  let fixture: ComponentFixture<DialogErrorBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogErrorBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErrorBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
