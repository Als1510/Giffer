import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { UtilityService } from './utility.service';
import { Router } from '@angular/router';
import { TokenstorageService } from './tokenstorage.service';

const TOKEN_HEADER_KEY = 'x-auth-token'

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService {

  token = '';

  constructor(
    private _utilityService: UtilityService,
    private _router: Router,
    private _tokenService: TokenstorageService
  ) { }

  getToken() {
    this.token = this._tokenService.getToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this._utilityService.loader.next(true)
    this.getToken();

    req = req.clone({
      setHeaders: {Authorization: this.token}
    })

    return next.handle(req).pipe(
      catchError((error) => {
        this._utilityService.loader.next(false)
        if(error instanceof HttpErrorResponse) {
          if(Array.isArray(error.error.errors)) {
            let alert = {
              msg: error.error.errors[0].msg,
              display: true,
              status: 'danger'
            }
            this._utilityService.alert.next(alert)
          } else {
            this._router.navigate(['login'])
          }
        }
        return EMPTY;
      })
    )
  }
}
