import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceStatsComponent } from './race-stats.component';

describe('RaceStatsComponent', () => {
  let component: RaceStatsComponent;
  let fixture: ComponentFixture<RaceStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
