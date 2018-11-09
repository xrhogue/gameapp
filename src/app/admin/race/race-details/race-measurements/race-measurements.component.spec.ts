import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceMeasurementsComponent } from './race-measurements.component';

describe('RaceMeasurementsComponent', () => {
  let component: RaceMeasurementsComponent;
  let fixture: ComponentFixture<RaceMeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceMeasurementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
