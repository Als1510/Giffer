import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { EnviromentService } from './enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private _http: HttpClient,
    private _env: EnviromentService
  ) { }

  register(name: string, email: string, password: string) {
    return this._http.post(this._env.API_URL+'/auth/register', {name, email, password}, this.httpOptions);
  }

  login(email: string, password: string) {
    return this._http.post(this._env.API_URL+'/auth/login', {email, password}, this.httpOptions);
  }
}
