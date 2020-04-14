import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Structure } from '../common/structure';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  private baseUrl = 'http://localhost:8080/api/structures'

  constructor(private httpClient: HttpClient) { }

  getStructureList(): Observable<Structure[]>{
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(Response => Response._embedded.structures)
    )
  }
}

interface GetResponse {
  _embedded: {
    structures: Structure[];
  }
}