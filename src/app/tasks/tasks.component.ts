import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { TasksService } from "./tasks.service";

@Component({

    templateUrl: './tasks.component.html',

    styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit{
    tasks: any[] = []
    errorMessage = ''

    constructor(private tasksService: TasksService,
                private router: Router) {}

    ngOnInit(): void {
        this.tasksService.getTasks().subscribe({
            next: data => this.tasks = data,
            error: err => this.errorMessage = err
        }) 
    }

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