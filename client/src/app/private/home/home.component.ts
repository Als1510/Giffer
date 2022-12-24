import { Component, OnInit } from '@angular/core';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = ""
  searchText = ""
  gifs = []

  constructor(
    private _tokenService: TokenstorageService,
    private _userService: UserService,
    private _utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.username = this._tokenService.getName()
  }

  searchGif(data) {
    this.searchText = data.value
    if(this.searchText.length > 0) {
      this._userService.getGiphy(this.searchText).subscribe((res)=>{
        this._utilityService.loader.next(false)
        this.gifs = res['data']
      })
    }
  }

  addFavourite(data) {
    this._userService.addFavourites(data).subscribe((res)=>{{
      let msg = {
        msg: res['msg'],
        display: true,
        status: 'success'
      }
      this._utilityService.alert.next(msg);
      this._utilityService.loader.next(false);
    }})
  }
}
