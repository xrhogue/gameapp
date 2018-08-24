export class Stat {
  constructor(
    public id: number,
    public name: string,
    public shortName: string,
    public code: string,
    public multiplier?: number
  ) {}
}
