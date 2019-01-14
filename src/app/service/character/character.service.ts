import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Character} from "admin/shared/character";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  characters: Array<Character>

  constructor(private http: HttpClient) {
    this.updateCache();
  }

  getCharactersCache(): Array<Character> {
    return this.characters;
  }

  getCharacters(): Observable<Array<Character>> {
    return this.http.get<Array<Character>>("http://localhost:8888/admin/characters");
  }

  getCharacter(characterId: number): Observable<Character> {
    return this.http.get<Character>("http://localhost:8888/admin/characters/" + characterId);
  }

  addCharacter(character: Character): Observable<Character> {
    setTimeout(this.updateCache, 500);

    return this.http.post<Character>("http://localhost:8888/admin/characters", character);
  }

  updateCharacter(character: Character): Observable<Character> {
    setTimeout(this.updateCache, 500);

    return this.http.put<Character>("http://localhost:8888/admin/characters", character);
  }

  deleteCharacter(characterId: number): Observable<Character> {
    setTimeout(this.updateCache, 500);

    return this.http.delete<Character>("http://localhost:8888/admin/characters/" + characterId);
  }

  isUnique(character: Character, fieldName: String, value: String) {
    this.getCharacters().subscribe(characters => this.characters = characters);

    if (!!this.characters) {
      for (let characterKey in this.characters) {
        if (this.characters[characterKey].id != character.id &&
          ((fieldName === "name" && this.characters[characterKey].name === value))) {
          return false;
        }
      }
    }

    return true;
  }

  updateCache() {
    if (!!this.getCharacters) {
      this.getCharacters().subscribe(characters => this.characters = characters);
    }
  }
}
