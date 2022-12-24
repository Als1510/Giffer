import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;
  constructor(
    private _utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this._utilityService.loader.subscribe((res)=>{
      this.loading = res
    })
  }

}
