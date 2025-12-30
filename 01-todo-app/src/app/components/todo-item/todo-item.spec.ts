import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItem } from './todo-item';
import { Task } from '../../types/task.type';
import { TodoService } from '../../services/todo.service';

const taskMock: Task = {
  id: '1',
  title: 'Test task',
  completed: false,
};

class MockTodoService {
  markTaskAsCompleted = vi.fn();
  deleteTask = vi.fn();
}

describe('TodoItem', () => {
  let component: TodoItem;
  let fixture: ComponentFixture<TodoItem>;
  let mockTodoService: MockTodoService;

  beforeEach(async () => {
    mockTodoService = new MockTodoService();

    await TestBed.configureTestingModule({
      imports: [TodoItem],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItem);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('task', taskMock);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show task title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const taskTitle = compiled.querySelector('#task-title');

    expect(taskTitle?.textContent).toBe('Test task');
  });

  it('should generate correct inputId', () => {
    const inputId = component.inputId();
    expect(inputId).toBe(`task-${taskMock.id}`);
  });

  it('should checkbox have task.completed value', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const checkbox = compiled.querySelector(`#${component.inputId()}`) as HTMLInputElement;

    expect(checkbox.checked).toBe(taskMock.completed);

    fixture.componentRef.setInput('task', { ...taskMock, completed: true });
    fixture.detectChanges();

    expect(checkbox.checked).toBe(true);
  });

  it('should call markTaskAsCompleted when checkbox is changed', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const checkbox = compiled.querySelector(`#${component.inputId()}`) as HTMLInputElement;

    checkbox.dispatchEvent(new Event('change'));

    expect(mockTodoService.markTaskAsCompleted).toHaveBeenCalledWith(taskMock.id);
  });

  it('should call deleteTask when delete button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButton = compiled.querySelector('#delete-task-btn') as HTMLButtonElement;

    deleteButton.click();
    expect(mockTodoService.deleteTask).toHaveBeenCalledWith(taskMock.id);
  });
});
