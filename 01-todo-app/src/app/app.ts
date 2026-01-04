import { Component, signal } from '@angular/core';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoList } from './components/todo-list/todo-list';
import { TodoStats } from './components/todo-stats/todo-stats';

@Component({
  selector: 'app-root',
  imports: [TodoForm, TodoList, TodoStats],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Todo App');
}
