import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-work-times',
  templateUrl: './work-times.component.html',
  styleUrls: ['./work-times.component.css'],
})
export class WorkTimesComponent {
  @Input('workTime') workTime;
}
