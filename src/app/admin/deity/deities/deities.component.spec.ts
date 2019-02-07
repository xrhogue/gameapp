import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeitiesComponent } from './deities.component';

describe('DeitiesComponent', () => {
  let component: DeitiesComponent;
  let fixture: ComponentFixture<DeitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
