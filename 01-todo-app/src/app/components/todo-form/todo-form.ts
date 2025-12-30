import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
})
export class TodoForm {
  private readonly todoService = inject(TodoService);

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    this.todoService.createTask(this.title?.value ?? '');
    this.todoForm.reset();
  }

  get title() {
    return this.todoForm.get('title');
  }
}
