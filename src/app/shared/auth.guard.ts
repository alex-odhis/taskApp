import { Injectable } from "@angular/core";
import { CanActivate, Router,  } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService,
                private route: Router) {
        
    }
    canActivate(): boolean {
        if (this.auth.loggedIn()) {
            return true
        }else{
            this.route.navigate(['/login'])
            return false
        }    
    }
}