import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBaseComponent } from './character-base.component';

describe('CharacterBaseComponent', () => {
  let component: CharacterBaseComponent;
  let fixture: ComponentFixture<CharacterBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
