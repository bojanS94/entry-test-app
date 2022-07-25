import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  send: boolean | undefined;

  public loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/signupUsers")
      .subscribe(response => {
        const user = response.find((x: any) => {
          return x.email === this.loginForm.value.email && x.password === this.loginForm.value.password;
        })
        if (user) {
          alert("Uspješno ste se prijavili!")
          this.loginForm.reset();
          this.router.navigate(['tasks-page'])
        }

        else if (!user) {
          alert("Korisnik ne postoji!")
          this.loginForm.reset();
        }

        else {
          alert("Korisnik nije pronađen!");
        }
      }, error => {
        alert("Došlo je do pogreške, pokušajte ponovo!");
      })
  }

  get checkErrorFunction() {
    return this.loginForm.controls;
  }

}