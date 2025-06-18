import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductItem } from '../types/productItem';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { UpperCasePipe } from '../header-layout/pipes/UpperCasePipe.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '../header-layout/pipes/CurrencyPipe.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, NgFor, NgClass, NgIf, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnChanges {
  trackById(index: number, item: any): number {
    return item.id;
  }
  @Input() products: ProductItem[] = [];

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
