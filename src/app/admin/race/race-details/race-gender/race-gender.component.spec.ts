import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceGenderComponent } from './race-gender.component';

describe('RaceGenderComponent', () => {
  let component: RaceGenderComponent;
  let fixture: ComponentFixture<RaceGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
