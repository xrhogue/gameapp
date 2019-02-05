import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAddSkillComponent } from './character-add-skill.component';

describe('CharacterAddSkillComponent', () => {
  let component: CharacterAddSkillComponent;
  let fixture: ComponentFixture<CharacterAddSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAddSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAddSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
