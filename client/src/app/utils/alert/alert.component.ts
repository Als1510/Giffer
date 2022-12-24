import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert;

  constructor(
    private _utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this._utilityService.alert.subscribe((res)=>{
      this.alert = res
      this.hideAlert()
    })
  }

  hideAlert() {
    setTimeout(()=>{
      this.alert = {};
    }, 3000)
  }

}
