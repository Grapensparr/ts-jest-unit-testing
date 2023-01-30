/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from '../ts/models/Todo';

const todos: Todo[] = [];
const errorMessage = 'Du måste ange minst tre bokstäver';
const spyOnChangeTodo = jest.spyOn(functions, 'changeTodo').mockReturnValue();
const spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
const spyOnRemoveAllTodos = jest.spyOn(functions, 'removeAllTodos').mockReturnValue();

beforeEach(() => {
    document.body.innerHTML = "";
});

describe('Functions related to creating new todo', () => {
    test('Should successfully create new todo', () => {
        // Arrange
	    document.body.innerHTML = `
            <ul id="todos" class="todo"></ul>
        `;

        const todoList = document.getElementById('todos') as HTMLElement;
        const todoText = 'Test assignment';

        // Act
	    main.createNewTodo(todoText, todos);

        // Assert
	    expect(todoList.innerHTML).toEqual(`<li class="todo__text">${todoText}</li>`);
    });

    test('Should display error message when failing to create new todo', () => {
        // Arrange
	    document.body.innerHTML = `
            <div id="error" class="error"></div>
        `;

        const error = document.getElementById('error') as HTMLElement;
        const todoText = 'No';

        // Act
	    main.createNewTodo(todoText, todos);

        // Assert
	    expect(error.classList.contains('show')).toBe(true);
    });
});

describe('Testing the error message', () => {
    test('Should display error message', () => {
        // Arrange
	    document.body.innerHTML = `
            <div id="error" class="error"></div>
        `;

        const error = document.getElementById('error') as HTMLDivElement;

        // Act
	    main.displayError(errorMessage, true);

        // Assert
	    expect(error.classList.contains('show')).toBe(true);
    });

    test('Should not display error message', () => {
        // Arrange
	    document.body.innerHTML = `
            <div id="error" class="error"></div>
        `;

        const error = document.getElementById('error') as HTMLDivElement;

        // Act
	    main.displayError(errorMessage, false);

        // Assert
	    expect(error.classList.contains('show')).toBe(false);
    });
});

describe('Functions related to toggleTodo', () => {
    test('Should call changeTodo', () => {
        //Arrange
        const todos: Todo = 
            { text: 'Test assignment', done: true }
        ;

        //Act
        main.toggleTodo(todos);

        //Assert
        expect(spyOnChangeTodo).toHaveBeenCalled();
        spyOnChangeTodo.mockRestore();
    });

    test ('Should call createHtml', () => {
        //Arrange
        const todos: Todo = 
            { text: 'Test assignment', done: true }
        ;

        //Act
        main.toggleTodo(todos);

        //Assert
        expect(spyOnCreateHtml).toHaveBeenCalled();
        spyOnCreateHtml.mockRestore();
    });
});

describe('Functions related to createHtml', () => {
    test('should add class "todo__text--done" for completed tasks', () => {
        //Arrange
        document.body.innerHTML = `
            <ul id="todos" class="todo"></ul>
        `;

        const todos = [
            { text: 'Test assignment', done: true }
        ];
    
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
        const todos = [
            { text: 'Test assignment', done: true }
        ];
        
        //Act
        functions.removeAllTodos(todos);

        //Assert
        expect(todos.length).toBe(0);
    });
});

describe('Testing sorting function', () => {
    test('Should sort todos', () => {
        //Arrange
        document.body.innerHTML = `
            <ul id="todos" class="todo"></ul>
        `;

        const spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
        const todos = [
            { text: 'BBB', done: true },
            { text: 'AAA', done: true },
            { text: 'CCC', done: true },
            { text: 'BBB', done: true }
        ];
    
        //Act
        main.sortTodos(todos);
        main.createHtml(todos);
    
        //Assert
        expect(spyOnCreateHtml).toHaveBeenCalled();
        spyOnCreateHtml.mockRestore();
    });
});

describe('Testing event listeners', () => {
    test('Should clear todos on click', () => {
        //Arrange
        document.body.innerHTML = `
            <button type="button" id="clearTodos">Rensa lista</button>
        `;

        const spyOnClearTodos = jest.spyOn(main, 'clearTodos').mockReturnValue();
        const clearTodosByClick = document.getElementById('clearTodos') as HTMLButtonElement;

        //Act
        main.clearButton();
        clearTodosByClick.click();

        //Assert
        expect(spyOnClearTodos).toHaveBeenCalled();
        spyOnClearTodos.mockRestore();
    });

    test('Should create new form on submit', () => {
        //Arrange
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

        const spyOnCreateNewTodo = jest.spyOn(main, 'createNewTodo').mockReturnValue();
        const newFormByClick = document.getElementById('newTodoForm') as HTMLFormElement;

        //Act
        main.newForm();
        newFormByClick.submit();

        //Assert
        expect(spyOnCreateNewTodo).toHaveBeenCalled();
        spyOnCreateNewTodo.mockRestore();
    });

    test('Should sort todos on click', () => {
        //Arrange
        document.body.innerHTML = `
            <button type="button" id="sortTodos">Sortera lista</button>
        `;

        const spyOnSortTodos = jest.spyOn(main, 'sortTodos').mockReturnValue();
        const sortTodosByClick = document.getElementById('sortTodos') as HTMLButtonElement;

        //Act
        main.sortByButton();
        sortTodosByClick.click();

        //Assert
        expect(spyOnSortTodos).toHaveBeenCalled();
        spyOnSortTodos.mockRestore();
    });
});