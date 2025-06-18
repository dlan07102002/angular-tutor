import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '../header-layout/pipes/CurrencyPipe.pipe';
import { ProductItem } from '../types/productItem';
import { UpperCasePipe } from '../header-layout/pipes/UpperCasePipe.pipe';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, CurrencyPipe, NgClass, NgIf],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  @Input() product: ProductItem | undefined = undefined;

  @Output() deleteEvent = new EventEmitter<number>();

  handleDelete = (id: number) => {
    console.log('ProductItem: ', id);
    this.deleteEvent.emit(id);
  };
}
