import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  isInteger(number: string): boolean {
    if (number.match('.*[^0-9]+.*')) {
      return false;
    }

    return Number.isInteger(Number.parseInt(number));
  }

  capitalize(value: string): string {
    return value.toLowerCase().replace(/^\w/, c => c.toUpperCase());
  }

  deleteObjectFromArray(array: Array<Object>, id: number,  comparator: (object: Object, id: number) => boolean) {
    if (!array || array.length === 0 || !id || !comparator) {
      return;
    }

    let index: number = array.findIndex(object => comparator(object, id));

    if (index > -1) {
      return array.splice(index, 1)[0];
    }

    return null;
  }
}
