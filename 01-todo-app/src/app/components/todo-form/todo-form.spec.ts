import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoForm } from './todo-form';
import { TodoService } from '../../services/todo.service';

class MockTodoService {
  createTask = vi.fn();
}

describe('TodoForm', () => {
  let component: TodoForm;
  let fixture: ComponentFixture<TodoForm>;
  let mockTodoService: MockTodoService;

  beforeEach(async () => {
    mockTodoService = new MockTodoService();
    await TestBed.configureTestingModule({
      imports: [TodoForm],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call createTask if the form is invalid', () => {
    component.todoForm.setValue({ title: '' });
    component.onSubmit();

    expect(mockTodoService.createTask).not.toHaveBeenCalled();
    expect(component.todoForm.touched).toBe(true);
  });

  it('should call createTask and reset form when valid', () => {
    component.todoForm.setValue({ title: 'Task 1' });
    component.onSubmit();

    expect(mockTodoService.createTask).toHaveBeenCalled();
    expect(mockTodoService.createTask).toHaveBeenCalledWith('Task 1');
    expect(component.todoForm.value.title).toBe(null);
  });
});
