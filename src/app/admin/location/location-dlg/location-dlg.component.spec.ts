import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDlgComponent } from './location-dlg.component';

describe('LocationDlgComponent', () => {
  let component: LocationDlgComponent;
  let fixture: ComponentFixture<LocationDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
