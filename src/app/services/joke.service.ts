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

  getJokeList(): Observable<Joke[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(Response => Response._embedded.jokes)
    )
  }
}

interface GetResponse {
  _embedded: {
    jokes: Joke[];
  }
}
