import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private _utilityService: UtilityService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: "",
      email: "",
      password: "",
    })
  }

  onSubmit() {
    let name = this.registerForm.get('name')?.value
    let email = this.registerForm.get('email').value.toLowerCase();
    let password = this.registerForm.get('password')?.value
    
    this._authService.register(name, email, password).subscribe((res)=>{
      this._utilityService.loader.next(false)
      let msg = {
        msg: res['msg'],
        display: true,
        status: 'success'
      }
      this._utilityService.alert.next(msg)
      this._router.navigate(['login'])
      this.registerForm.reset()
    })
  }
}
