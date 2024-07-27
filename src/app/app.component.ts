import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentDetailsComponent } from "./student-details/student-details.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, StudentDetailsComponent]
})
export class AppComponent {
  title = 'graphql';
}
