import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Post} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly API_URL = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }
  getPosts(count = 10): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL).pipe(
      map(response => response.filter((post, i) => i < count))
    );
  }
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/${id}`);
  }
  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.API_URL, post);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.API_URL}/${post.id}`, post);
  }
}
