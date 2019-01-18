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
}
