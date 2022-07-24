import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      surname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
      phone: new FormControl(''),
      registerCheck: new FormControl(false, Validators.requiredTrue)
    }, {
      validators: this.repeatedPasswordMustMatch('password', 'repeatPassword')
    })
  }


  signUp() {
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe(resolve => {
        alert("Uspješno ste se registrovali!")
        this.signupForm.reset();
        this.router.navigate(['login-page'])
      }, error => {
        alert('Došlo je do greške!');
      }
      )
  }

  get checkErrorFunction() {
    return this.signupForm.controls;
  }

  repeatedPasswordMustMatch(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPassword.error && !confirmPassword.error['repeatedPasswordMustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ repeatedPasswordMustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}
