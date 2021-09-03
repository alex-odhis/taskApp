import { Component } from "@angular/core";

@Component({
    selector:' foot',

    template: `
    <footer class="footer bg-light row p-5 text-primary">
       <div class="col-sm-6 px-2">
         <h3 class ="text-success">About Us</h3>
         <p>{{about}}</p>
       </div>
       <div class= "col-sm-6 px-2">
       <h3 class = "text-success">Other Links</h3>
        <ul>
            <li *ngFor = "let link of links"><a ahref="link.url">{{link.name}}</a></li>
        </ul>
       </div>
    </footer>
    `,

    styleUrls:['./footer.component.css']
})
export class FooterComponent {
    about = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in tristique risus. Pellentesque nec sodales ligula.Phasellus ac dictum est.Praesent vel turpis vel magna maximus posuere sed in ligula.Suspendisse potenti.'
    links = [
        {
            name: 'My Tasks',
            url: '#'
        },
        {
            name: 'Profile',
            url: '#'
        },
        {
            name: 'Add Task',
            url: '#'
        }
    ]

    constructor() {
        
    }
}