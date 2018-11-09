import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceAgesComponent } from './race-ages.component';

describe('RaceAgesComponent', () => {
  let component: RaceAgesComponent;
  let fixture: ComponentFixture<RaceAgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceAgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceAgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
