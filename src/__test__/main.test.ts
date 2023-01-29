/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from '../ts/models/Todo';

const todos: Todo[] = [];
const todoText = 'Test assignment';
const errorMessage = 'Du måste ange minst tre bokstäver';
const spyOnChangeTodo = jest.spyOn(functions, 'changeTodo').mockReturnValue();
const spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
const spyOnRemoveAllTodos = jest.spyOn(functions, 'removeAllTodos').mockReturnValue();
const randomTodo: Todo = {text: 'Random todo', done: true};

beforeEach(() => {
    document.body.innerHTML = "";
});

describe('Functions related to creating new todo', () => {
    test('Should successfully create new todo', () => {
        // Arrange
	    document.body.innerHTML = `
            <ul id="todos" class="todo"></ul>
        `;

        // Act
	    main.createNewTodo(todoText, todos);

        // Assert
        const todoList = document.getElementById('todos') as HTMLDivElement;
	    expect(todoList.innerHTML).toEqual(`<li class="todo__text">${todoText}</li>`);
    });

    test('Should display error message when failing to create new todo', () => {
        // Arrange
	    const todoText = 'No';

	    document.body.innerHTML = `
            <div id="error" class="error"></div>
        `;

        // Act
	    main.createNewTodo(todoText, todos);

        // Assert
        const error = document.getElementById('error') as HTMLDivElement;
	    expect(error.classList.contains('show')).toBe(true);
    });
});

describe('Testing the error message', () => {
    test('Should display error message', () => {
        // Arrange
	    document.body.innerHTML = `
            <div id="error" class="error"></div>
        `;

        // Act
	    main.displayError(errorMessage, true);

        // Assert
        const error = document.getElementById('error') as HTMLDivElement;
	    expect(error.classList.contains('show')).toBe(true);
    });

    test('Should not display error message', () => {
        // Arrange
	    document.body.innerHTML = `
            <div id="error" class="error"></div>
        `;

        // Act
	    main.displayError(errorMessage, false);

        // Assert
        const error = document.getElementById('error') as HTMLDivElement;
	    expect(error.classList.contains('show')).toBe(false);
    });
});

describe('Functions related to toggleTodo', () => {
    test('Should call changeTodo', () => {
        //Arrange

        //Act
        main.toggleTodo(randomTodo);

        //Assert
        expect(spyOnChangeTodo).toHaveBeenCalled();
        spyOnChangeTodo.mockRestore();
    });

    test ('Should call createHtml', () => {
        //Arrange

        //Act
        main.toggleTodo(randomTodo);

        //Assert
        expect(spyOnCreateHtml).toHaveBeenCalled();
        spyOnCreateHtml.mockRestore();
    });
});

describe('Functions related to createHtml', () => {
    test('should add class "todo__text--done" for completed tasks', () => {
        //Arrange
        const todos = [{ text: 'Test Todo', done: true }];

        document.body.innerHTML = `
            <ul id="todos" class="todo"></ul>
        `;
    
        //Act
        main.createHtml(todos);
        
        //Assert
        const li = document.querySelector('li') as HTMLLIElement;
        expect(li.classList.contains('todo__text--done')).toBe(true);
    });
});

describe('Functions related to clearTodos', () => {
    test('Should call removeAllTodos', () => {
        //Arrange
        document.body.innerHTML = `
            <ul id="todos" class="todo"></ul>
        `;
        
        //Act
        main.clearTodos(todos);
  
        //Assert
        expect(spyOnRemoveAllTodos).toHaveBeenCalled();
        spyOnRemoveAllTodos.mockRestore();
    });

    test('Should remove all todos', () => {
        //Arrange
        const todos: Todo[] = [{ text: 'Test Todo', done: true }];
        
        //Act
        functions.removeAllTodos(todos);

        //Assert
        expect(todos.length).toBe(0);
    });
});

describe('Testing event listeners', () => {
    test('Should clear todos on click', () => {
        //Arrange
        const spyOnClearTodos = jest.spyOn(main, 'clearTodos').mockReturnValue();

        document.body.innerHTML = `
            <button type="button" id="clearTodos">Rensa lista</button>
        `;

        //Act
        main.clearButton();

        //Assert
        const clearTodosByClick = document.getElementById('clearTodos') as HTMLButtonElement;
        clearTodosByClick.click();

        expect(spyOnClearTodos).toHaveBeenCalled();
        spyOnClearTodos.mockRestore();
    });

    test('Should create new form on submit', () => {
        //Arrange
        const spyOnCreateNewTodo = jest.spyOn(main, 'createNewTodo').mockReturnValue();

        document.body.innerHTML = `
            <form id="newTodoForm">
                <div>
                    <input type="text" id="newTodoText" />
                    <button>Skapa</button>
                    <button type="button" id="clearTodos">Rensa lista</button>
                </div>
                <div id="error" class="error"></div>
            </form>
        `;

        //Act
        main.newForm();

        //Assert
        const newFormByClick = document.getElementById('newTodoForm') as HTMLFormElement;
        newFormByClick.submit();

        expect(spyOnCreateNewTodo).toHaveBeenCalled();
        spyOnCreateNewTodo.mockRestore();
    });
});