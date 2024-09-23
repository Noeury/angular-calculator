import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  insertRegistry(
    firstValue: number,
    secondValue: number,
    result: number,
    operator: string
  ) {
    const newEntry = { firstValue, secondValue, result, operator };
    let history = JSON.parse(localStorage.getItem('history') || '[]');

    if (history.length >= 10) {
      history.shift();
    }

    history.push(newEntry);
    localStorage.setItem('history', JSON.stringify(history));
  }

  getHistory() {
    let history = JSON.parse(localStorage.getItem('history') || '[]');
    return history.reverse();
  }
}
