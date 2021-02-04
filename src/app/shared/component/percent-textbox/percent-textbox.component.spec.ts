import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentTextboxComponent } from './percent-textbox.component';

describe('PercentTextboxComponent', () => {
  let component: PercentTextboxComponent;
  let fixture: ComponentFixture<PercentTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
