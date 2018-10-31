
declare global {
  interface NumberConstructor {
    between: (min: number, max: number, inclusiveMin: boolean, inclusiveMax: boolean) => boolean;
  }
}

Number.between = function(min: number, max: number, inclusiveMin: boolean, inclusiveMax: boolean): boolean {
  return (!!min ? (inclusiveMin ? this >= min : this > min) : true) && ( !!max ? (inclusiveMax ? this <= max : this < max) : true);
}

export class Between {
  constructor(
    public min: number,
    public max: number,
    public inclusiveMin?: boolean,
    public inclusiveMax?: boolean
  ) {}
}
