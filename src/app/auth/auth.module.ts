import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
    declarations: [
        SignUpComponent,
        LoginComponent
    ],

    imports: [
        RouterModule.forChild([
            { path: 'sign', component: SignUpComponent },
            { path: 'login', component: LoginComponent }
        ]),
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule
    ],

    providers: [
        AuthService
    ],
    
})
export class AuthModule{ }
