import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <navigation></navigation>
  <router-outlet></router-outlet>
  

  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskApp';
}
