/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from '../ts/models/Todo';

const todos: Todo[] = [];
const todoText = 'Test assignment';
const errorMessage = 'Du måste ange minst tre bokstäver'

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
