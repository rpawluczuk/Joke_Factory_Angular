import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joke } from '../common/joke';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  private baseUrl = 'http://localhost:8080/api/'

  constructor(private httpClient: HttpClient) { }

  getJokeList(): Observable<Joke[]> {
    const searchUrl = `${this.baseUrl}jokes`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(Response => Response._embedded.jokes)
    )
  }

  createJoke(joke: object): Observable<object> {  
    return this.httpClient.post(`${this.baseUrl}`+'save-joke', joke);  
  }

  deleteJoke(id: number): Observable<any> {  
    return this.httpClient.delete(`${this.baseUrl}delete-joke/${id}`, { responseType: 'text' });  
  } 

  getJoke(theJokeId: number): Observable<Joke> {

    const jokeUrl = `${this.baseUrl}/${theJokeId}`;

    return this.httpClient.get<Joke>(jokeUrl);
  }

  getJokeListPaginate(thePage: number,
    thePageSize: number,
    theStructureId: number): Observable<GetResponse> {

    const searchUrl = `${this.baseUrl}jokes?`
      + `page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponse>(searchUrl);
  }

  searchJokes(theKeyword: string): Observable<Joke[]> {

    const searchUrl = `${this.baseUrl}jokes/search/findByTitleContaining?title=${theKeyword}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(Response => Response._embedded.jokes)
    )
  }

  searchJokesPaginate(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponse> {

    const searchUrl = `${this.baseUrl}jokes/search/findByTitleContaining?title=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponse>(searchUrl);
  }
}

interface GetResponse {
  _embedded: {
    jokes: Joke[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
