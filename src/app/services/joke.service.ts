import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joke } from '../common/joke';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
 
  private baseUrl = 'http://localhost:8080/api/jokes'

  constructor(private httpClient: HttpClient) { }

  getJokeList(theStructureId: number): Observable<Joke[]>{
    const searchUrl = `${this.baseUrl}/search/findByStructureId?id=${theStructureId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(Response => Response._embedded.jokes)
    )
  }

  searchJokes(theKeyword: string): Observable<Joke[]>{
    
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(Response => Response._embedded.jokes)
    )
  }
}

interface GetResponse {
  _embedded: {
    jokes: Joke[];
  }
}
