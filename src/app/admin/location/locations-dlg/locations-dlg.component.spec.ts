import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsDlgComponent } from './locations-dlg.component';

describe('LocationsDlgComponent', () => {
  let component: LocationsDlgComponent;
  let fixture: ComponentFixture<LocationsDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
