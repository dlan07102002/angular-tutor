import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../shared/header-layout/pipes/CurrencyPipe.pipe';
import { UpperCasePipe } from '../shared/header-layout/pipes/UpperCasePipe.pipe';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductItem } from '../shared/types/productItem';
import { ProductListComponent } from '../shared/product-list/product-list.component';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../services/BlogService';
import { interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
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
export class HomeComponent implements OnInit, OnDestroy {
  isVisible = true;

  handleShow() {
    this.isVisible = !this.isVisible;
    console.log(this.isVisible);
  }

  products: ProductItem[] = [];

  // Constructor cho phép import service, directive từ file, components
  constructor(private blogService: BlogService) {
    console.log('Initialize Component');
    this.getBlogApi = new Subscription();
  }

  getBlogApi: Subscription;

  // Làm việc và tương tác với api, chạy sau constructor
  ngOnInit(): void {
    this.getBlogApi = this.blogService
      .getBlogs()
      .pipe(
        map(({ data }) =>
          data
            .map((item: any) => ({
              ...item,
              price: Number(item.body),
              name: item.title,
              description: item.author,
              inStock: false,
            }))
            .filter((item) => item.price > 300000)
        )
      )
      .subscribe((res) => {
        this.products = res;
      });
  }

  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log('getBlogApi unsubscribed');
    }
  }

  nameBtn = 'Click me';

  clickMessage = '';

  bindingMessage = '';

  handleClickMe(): void {
    if (this.clickMessage) {
      this.clickMessage = '';
    } else this.clickMessage = 'Click me Done';
  }

  handleChangeValue(): void {
    console.log('Received event');
  }

  handleDelete(id: number): void {
    this.blogService.deleteBlog(id).subscribe(({ data }: any) => {
      if (data == 1) {
        this.products = this.products.filter((val) => val.id !== id);
      }
    });
  }
}
