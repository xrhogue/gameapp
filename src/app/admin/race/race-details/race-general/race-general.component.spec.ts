import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceGeneralComponent } from './race-general.component';

describe('RaceGeneralComponent', () => {
  let component: RaceGeneralComponent;
  let fixture: ComponentFixture<RaceGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
