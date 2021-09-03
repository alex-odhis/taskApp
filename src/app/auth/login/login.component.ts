import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({

    templateUrl: './login.component.html',

    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    loginForm: FormGroup
    user: any
    errorMessage=''

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    loginUser() {
        if (this.loginForm.valid) {
            if (this.loginForm.dirty) {
                this.user = this.loginForm.value
                this.authService.logIn(this.user).subscribe({
                    next: data => this.onSaveComplete(),
                    error: err => this.errorMessage = err
                })
            } else {
                this.onSaveComplete()
            }
        } else {
            console.log('Please Correct the erros');

        }
    }

    onSaveComplete(): void {
        this.loginForm.reset()
        this.router.navigate(['/welcome'])
    }

    onBack(): void {
        this.router.navigate(['/welcome'])
    }

}