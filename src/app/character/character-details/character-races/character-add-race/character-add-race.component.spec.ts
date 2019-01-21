import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAddRaceComponent } from './character-add-race.component';

describe('CharacterAddRaceComponent', () => {
  let component: CharacterAddRaceComponent;
  let fixture: ComponentFixture<CharacterAddRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAddRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAddRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
