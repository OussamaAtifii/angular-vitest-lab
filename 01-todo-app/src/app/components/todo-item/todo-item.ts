import { Component, computed, inject, input } from '@angular/core';
import { Task } from '../../types/task.type';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-item',
  imports: [],
  templateUrl: './todo-item.html',
})
export class TodoItem {
  todoService = inject(TodoService);
  task = input.required<Task>();

  inputId = computed(() => {
    return `task-${this.task().id}`;
  });

  markAsCompleted() {
    this.todoService.markTaskAsCompleted(this.task().id);
  }

  deleteTask() {
    this.todoService.deleteTask(this.task().id);
  }
}
