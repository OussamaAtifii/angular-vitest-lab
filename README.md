## 🧪 Angular Vitest Lab

This repository is a **personal learning lab** where I will be adding different projects aimed at **learning and improving Angular testing skills**.

The learning path is progressive:  
I will start with small and simple projects and gradually move towards more complex applications, applying better testing strategies and best practices along the way.

### 🎯 Repository Goals

- Learn Angular testing from scratch.
- Practice unit and integration testing.
- Use Vitest as a modern testing framework for Angular.
- Document each project in a clear and reusable way.

### 📁 Project Structure

Each project in this repository will include the following sections:

1. **Project Description**  
   A brief explanation of the project goals and main features.

2. **Project Structure**  
   Overview of the folder structure and important files.

3. **Test Suites**  
   Description of the implemented test suites, what they cover, and the testing concepts being practiced.

### 📌 Projects

1. **TODO App**

   **Project Description**  
    A basic task management application designed to practice the fundamentals of Angular testing.

   **Project Structure**

   ```text
   /app/
   ├── app.config.ts
   ├── app.html
   ├── app.spec.ts
   ├── app.ts
   ├── components
   │   ├── todo-form
   │   │   ├── todo-form.html
   │   │   ├── todo-form.spec.ts
   │   │   └── todo-form.ts
   │   ├── todo-item
   │   │   ├── todo-item.html
   │   │   ├── todo-item.spec.ts
   │   │   └── todo-item.ts
   │   ├── todo-list
   │   │   ├── todo-list.html
   │   │   ├── todo-list.spec.ts
   │   │   └── todo-list.ts
   │   └── todo-stats
   │       ├── todo-stats.html
   │       ├── todo-stats.spec.ts
   │       └── todo-stats.ts
   ├── services
   │   ├── todo.service.spec.ts
   │   └── todo.service.ts
   └── types
      └── task.type.ts
   ```

   ### 🧪 Test Suites

   This project includes a set of unit test suites focused on validating component behavior and service logic.

   #### Components

   <details>
      <summary>TodoForm</summary>

   - Reactive form validation.
   - Prevents submission when the form is invalid.
   - Calls `TodoService.createTask` on valid submission.
   - Resets the form after submit.
   - Uses a mocked `TodoService` to keep the component tests isolated.

   </details>

   ***

   <details>
      <summary>TodoItem</summary>

   - Ensures the task title is rendered correctly in the DOM.
   - Validates the generated checkbox `inputId` based on the task ID.
   - Confirms the checkbox reflects the task `completed` state.
   - Updates the checkbox state when the input task changes.
   - Calls `TodoService.markTaskAsCompleted` when the checkbox value changes.
   - Calls `TodoService.deleteTask` when the delete button is clicked.
   - Uses a mocked `TodoService` to keep the component tests isolated.

   </details>
