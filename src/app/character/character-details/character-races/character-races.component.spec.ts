import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterRacesComponent } from './character-races.component';

describe('CharacterRacesComponent', () => {
  let component: CharacterRacesComponent;
  let fixture: ComponentFixture<CharacterRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterRacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
