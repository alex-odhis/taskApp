import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _signUpUrl = `/users`;
    private _loginUrl = `/users/login`;
    private _logoutUrl = `/users/logout`;
    constructor(private http: HttpClient) { }

    signIn(user): Observable<any> {
        return this.http.post<any>(this._signUpUrl, user).pipe(
            tap(res => {
                localStorage.setItem('token', res.token)
                console.log(res);
            }),
            catchError(this.handleError)
        )
    }

    logIn(user): Observable<any> {
        return this.http.post<any>(this._loginUrl, user).pipe(
            tap(res => localStorage.setItem('token', res.token)),
            catchError(this.handleError)
        )
    }

    loggedIn() {
        return !!localStorage.getItem('token')
    }
    getToken() {
        return localStorage.getItem('token')
    }

    logOut(): Observable<any> {
        return this.http.post<any>(this._logoutUrl, {}).pipe(
            tap(res => localStorage.removeItem('token')),
            catchError(this.handleError)
        )
    }

    getProfile(): Observable<any> {
        return null
    }

    editProfile(user): Observable<any> {
        return null
    }

    deleteProfile(): Observable<any> {
        return null
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);

    }
}