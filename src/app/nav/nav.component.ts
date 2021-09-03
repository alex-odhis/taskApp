import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'navigation',

    templateUrl: './nav.component.html',

    styleUrls: ['./nav.component.css']
})
export class NavComponent{
    errorMassage =''
    constructor( public _auth: AuthService) {}

    logout(){
        this._auth.logOut().subscribe({
            error: err => this.errorMassage = err
        })
    }
}