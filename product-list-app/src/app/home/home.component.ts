import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../shared/header-layout/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/header-layout/pipes/UpperCasePipe.pipe';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductItem } from '../shared/types/productItem';
import { ProductListComponent } from '../shared/product-list/product-list.component';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    CurrencyPipe,
    UpperCasePipe,
    NgFor,
    NgIf,
    RouterLink,
    ProductListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Text
  protected title = {
    name: 'Test',
    old: 2024,
  };
  isVisible = false;

  // Properties
  isDisable = false;

  // Attributes
  contentImage = 'Duclan Welcome';
  showAlert() {
    alert(this.contentImage);
  }

  nameBtn = 'Click me';

  clickMessage = '';

  bindingMessage = '';

  // Constructor cho phép import service, directive từ file, components
  constructor() {
    console.log('Initialize Component');
  }
  // Làm việc và tương tác với api, chạy sau constructor
  ngOnInit(): void {
    console.log('HomeComponent initialized');
  }
  products: ProductItem[] = [
    {
      id: 1,
      name: 'Scented Candle - Lavender',
      description: 'Relaxing lavender scent for peaceful evenings.',
      price: 120000,
      inStock: true,
    },
    {
      id: 2,
      name: 'Scented Candle - Vanilla',
      description: 'Sweet vanilla aroma perfect for cozy nights.',
      price: 135000,
      inStock: false,
    },
    {
      id: 3,
      name: 'Scented Candle - Citrus',
      description: 'Fresh citrus fragrance to energize your day.',
      price: 110000,
      inStock: true,
    },
    {
      id: 4,
      name: 'Scented Candle - Ocean Breeze',
      description: 'Clean and refreshing scent inspired by the sea.',
      price: 145000,
      inStock: true,
    },
  ];

  handleClickMe(): void {
    if (this.clickMessage) {
      this.clickMessage = '';
    } else this.clickMessage = 'Click me Done';
  }

  handleChangeValue(): void {
    console.log('Received event');
  }

  handleDelete(id: number): void {
    this.products = this.products.filter((val) => val.id !== id);
    console.log(this.products.filter((val) => val.id !== id));
  }
}
