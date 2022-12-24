import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  favourites = []
  constructor(
    private _userService: UserService,
    private _utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this._userService.getFavourites().subscribe((res)=>{
      this.favourites = Object.values(res)
      this._utilityService.loader.next(false)
    })
  }
}
