import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillGeneralComponent } from './skill-general.component';

describe('SkillGeneralComponent', () => {
  let component: SkillGeneralComponent;
  let fixture: ComponentFixture<SkillGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
