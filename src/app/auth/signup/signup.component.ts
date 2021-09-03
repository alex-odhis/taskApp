import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({

    templateUrl: './signup.component.html',

    styleUrls: ['./signup.component.css']
})

export class SignUpComponent implements OnInit {
    signInForm: FormGroup
    errorMessage=''
    user:any

    constructor(private fb: FormBuilder,
        private router: Router,
        private authService: AuthService) { }

    ngOnInit() {
        this.signInForm = this.fb.group({
            email: ['', Validators.required],
            userName: ['', Validators.required],
            password: ['', Validators.required],

        })
    }

    signInUser(): void {
        if (this.signInForm.valid) {
            if (this.signInForm.dirty) {
                const p = this.signInForm.value

                this.authService.signIn(p).subscribe({
                    next: data => {
                        data = this.user;
                        this.onSaveComplete();
                        console.log(this.user);
                    },
                    error: err => this.errorMessage = err
                })

            } else {
                this.onSaveComplete();
            }
        } else {
            this.errorMessage = 'Please correct form errors';
        }
    }

    onSaveComplete(): void {
        this.signInForm.reset()
        this.router.navigate(['/tasks'])
    }

    onBack(): void {
        this.router.navigate(['tasks']);
    };


}