import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from '../app/shared/types/responseData';
import { BlogItem, ProductItem } from '../app/shared/types/productItem';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}

  getBlogs(): Observable<ResponseData<ProductItem[]>> {
    return this.http.get<any>('https://ninedev-api.vercel.app/blogs');
  }

  getDetail(id: number): Observable<{ data: ProductItem }> {
    return this.http.get<{ data: ProductItem }>(
      `https://ninedev-api.vercel.app/blogs/${id}`
    );
  }

  postBlog(payload: BlogItem): Observable<ResponseData<ProductItem>> {
    return this.http.post<any>('https://ninedev-api.vercel.app/blogs', payload);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
  }
}
