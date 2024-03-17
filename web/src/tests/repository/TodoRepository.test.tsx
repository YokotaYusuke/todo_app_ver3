import {DefaultTodoRepository} from '../../repository/TodoRepository.tsx'
import {expect} from 'vitest'
import {SpyHttp} from '../http/SpyHttp.ts'
import {StubHttp} from '../http/StubHttp.ts'


describe('TodoRepository', () => {
    describe('getTodo', () => {
        test('Httpに正しいリクエストを渡す', () => {
            const spyHttp = new SpyHttp()
            const repository = new DefaultTodoRepository(spyHttp)


            repository.getTodo()


            expect(spyHttp.get_argument_url).toEqual('/api/todos')
        })

        test('Httpの返り値をキャストして返す', async () => {
            const stubHttp = new StubHttp()
            stubHttp.get_return_value = Promise.resolve([
                'todo1',
                'todo2',
                'todo3',
            ])
            const repository = new DefaultTodoRepository(stubHttp)


            const todos = await repository.getTodo()


            expect(todos).toEqual(['todo1', 'todo2', 'todo3'])
        })
    })

    describe('saveTodo', () => {
        test('Httpに正しいリクエストを渡す', () => {
            const spyHttp = new SpyHttp()
            const repository = new DefaultTodoRepository(spyHttp)


            repository.saveTodo('todo1')


            expect(spyHttp.post_argument_url).toEqual('/api/todos')
            expect(spyHttp.post_argument_body).toEqual('todo1')
        })
    })
})

