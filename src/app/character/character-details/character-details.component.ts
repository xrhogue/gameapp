import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Character} from "admin/shared/character";
import {CharacterBaseComponent} from "../../shared/components/character-base/character-base.component";
import {UtilService} from "../../shared/services/util/util.service";
import {CharacterGeneralComponent} from "./character-general/character-general.component";
import {CharacterStatsComponent} from "./character-stats/character-stats.component";
import {CharacterService} from "../../service/character/character.service";

@Component({
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent extends CharacterBaseComponent implements OnInit {
  id: number;

  @ViewChild(CharacterGeneralComponent, { static: false }) private characterGeneralComponent: CharacterGeneralComponent;
  @ViewChild(CharacterStatsComponent, { static: false }) private characterStatsComponent: CharacterStatsComponent;

  constructor(private route: ActivatedRoute, private router: Router, private characterService: CharacterService, protected utilService: UtilService) {
    super(utilService);
    this.route.params.subscribe( params => this.id = params.id );
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
      this.character = new Character(0, "", 0, 0, 0);
    }
  }

  isComponentInvalid(name: string) {
     return Character.isInvalid(this.character, name);
  }

  update() {
    this.characterService.updateCharacter(this.character).subscribe(character => {
      this.characterChange.emit(character);
      this.router.navigateByUrl('/characters').catch(/*handle error here*/);
    })
  }

  cancel() {
    this.router.navigateByUrl('/characters').catch(/*handle error here*/);
  }
}
