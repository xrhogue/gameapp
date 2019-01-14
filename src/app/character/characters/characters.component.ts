import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CharacterService} from "../../service/character/character.service";
import {Character} from "admin/shared/character";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: Array<Character>;

  constructor(private characterService: CharacterService, private router: Router) {
  }

  ngOnInit() {
    this.characterService.getCharacters().subscribe(characters => this.characters = characters);
  }

  addCharacter() {
    this.router.navigateByUrl('/characters/0');
  }

  updateCharacter(character: Character) {
    this.router.navigateByUrl('/characters/' + character.id);
  }

  deleteCharacter(characterId: number) {
    this.characterService.deleteCharacter(characterId).subscribe(character => this.characterService.getCharacters().subscribe(characters => this.characters = characters));
  }

}
