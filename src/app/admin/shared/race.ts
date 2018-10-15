export class Race {
  constructor(
    public id: number,
    public name: string,
    public selectable: boolean,
    public parentId: number,
  ) {}
}
