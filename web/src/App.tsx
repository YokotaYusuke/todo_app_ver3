import {useEffect, useState} from 'react'
import TodoRepository, {DefaultTodoRepository} from './repository/TodoRepository.tsx'

interface AppProps {
    todoRepository?: TodoRepository
}

function App(
    {todoRepository = new DefaultTodoRepository()}: AppProps
) {

    const {
        draftText,
        setDraftText,
        saveButtonClick,
        todoList
    } = useApp(todoRepository)

    return (
        <>
            <label>
                新規TODO
                <input type="text" value={draftText} onChange={(event) => setDraftText(event.target.value)}/>
            </label>
            <button onClick={saveButtonClick}>保存</button>
            <div role="todoList">
                {todoList.map((todo) => (
                    <div key={window.crypto.randomUUID()}>{todo}</div>
                ))}
            </div>
        </>
    )
}

function useApp(todoRepository: TodoRepository) {

    const [draftText, setDraftText] = useState<string>('')
    const [todoList, setTodoList] = useState<string[]>([])

    useEffect(() => {
            todoRepository.getTodo()
                .then(todos => setTodoList(todos))
        }
        , [])

    function saveButtonClick() {
        todoRepository.saveTodo(draftText)
        setTodoList([...todoList, draftText])
        setDraftText('')
    }

    return {
        draftText,
        setDraftText,
        saveButtonClick,
        todoList
    }
}

export default App
