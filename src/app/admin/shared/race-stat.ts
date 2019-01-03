export class RaceStat {
  constructor(
    public statId: number,
    public genderId: number,
    public low: number = 70,
    public high: number = 100,
    public max: number = 150
  ) {}

  isInvalid(): boolean {
     return this.low <= 0 || this.high <= 0 || this.max <= 0 || this.low >= this.high || this.high >= this.max;
  }
}
