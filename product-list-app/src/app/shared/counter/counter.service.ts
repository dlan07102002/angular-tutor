import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  // Classic cold observable (every subscriber gets its own stream)
  counter$: Observable<number> = interval(1000).pipe(map((x) => x + 1));

  // Subject: emits to current subscribers only
  private subject = new Subject<number>();
  subject$ = this.subject.asObservable();

  // BehaviorSubject: always holds the latest value
  private behavior = new BehaviorSubject<number>(0);
  behavior$ = this.behavior.asObservable();

  constructor() {
    // Emit to subject and behavior every second
    interval(1000).subscribe((val) => {
      this.subject.next(val);
      this.behavior.next(val);
    });
  }
}
