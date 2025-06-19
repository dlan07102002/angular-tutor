import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { BlogService } from '../../services/BlogService';
import { BlogItem } from '../shared/types/productItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  product = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  get name() {
    return this.product?.get('name');
  }

  get price() {
    return this.product?.get('price');
  }

  get description() {
    return this.product?.get('this');
  }

  constructor(private blogService: BlogService, private router: Router) {}

  handleAddToCart() {
    if (this.name?.hasError('required') || this.price?.hasError('required')) {
      return;
    }
    const blogItem: BlogItem = {
      id: Math.random(),
      title: String(this.name?.value),
      body: String(this.price?.value),
      author: 'banh bo',
    };

    this.blogService.postBlog(blogItem).subscribe(({ data }: any) => {
      if (data.id) {
        this.router.navigate(['/']);
      }
    });
  }
}
