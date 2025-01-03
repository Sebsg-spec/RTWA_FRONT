import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  lang = "";



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

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private translateService: TranslateService) {

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
    this.lang = localStorage.getItem('lang') || 'ro'

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

  changeLang(lang: any) {
    const selectedLanguage = lang.target.value;

    localStorage.setItem('lang', selectedLanguage);

    this.translateService.use(selectedLanguage);


  }

  onLogIn(): any {

    this.http.post(`${environment.baseApiUrl}/LogIn/`, this.loginObj)
      .subscribe((respons: any) => {
        if (respons.result) {

          this.canAcces = "true";

          sessionStorage.setItem('canAcces', this.canAcces)
          sessionStorage.setItem('username', respons.account_Id);
          sessionStorage.setItem('name', respons.fullName)

          this.router.navigateByUrl('home')

        } else {

          this.canAcces = "false"

          sessionStorage.setItem('canAcces', this.canAcces)
          const translatedMessage = this.translateService.instant(respons.message);
          alert(translatedMessage);
        }
      })

  }

  
  onRegister(): any {

    if (this.registerForm.valid) {
      this.registerObj.fullname = this.registerForm.controls['fullname'].value;
      this.registerObj.email = this.registerForm.controls['email'].value;
      this.registerObj.password = this.registerForm.controls['password'].value;

    this.http.post(`https://localhost:7217/api/LogIn/Register`, this.registerObj)
      .subscribe(
        (response: any) => {
          if (response.message == 'Account already exists.') {
            const translatedMessage = this.translateService.instant(response.message);
            alert(translatedMessage);
            const container: HTMLElement | null = document.getElementById('container');
            if (container) {
              container.classList.remove("active");
            }
            this.registerForm.reset();
          }
          else if (response.message == 'Account created successfully') {
            const translatedMessage = this.translateService.instant(response.message);
            alert(translatedMessage);
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



}







