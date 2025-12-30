import { Injectable, signal } from '@angular/core';
import { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  createTask(title: string) {
    if (title.trim() === '') return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    this._tasks.update((prevTasks) => [newTask, ...prevTasks]);
  }

  markTaskAsCompleted(taskId: string) {
    this._tasks.update((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  deleteTask(taskId: string) {
    this._tasks.update((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  deleteAllCompletedTasks() {
    this._tasks.update((prevTasks) => prevTasks.filter((task) => !task.completed));
  }
}
