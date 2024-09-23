import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  display: string = '0';
  firstValue: number | null = null;
  operator: string | null = null;
  waiting: boolean = false;

  input(digit: string) {
    if (this.waiting) {
      this.display = digit;
      this.waiting = false;
    }
  }
}
