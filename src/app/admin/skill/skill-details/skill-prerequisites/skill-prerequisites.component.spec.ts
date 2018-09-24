import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPrerequisitesComponent } from './skill-prerequisites.component';

describe('SkillPrerequisitesComponent', () => {
  let component: SkillPrerequisitesComponent;
  let fixture: ComponentFixture<SkillPrerequisitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPrerequisitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPrerequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
