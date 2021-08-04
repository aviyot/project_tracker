import { Component, Input, OnInit } from '@angular/core';
import 'firebase/firestore';
import { FormState } from 'src/models/ui/form-state';
import { TODO_STATUS } from 'src/types/todo_status.type';
import { IsTimestampService } from 'src/app/services/is-timestamp.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  /*   @Input() docRef: AngularFirestoreDocument<firebase.firestore.DocumentData>;
   */ todoState: FormState;
  @Input('todo') todo;
  todos = new Observable<any[]>();
  selectedStatus: TODO_STATUS | 'ALL' = 'IN_PROGRESS';

  constructor(private timestampServ: IsTimestampService) {}

  ngOnInit(): void {
    /*     this.todos = this.docRef
      .collection('todos', (ref) => ref.orderBy('date', 'desc'))
      .valueChanges({ idField: 'id' }) as Observable<Project[]>;
    this.todos.subscribe((d) => {}); */
  }

  checkDate(date: any): boolean {
    return this.timestampServ.isTimestamp(date);
  }
}
