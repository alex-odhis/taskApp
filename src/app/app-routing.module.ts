import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AddTaskComponent } from './tasks/addTask/addtask.component';
import { TasksComponent } from './tasks/tasks.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'tasks', component: TasksComponent, canActivate:[AuthGuard] },
  { path: 'tasks/:_id/add', component: AddTaskComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
