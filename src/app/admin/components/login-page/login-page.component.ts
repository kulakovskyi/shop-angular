import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInterface} from "../../../shared/types/user.interface";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  form!: FormGroup
  submitted = false

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.initialForm()
  }
  initialForm(){
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  onSubmit() {
    if(this.form.invalid){
      return
    }

    this.submitted = true
    const user: UserInterface = {
      ...this.form.value,
      returnSecureToken: true
    }

    this.authService.login(user).subscribe( () => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}
