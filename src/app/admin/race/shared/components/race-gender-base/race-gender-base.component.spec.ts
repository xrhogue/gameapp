import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceGenderBaseComponent } from './race-gender-base.component';

describe('RaceGenderBaseComponent', () => {
  let component: RaceGenderBaseComponent;
  let fixture: ComponentFixture<RaceGenderBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceGenderBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceGenderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
