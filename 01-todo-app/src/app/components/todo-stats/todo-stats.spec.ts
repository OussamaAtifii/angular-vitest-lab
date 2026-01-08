import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoStats } from './todo-stats';
import { Task } from '../../types/task.type';
import { signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';

const mockTasks: Task[] = [
  { id: '1', title: 'Task 1', completed: false },
  { id: '2', title: 'Task 2', completed: true },
];

class MockTodoService {
  private _tasks = signal<Task[]>(mockTasks);
  readonly tasks = this._tasks.asReadonly();

  deleteAllCompletedTasks = vi.fn();
}

describe('TodoStats', () => {
  let component: TodoStats;
  let fixture: ComponentFixture<TodoStats>;
  let mockTodoService: MockTodoService;

  beforeEach(async () => {
    mockTodoService = new MockTodoService();

    await TestBed.configureTestingModule({
      imports: [TodoStats],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct tasks length', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const totalLength = compiled.querySelector('#total-count');
    const expectedTextContect = `${mockTodoService.tasks().length} items`;

    expect(totalLength?.textContent).toBe(expectedTextContect);
  });

  it('should call deleteAllCompletedTasks when "Clear completed" is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const clearAllCompletedButton = compiled.querySelector('#clear-completed') as HTMLButtonElement;
    clearAllCompletedButton.click();

    expect(mockTodoService.deleteAllCompletedTasks).toHaveBeenCalled();
  });
});
