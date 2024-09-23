import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  localStorageService = inject(LocalStorageService);

  display: string = '0';
  firstValue: number | null = null;
  operator: string | null = null;
  waiting: boolean = false;

  history: any[] = [];

  input(digit: string) {
    if (this.waiting) {
      this.display = digit;
      this.waiting = false;
    } else {
      this.display = this.display === '0' ? digit : this.display + digit;
    }
    console.log(digit);
  }

  decimalInput() {
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  handleBasicOperator(nextOperator: string) {
    const secondValue = parseFloat(this.display);

    if (this.operator && this.waiting) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstValue === null) {
      this.firstValue = secondValue;
    } else if (this.operator) {
      const result = this.calculate(
        this.operator,
        this.firstValue,
        secondValue
      );
      this.display = `${parseFloat(result.toFixed(7))}`;

      this.localStorageService.insertRegistry(
        this.firstValue,
        secondValue,
        result,
        this.operator
      );
      this.firstValue = result;
    }

    this.operator = nextOperator;
    this.waiting = true;
  }

  calculate(operator: string, firstValue: number, secondValue: number): number {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  }

  reset() {
    this.display = '0';
    this.firstValue = null;
    this.operator = null;
    this.waiting = false;
  }

  negate() {
    this.display = (parseFloat(this.display) * -1).toString();
  }
  percentage() {
    this.display = (parseFloat(this.display) / 100).toString();
  }

  executeEqualButton() {
    if (this.operator && !this.waiting) {
      const secondValue = parseFloat(this.display);
      const result = this.calculate(
        this.operator,
        this.firstValue!,
        secondValue
      );
      this.display = `${parseFloat(result.toFixed(7))}`;

      this.localStorageService.insertRegistry(
        this.firstValue!,
        secondValue,
        result,
        this.operator
      );

      this.firstValue = null;
      this.operator = null;
      this.waiting = false;
    }
  }

  showHistory() {
    this.history = this.localStorageService.getHistory();
  }
}
