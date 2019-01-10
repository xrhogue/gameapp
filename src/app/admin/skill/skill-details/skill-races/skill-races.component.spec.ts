import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillRacesComponent } from './skill-races.component';

describe('SkillRacesComponent', () => {
  let component: SkillRacesComponent;
  let fixture: ComponentFixture<SkillRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillRacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
