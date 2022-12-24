import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnviromentService } from './enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private _http: HttpClient,
    private _env: EnviromentService
  ) { }

  getFavourites() {
    return this._http.get(this._env.API_URL+'/gif', this.httpOptions)
  }

  addFavourites(favourites: String) {
    return this._http.post(this._env.API_URL+'/gif/favourite', {favourites}, this.httpOptions)
  }

  getGiphy(search: string) {
    return this._http.get(this._env.Giphy+`${search}`)
  }
}
