import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMaintainanceComponent } from './error-maintainance.component';

describe('ErrorMaintainanceComponent', () => {
  let component: ErrorMaintainanceComponent;
  let fixture: ComponentFixture<ErrorMaintainanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMaintainanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMaintainanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
