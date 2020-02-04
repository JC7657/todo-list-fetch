import React from 'react'

class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            lista: [],
            tarea: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState ({
            tarea: e.target.value
        })
    }
    handleSubmit(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.setState(
            {lista: [...this.state.lista, this.state.tarea]}
            )
            e.target.value = ''
        }
        else {
            this.setState(
                { tarea: e.target.value }
            )
        }
    }

    
    render() {
        return(
            <div>
                <form onKeyDown={this.handleSubmit}>
                <input onChange={this.handleChange} type="text"></input>
                </form>
                <ul>
                    {this.state.lista.map((tarea, index) => (
                        <li key={index}>{tarea}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default TodoList