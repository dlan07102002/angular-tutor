import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductItem } from '../types/productItem';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { UpperCasePipe } from '../header-layout/pipes/UpperCasePipe.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '../header-layout/pipes/CurrencyPipe.pipe';
import { interval, Subscription } from 'rxjs';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
    UpperCasePipe,
    NgFor,
    NgClass,
    NgIf,
    CurrencyPipe,
    CounterComponent,
    AsyncPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnChanges, OnDestroy, OnInit {
  trackById(index: number, item: any): number {
    return item.id;
  }
  @Input() products: ProductItem[] = [];

  subscription: Subscription;

  constructor(private zone: NgZone) {
    this.subscription = new Subscription();
  }
  counter$ = interval(1000);
  ngOnInit(): void {
    this.subscription = this.counter$.subscribe((val) => console.log(val));
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('interval unsubscribed');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['products'].currentValue);
    console.log(changes['products'].previousValue);
  }

  handleDelete(id: number): void {
    this.deleteEvent.emit(id);
  }
  @Output() deleteEvent = new EventEmitter<number>();

  // Define getter
  get totalPrice(): string {
    const sum = this.products.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return `Total price: ${sum}`;
  }
}
