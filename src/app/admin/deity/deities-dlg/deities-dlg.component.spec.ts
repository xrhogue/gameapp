import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeitiesDlgComponent } from './deities-dlg.component';

describe('DeitiesDlgComponent', () => {
  let component: DeitiesDlgComponent;
  let fixture: ComponentFixture<DeitiesDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeitiesDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeitiesDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
