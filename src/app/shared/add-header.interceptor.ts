import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AddHeaderInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}

    intercept( req: HttpRequest<any>, next: HttpHandler ) : Observable<HttpEvent<any>>{
        console.log(`AddHeaderInterceptor - ${req.url}`);
        
        let jsonReq: HttpRequest<any> = req.clone({
            setHeaders: {'Content-Type': 'Application/Json'}
        });

        return next.handle(jsonReq)
        .pipe(
            tap(event=> {
                if (event.type === HttpEventType.Response) {
                    console.log(event.body);   
                }
            })
        )
    }
}