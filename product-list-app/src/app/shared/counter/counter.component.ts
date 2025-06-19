import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  template: `
    <h3>Observable: {{ counter1 }}</h3>
    <h3>Subject: {{ counter2 }}</h3>
    <h3>BehaviorSubject: {{ counter3 }}</h3>
  `,
})
export class CounterComponent implements OnInit {
  counter1 = 0;
  counter2 = 0;
  counter3 = 0;
  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.counterService.counter$.subscribe((val) => (this.counter1 = val));
    this.counterService.subject$.subscribe((val) => (this.counter2 = val));
    this.counterService.behavior$.subscribe((val) => (this.counter3 = val));
  }
}
