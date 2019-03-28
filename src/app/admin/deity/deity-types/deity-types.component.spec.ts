import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeityTypesComponent } from './deity-types.component';

describe('DeityTypesComponent', () => {
  let component: DeityTypesComponent;
  let fixture: ComponentFixture<DeityTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeityTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeityTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
