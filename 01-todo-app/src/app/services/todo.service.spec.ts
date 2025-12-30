import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a task not completed by default', () => {
    service.createTask('Task 1');

    const [task] = service.tasks();

    expect(task.title).toBe('Task 1');
    expect(task.completed).toBe(false);
  });

  it('should not create a task with empty title', () => {
    service.createTask('  ');
    expect(service.tasks()).toHaveLength(0);
  });

  it('should toggle task completion', () => {
    service.createTask('Task 1');

    const taskId = service.tasks()[0].id;

    service.markTaskAsCompleted(taskId);
    expect(service.tasks()[0].completed).toBe(true);

    service.markTaskAsCompleted(taskId);
    expect(service.tasks()[0].completed).toBe(false);
  });

  it('should delete a task', () => {
    service.createTask('Task 1');
    service.createTask('Task 2');

    let tasks = service.tasks();

    service.deleteTask(tasks[0].id);

    tasks = service.tasks();

    expect(tasks).toHaveLength(1);
  });

  it('should delete all completed tasks', () => {
    service.createTask('Task 1');
    service.createTask('Task 2');
    service.createTask('Task 3');

    const tasks = service.tasks();

    service.markTaskAsCompleted(tasks[0].id);
    service.markTaskAsCompleted(tasks[1].id);

    service.deleteAllCompletedTasks();

    const remainingTasks = service.tasks();

    expect(remainingTasks).toHaveLength(1);
    expect(remainingTasks[0].completed).toBe(false);
  });
});
