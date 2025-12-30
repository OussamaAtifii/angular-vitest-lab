import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoList } from './todo-list';
import { signal } from '@angular/core';
import { Task } from '../../types/task.type';
import { TodoService } from '../../services/todo.service';

const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', completed: false },
  { id: '2', title: 'Task 2', completed: true },
];

class MockTodoService {
  private _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  setTasks(tasks: Task[]) {
    this._tasks.set(tasks);
  }

  clearTasks() {
    this._tasks.set([]);
  }
}

describe('TodoList', () => {
  let component: TodoList;
  let fixture: ComponentFixture<TodoList>;
  let mockTodoService: MockTodoService;

  beforeEach(async () => {
    mockTodoService = new MockTodoService();

    await TestBed.configureTestingModule({
      imports: [TodoList],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tasks', () => {
    mockTodoService.setTasks(mockTasks);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tasks = compiled.querySelectorAll('todo-item');

    expect(tasks).toHaveLength(2);
  });

  it('should toggle "No tasks" message dynamically', () => {
    mockTodoService.clearTasks();
    fixture.detectChanges();

    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#no-tasks-message')).toBeTruthy();

    mockTodoService.setTasks(mockTasks);
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#no-tasks-message')).toBeFalsy();
  });

  it('should update the DOM when tasks change', () => {
    mockTodoService.clearTasks();
    fixture.detectChanges();

    let compiled = fixture.nativeElement as HTMLElement;
    let taskItems = compiled.querySelectorAll('todo-item');

    expect(taskItems).toHaveLength(0);

    mockTodoService.setTasks(mockTasks);
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    taskItems = compiled.querySelectorAll('todo-item');

    expect(taskItems).toHaveLength(2);
  });
});
