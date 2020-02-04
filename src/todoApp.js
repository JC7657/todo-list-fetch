import React from 'react'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            tarea: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(key) {
        let Lista = this.state.lista
        Lista.splice(key, 1)
        this.setState({
        lista: Lista
        })
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
                <form key="jaja"onKeyDown={this.handleSubmit}>
                <input onChange={this.handleChange} ></input>
                </form>
                <ul>
                    {this.state.lista.map((tarea, index) => (
                        <li key={index}>{tarea}<button onClick = {() => this.handleDelete(index)}>X</button> </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default TodoList