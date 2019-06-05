import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSkillDetailsComponent } from './character-skill-details.component';

describe('CharacterSkillDetailsComponent', () => {
  let component: CharacterSkillDetailsComponent;
  let fixture: ComponentFixture<CharacterSkillDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSkillDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSkillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
