import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterGeneralComponent } from './character-general.component';

describe('CharacterGeneralComponent', () => {
  let component: CharacterGeneralComponent;
  let fixture: ComponentFixture<CharacterGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
