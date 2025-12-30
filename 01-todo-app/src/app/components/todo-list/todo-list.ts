import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
})
export class TodoList {
  todoService = inject(TodoService);

  tasks = this.todoService.tasks;
}
