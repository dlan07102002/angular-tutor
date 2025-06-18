import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../shared/header-layout/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/header-layout/pipes/UpperCasePipe.pipe';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductItem } from '../shared/types/productItem';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/BlogService';

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
  products: ProductItem[] = [];

  // Constructor cho phép import service, directive từ file, components
  constructor(private blogService: BlogService) {
    console.log('Initialize Component');
  }

  // Làm việc và tương tác với api, chạy sau constructor
  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(
      ({ data }) =>
        (this.products = data.map((item: any) => ({
          ...item,
          price: Number(item.body),
          name: item.title,
          description: item.author,
        })))
    );
  }

  nameBtn = 'Click me';

  clickMessage = '';

  bindingMessage = '';

  // ngDoCheck(): void {
  //   console.log('Check component');
  // }

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
