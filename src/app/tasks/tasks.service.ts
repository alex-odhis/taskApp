import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TasksService {
    tasksUrl: string = '/tasks'
    constructor(
        private http: HttpClient
    ){}

    createTask(task): Observable<any>{
        // const headers = new HttpHeaders({ 'content-type': 'application/json' });
        task._id = null

        return this.http.post<any>(this.tasksUrl, task).pipe(
            tap(data => console.log('created product' + JSON.stringify(data))),
            catchError(this.handleError)
        )
    }

    getTasks(){
        return this.http.get<any[]>(this.tasksUrl)
            .pipe(
                catchError(this.handleError)
            )
    }

    getTask(id): Observable<any>{
        if (+id === 0) {
            return of(this.initialisedTask())
        }
        const url = `${this.tasksUrl}/${id}`
        return this.http.get<any>(url)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    updateTask(task): Observable<any>{
        // const headers = new HttpHeaders({ 'content-type': 'application/json' });
        const url = `${this.tasksUrl}/${task._id}`;

        return this.http.patch<any>(url, task).pipe(
            tap(() => console.log('updated task' + task._id)),
            map(() => task),
            catchError(this.handleError)

        )
    }

    deleteTask(task): Observable<any>{
        const url = `${this.tasksUrl}/${task._id}`
        return this.http.delete<any>(url).pipe(
            tap(data => console.log('delete Product' + task._id)),
            catchError(this.handleError)
        )
    }

    //for the id of 0
    initialisedTask(): any {
        return {
            _id: 0,
            name: null,
            description: null,
            started: null,
            complete: null,
        
        }
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