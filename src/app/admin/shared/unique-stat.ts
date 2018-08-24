import {Stat} from "./stat";

export class UniqueStat {
  constructor(
    public stat: Stat,
    public fieldName: string
  ) {}
}
