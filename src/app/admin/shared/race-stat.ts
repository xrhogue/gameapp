export class RaceStat {
  constructor(
    public statId: number,
    public genderId: number,
    public low: number = 70,
    public high: number = 100,
    public max: number = 150
  ) {}
}
