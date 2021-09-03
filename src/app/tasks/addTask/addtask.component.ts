import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
    templateUrl: './addtask.component.html',
    styleUrls: []
})

export class AddTaskComponent implements OnInit {
    task: any
    errorMessage: string = ''
    addTaskForm: FormGroup;
    pageTitle: string = 'Edit Task'

    constructor(private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private tasksService: TasksService) { }

    ngOnInit() {

        //CREATING THE FORMGROUP
        this.addTaskForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            started: ['false', Validators.required],
            complete: ['false', Validators.required]
        })

        //READING BFROM THE ROUTE
        this.route.paramMap.subscribe(
            params =>{
                const _id =params.get('_id')
                this.getTask(_id)
            }  
        )

    }

    getTask(_id){
        this.tasksService.getTask(_id).subscribe({
            next: (task:any)=> this.displayProduct(task),
            error: err=> this.errorMessage= err

        })
    }

    displayProduct(task: any): void {
        this.task = task;
        if (!task) {
            this.pageTitle = 'No Task found';
            this.addTaskForm.reset()
        } else {
            if (+this.task._id === 0) {
                this.pageTitle = 'Add Task';
                this.addTaskForm.reset()
            } else {
                this.pageTitle = `Edit Task: ${this.task.name}`;

                if (this.addTaskForm) {
                    this.addTaskForm.reset();

                    this.addTaskForm.patchValue({
                        name: this.task.name,
                        description: this.task.description,
                        started: this.task.started,
                        complete: this.task.complete,
                    });

                }

            }
        }

    }



    saveTask(): void {
        if (this.addTaskForm.valid) {
            if (this.addTaskForm.dirty) {
                const p = { ...this.task, ...this.addTaskForm.value }

                if (+p._id === 0) {
                    this.tasksService.createTask(p).subscribe({
                        next: () => this.onSaveComplete(),
                        error: err => this.errorMessage = err

                    })
                } else {
                    this.tasksService.updateTask(p).subscribe({
                        next: () => this.onSaveComplete(),
                        error: err => this.errorMessage = err
                    })
                }

            } else {
                this.onSaveComplete();
            }
        } else {
            this.errorMessage = 'Please correct form errors';

        }
    }

    //deleting a Product
    onDelete(): void {
        if (+this.task._id === 0) {
            //it was never save, no need to delete
            this.onSaveComplete()
        } else {
            if (confirm(`Confirm that you want to delete + ${this.task.name}`)) {
                this.tasksService.deleteTask(this.task).subscribe({
                    next: () => this.onSaveComplete(),
                    error: err => this.errorMessage = err
                });
            }
        }
    }



    onSaveComplete(): void {
        this.addTaskForm.reset()
        this.router.navigate(['/tasks'])
    }



    onBack() {
        this.router.navigate(['/tasks', this.task._id])
    }
}