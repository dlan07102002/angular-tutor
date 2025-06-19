import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductItem } from '../types/productItem';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { UpperCasePipe } from '../header-layout/pipes/UpperCasePipe.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '../header-layout/pipes/CurrencyPipe.pipe';
import { interval, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
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
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnChanges, OnDestroy, OnInit {
  trackById(index: number, item: any): number {
    return item.id;
  }
  @Input() products: ProductItem[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.subscription = new Subscription();
  }

  subscription: Subscription;
  counter = 0;

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe(() => {
      console.log(this.counter);
      this.cdr.detectChanges(); // <- this forces the view to update
      this.counter++;
    });
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
