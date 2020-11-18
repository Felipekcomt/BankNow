import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAYComponent } from './pay.component';

describe('PAYComponent', () => {
  let component: PAYComponent;
  let fixture: ComponentFixture<PAYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PAYComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PAYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
