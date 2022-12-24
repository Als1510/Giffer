import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  loader = new BehaviorSubject<boolean>(false);
  alert = new BehaviorSubject<object>({
    msg: '',
    display: false,
    status: ''
  });
  constructor() { }
}
