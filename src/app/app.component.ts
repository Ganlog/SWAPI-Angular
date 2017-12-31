import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Star Wars</h1>
    <p>A visual guide</p>
    <router-outlet></router-outlet>
  `,
  styles: [`
    h1,p{
      margin: 0;
      text-align: center;
    }
  `]
})
export class AppComponent {
  title = 'app';
}
