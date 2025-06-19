import {
  Component,
  NgZone,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/BlogService';
import { ProductItem } from '../shared/types/productItem';
import { CurrencyPipe } from '../shared/header-layout/pipes/CurrencyPipe.pipe';
import { ProductFormComponent } from '../form/product-form.component';
import { JsonPipe, NgIf } from '@angular/common';
import { map, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ProductFormComponent, CurrencyPipe, NgIf, JsonPipe],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id!: number;
  product!: ProductItem | undefined;
  getBlogDetailApi: Subscription;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.getBlogDetailApi = new Subscription();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.getBlogDetailApi = this.blogService
      .getDetail(+id!)

      .subscribe((res) => {
        this.product = { ...res.data };
        this.cdr.detectChanges();
        console.log(res);
      });
  }

  ngOnDestroy(): void {
    if (this.getBlogDetailApi) {
      this.getBlogDetailApi.unsubscribe();
      console.log('getBlogDetailApi unsubscribed');
    }
  }
}
