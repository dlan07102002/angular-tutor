import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private subject = new Subject<number>();
  subject$ = this.subject.asObservable();

  private behavior = new BehaviorSubject<number>(0);
  behavior$ = this.behavior.asObservable();

  counter$ = interval(1000); // runs outside Angular zone

  constructor(private zone: NgZone) {
    interval(1000).subscribe((val) => {
      this.zone.run(() => {
        this.subject.next(val);
        this.behavior.next(val);
      });
    });
  }
}
