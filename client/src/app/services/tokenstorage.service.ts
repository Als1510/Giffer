import { Injectable } from '@angular/core';

const TOKEN_KEY = 'x-auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {

  constructor() { }

  public setToken(token: string): void{
    localStorage.removeItem(TOKEN_KEY)
    localStorage.setItem(TOKEN_KEY, token)
  }
  
  public getToken(): string | ' ' {
    let token = localStorage.getItem(TOKEN_KEY);
    if(token) {
      return token
    } else {
      return '';
    }
  }

  getName() {
    return localStorage.getItem('name')
  }

  saveUsername(name) {
    localStorage.removeItem('name')
    localStorage.setItem('name', name)
  }
}
