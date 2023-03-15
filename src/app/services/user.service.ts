import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {CreateUser} from "../models/create-user";
import {UpdateUser} from "../models/update-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/v1/users'

  constructor(private http: HttpClient) {
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  createUser(value: CreateUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, value);
  }

  patchUser(id: number, value: UpdateUser): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
