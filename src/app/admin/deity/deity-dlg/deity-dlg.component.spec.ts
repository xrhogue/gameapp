import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeityDlgComponent } from './deity-dlg.component';

describe('DeityDlgComponent', () => {
  let component: DeityDlgComponent;
  let fixture: ComponentFixture<DeityDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeityDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeityDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
