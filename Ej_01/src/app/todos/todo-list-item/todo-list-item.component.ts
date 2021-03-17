import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
})
export class TodoListItemComponent implements OnInit {
  @Input() todo!: Todo;
  titleInput!: FormControl;
  isEditing!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isEditing = false;
    this.titleInput = new FormControl(this.todo.title, Validators.required);
  }

  completeTask(): void {}
  editTask(): void {
    this.isEditing = true;
  }
  deleteTask(): void {}
  submitTask(): void {
    this.isEditing = false;
  }
}
