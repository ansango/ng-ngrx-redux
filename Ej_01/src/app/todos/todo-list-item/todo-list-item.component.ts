import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
})
export class TodoListItemComponent implements OnInit {
  @Input() todo!: Todo;
  constructor() {}

  ngOnInit(): void {}
}
