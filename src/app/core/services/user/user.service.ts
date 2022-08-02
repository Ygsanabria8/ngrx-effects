import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://reqres.in/api';

  constructor(
    private _http: HttpClient,
  ) { }

  getUsers(): Observable<User[]>{
    return this._http.get<any>(`${this.url}/users`)
      .pipe(map( response => response.data));
  }
}
