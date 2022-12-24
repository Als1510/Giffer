import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private _utilityService: UtilityService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _route: Router,
    private _tokenService: TokenstorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: "",
      password: ""
    })
    
  }

  onSubmit() {
    let email = this.loginForm.get('email')?.value
    let password = this.loginForm.get('password')?.value
    this._authService.login(email, password).subscribe((res)=> {
      this._tokenService.setToken(res['token']);
      this._tokenService.saveUsername(res['name'])
      this._utilityService.loader.next(false)
      this._route.navigate(['home'])
      this.loginForm.reset()
    })
  }

}
