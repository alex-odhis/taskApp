import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { TasksService } from "./tasks.service";

@Component({

    templateUrl: './tasks.component.html',

    styleUrls: ['./tasks.component.css']
})

export class TasksComponent{
    errorMessage = ''

    constructor(private tasksService: TasksService,
                private router: Router) {}

    tasks$ = this.tasksService.tasks$
        .pipe( catchError(error => {
                this.errorMessage = error;
                return EMPTY;
            })
        );

    deleteTask(task): void {
        if (+task._id === 0) {
            //it was never save, no need to delete
            this.router.navigate(['/task'])
        } else {
            if (confirm(`Confirm that you want to delete + ${task.name}`)) {
                this.tasksService.deleteTask(task).subscribe({
                    error: err => this.errorMessage = err
                });
            }
        }
    }


}