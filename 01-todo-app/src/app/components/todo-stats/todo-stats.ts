import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-stats',
  imports: [],
  templateUrl: './todo-stats.html',
})
export class TodoStats {
  todoService = inject(TodoService);

  tasksLength = computed(() => {
    return this.todoService.tasks().length;
  });

  deleteAllCompletedTasks() {
    this.todoService.deleteAllCompletedTasks();
  }
}
