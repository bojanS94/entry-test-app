import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  public signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({

      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      repeatPassword: [''],
      phone: ['']
    })
  }


  signUp() {
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe(resolve => {
        const user = resolve.find((x: any) => {
          return x.email === this.signupForm.value.email && x.password === this.signupForm.value.password && this.signupForm.value.repeatPassword
            && this.signupForm.value.name && this.signupForm.value.surname;
        })

        if (user) {
          alert("Uspješno ste se prijavili!")
          this.signupForm.reset();
          this.router.navigate(['login-page'])
        }

        else {
          alert("Neispravni korisnički podaci!")
        }
      }, error => {
        alert('Došlo je do greške!');
      }
      )
  }
}
