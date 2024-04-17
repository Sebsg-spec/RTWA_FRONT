import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginObj: any = {
    Email: '',
    FullName: '',
    Account_Id: 0,
    Result: false,
    Message: ''
  }

  registerObj: any = {
    fullname: '',
    email: '',
    password: ''
  }
  
  registerForm: FormGroup;

  loginForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  username: string = "";

  canAcces: string = "";

  form!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
    const container: HTMLElement | null = document.getElementById('container');
    const registerBtn: HTMLElement | null = document.getElementById('register');
    const loginBtn: HTMLElement | null = document.getElementById('login');

    if (container && registerBtn && loginBtn) {
      registerBtn.addEventListener('click', () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    } else {
      console.error('One or more elements not found.');
    }

  }

  onLogIn(): any {

    this.http.post(`${environment.baseApiUrl}/LogIn/`, this.loginObj)
      .subscribe((respons: any) => {
        if (respons.result) {

          this.canAcces = "true";
          
          sessionStorage.setItem('canAcces', this.canAcces)
          sessionStorage.setItem('username', respons.account_Id);
          sessionStorage.setItem('name', respons.fullName)

          this.router.navigateByUrl('offer')

        } else {

          this.canAcces = "false"

          sessionStorage.setItem('canAcces', this.canAcces)

          alert(respons.message)
        }
      })

  }

  onRegister(): any {
    this.http.post(`https://localhost:7217/api/LogIn/Register`, this.registerObj)
      .subscribe(
        (response: any) => {
          alert(response.message);
          if (response.message == 'Account already exists.') {
            const container: HTMLElement | null = document.getElementById('container');
            if (container) {
              container.classList.remove("active");
            }
            this.registerForm.reset();
          }
        }
      );
  }
}



export class Register {
  username: string;
  email: string;
  password: string;

  constructor() {
    this.username = ""
    this.email = ""
    this.password = ""
  }

}







