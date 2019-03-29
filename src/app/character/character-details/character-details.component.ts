import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Character} from "admin/shared/character";
import {CharacterStatsComponent} from "./character-stats/character-stats.component";
import {CharacterService} from "../../service/character/character.service";
import {Race} from "admin/shared/race";

@Component({
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  id: number;
  character: Character;
  JSON: JSON;
  componentStates: Array<boolean> = [];

  @ViewChild(CharacterStatsComponent) private characterStatsComponent: CharacterStatsComponent;

  constructor(private route: ActivatedRoute, private router: Router, private characterService: CharacterService) {
    this.route.params.subscribe( params => this.id = params.id );
    this.JSON = JSON;
  }

  ngOnInit() {
    if (this.id > 0) {
      this.characterService.getCharacter(this.id).subscribe(character => {
        this.character = character;
        console.log('initializing character');

        this.character = Character.initialize(this.character);
      });
    }
    else {
      this.character = new Character(0, "", 0, 0);
    }
  }

  isComponentInvalid(name: string) {
    return this.componentStates[name];
  }
}
