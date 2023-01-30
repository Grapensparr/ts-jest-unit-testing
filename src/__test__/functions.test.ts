/**l
 * @jest-environment jsdom
 */

import * as functions from '../ts/functions';
import { Todo } from '../ts/models/Todo';

beforeEach(() => {
    document.body.innerHTML = "";
});

describe("Functions related to addTodo", () => {
    test("Should add new todos", () => {
        //Arrange
        const todos: Todo[] = [];
        const todoText = 'Test assignment';

        //Act
        functions.addTodo(todoText, todos);
  
        //Assert
        expect(todos.length).toBe(1);
    });
});

describe("Functions related to changeTodo", () => {
    test("Should change done to true", () => {
        //Arrange
        const todos: Todo = 
            { text: 'Test assignment', done: false }
        ;
      
        //Act
        functions.changeTodo(todos);
  
        //Assert
        expect(todos.done).toBe(true);
    });
  
    test("Should change done to false", () => {
        //Arrange
        const todos: Todo = 
            { text: 'Test assignment', done: true }
        ;
      
        //Act
        functions.changeTodo(todos);
  
        //Assert
        expect(todos.done).toBe(false);
    });
});

describe('Functions related to clearTodos', () => {
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