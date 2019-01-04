import {Gender} from "admin/shared/gender";

export class UniqueGender {
  constructor(
    public genders: Array<Gender>,
    public name: string
  ) {}
}
