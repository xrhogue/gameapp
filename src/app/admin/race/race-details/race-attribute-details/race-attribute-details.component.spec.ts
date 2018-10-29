import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceAttributeDetailsComponent } from './race-attribute-details.component';

describe('RaceAttributeDetailsComponent', () => {
  let component: RaceAttributeDetailsComponent;
  let fixture: ComponentFixture<RaceAttributeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceAttributeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceAttributeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
