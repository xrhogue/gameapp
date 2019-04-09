import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDeityDlgComponent } from './select-deity-dlg.component';

describe('SelectDeityDlgComponent', () => {
  let component: SelectDeityDlgComponent;
  let fixture: ComponentFixture<SelectDeityDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDeityDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDeityDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
