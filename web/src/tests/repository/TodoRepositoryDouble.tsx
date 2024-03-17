import TodoRepository from '../../repository/TodoRepository.tsx'

export class SpyTodoRepository implements TodoRepository {
    saveTodo_wasCalled: boolean = false
    saveTodo_argument_todo: string = ''

    saveTodo(todo: string): void {
        this.saveTodo_argument_todo = todo
        this.saveTodo_wasCalled = true
    }

    getTodo_wasCalled: boolean = false

    getTodo(): Promise<string[]> {
        this.getTodo_wasCalled = true
        return Promise.resolve([])
    }
}

export class StubTodoRepository implements TodoRepository {
    saveTodo_return_value: string[] = []

    saveTodo(): void {
    }

    getTodo(): Promise<string[]> {
        return Promise.resolve(this.saveTodo_return_value)
    }

}

export class DummyTodoRepository implements TodoRepository {
    saveTodo(): void {
    }

    getTodo(): Promise<string[]> {
        return Promise.resolve([])
    }

}