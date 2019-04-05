import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLocationDlgComponent } from './select-location-dlg.component';

describe('SelectLocationDlgComponent', () => {
  let component: SelectLocationDlgComponent;
  let fixture: ComponentFixture<SelectLocationDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLocationDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLocationDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
