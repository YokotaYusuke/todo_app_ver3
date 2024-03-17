import {act, render, screen, within} from '@testing-library/react'
import App from '../App.tsx'
import {expect} from 'vitest'
import userEvent from '@testing-library/user-event'
import {DummyTodoRepository, SpyTodoRepository, StubTodoRepository} from './repository/TodoRepositoryDouble.tsx'
import TodoRepository from '../repository/TodoRepository.tsx'

describe('App', () => {
    describe('初期レンダリング時', () => {
        test('まだ何も保存していない時は、todoListエリアには何も表示されない', async () => {
            await renderApplication()


            const todoList = screen.getByRole('todoList')
            expect(todoList.children.length).toEqual(0)
        })

        test('TODOを入力するためのインプットがある', async () => {
            await renderApplication()


            expect(screen.getByLabelText('新規TODO')).toBeInTheDocument()
        })

        test('TODOを保存するためのボタンがある', async () => {
            await renderApplication()


            expect(screen.getByText('保存')).toBeInTheDocument()
        })

        test('getTodoメソッドを呼ぶ', async () => {
            const spyTodoRepository = new SpyTodoRepository()
            await renderApplication(spyTodoRepository)


            expect(spyTodoRepository.getTodo_wasCalled).toBeTruthy()
        })

        test('todoRepositoryから返ってきたtodoを表示する', async () => {
            const stubTodoRepository = new StubTodoRepository()
            stubTodoRepository.saveTodo_return_value = ['todo1', 'todo2']


            await renderApplication(stubTodoRepository)


            const todoList = screen.getByRole('todoList')
            expect(within(todoList).getByText('todo1')).toBeInTheDocument()
            expect(within(todoList).getByText('todo2')).toBeInTheDocument()
        })
    })

    describe('保存ボタンを押した時', () => {
        test('複数のTODOを保存することができる', async () => {
            await renderApplication()


            await saveTodo('todo1')
            await saveTodo('todo2')


            const todoList = screen.getByRole('todoList')
            expect(within(todoList).getByText('todo1')).toBeInTheDocument()
            expect(within(todoList).getByText('todo2')).toBeInTheDocument()
        })

        test('テキストを入力して保存ボタンを押すとTODOListエリアにTODOが表示される', async () => {
            await renderApplication()


            await userEvent.type(screen.getByLabelText('新規TODO'), 'todo1')
            await userEvent.click(screen.getByText('保存'))


            const todoList = screen.getByRole('todoList')
            expect(within(todoList).getByText('todo1')).toBeInTheDocument()
        })

        test('saveTodoメソッドを正しく呼んでいるか', async () => {
            const spyTodoRepository = new SpyTodoRepository()
            await renderApplication(spyTodoRepository)


            await saveTodo('hogehoge')


            expect(spyTodoRepository.saveTodo_argument_todo).toEqual('hogehoge')
        })
    })

    async function renderApplication(todoRepository: TodoRepository = new DummyTodoRepository()) {
        await act(async () => {
            render(<App todoRepository={todoRepository}/>)
        })
    }

    async function saveTodo(todo: string) {
        const todoInput = screen.getByLabelText('新規TODO')
        await userEvent.type(todoInput, todo)
        await userEvent.click(screen.getByText('保存'))
    }
})