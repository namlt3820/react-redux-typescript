import React from 'react'
import { connect } from 'react-redux'
import { Todo, fetchTodos, deleteTodo } from '../actions'
import { StoreState } from '../reducers'

interface AppProps {
    todos: Todo[];
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo;
}



class _App extends React.Component<AppProps> {
    state = { fetching: false }

    onButtonClick = (): void => {
        this.setState({ fetching: true })
        this.props.fetchTodos()
    }

    componentDidUpdate(): void {
        if (this.state.fetching) {
            setTimeout(() => this.setState({ fetching: false }), 1000)
        }
    }

    onTodoClick = (id: number): void => {
        this.props.deleteTodo(id);
    }

    renderList = (): JSX.Element[] => (
        this.props.todos.map((todo: Todo) => <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>{todo.title}</div>)
    )

    render() {
        return <div>
            <button onClick={this.onButtonClick}>Fetch</button>
            {this.state.fetching ? 'Loading' : null}
            {this.renderList()}
        </div>
    }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => ({
    todos
})

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App)