import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {

  constructor() { }
  // API_URL: string = "http://localhost:5000/api"
  API_URL: string = "https://giffer.onrender.com/api"
  Giphy:string = "https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=3&q="
}
