import { Component, Input } from '@angular/core';
import 'firebase/firestore';
import { Feature } from 'src/models/feature.model';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
})
export class FeaturesComponent {
  @Input() feature: Feature;
}
