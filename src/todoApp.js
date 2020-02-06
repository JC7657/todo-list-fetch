import React from 'react'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            tarea: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);

    }
    handleDelete(key) {
        let Lista = this.state.lista
        Lista.splice(key, 1)
        this.setState({
            lista: Lista
        })
    }


    handleChange(e) {
        this.setState({
            tarea: e.target.value
        })
    }
    handleSubmit(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.setState(
                { lista: [...this.state.lista, this.state.tarea] }
            )
            e.target.value = ''
        }
        else {
            this.setState(
                { tarea: e.target.value }
            )

        }
    }
    handleDeleteAll() {
        this.setState({
            lista: []
        })
    }




    render() {
        return (
            <div class="fullApp mt-4">
                <h1>todos</h1>
                <ul class="lista list-group">
                    <li class="list-group-item"><form class="input" onKeyDown={this.handleSubmit}>
                        <input id="input" type="text" placeholder="What are we doing today?" onChange={this.handleChange} ></input>
                    </form></li>
                    {this.state.lista.map((tarea, index) => (
                        <div class="todo row">

                            <li id="list-item" class="list-group-item col" key={index}>{tarea}</li>


                            <button id="button-task"type="button" class="col-1 btn list-group-item" onClick={() => this.handleDelete(index)}><i class="fa fas fa-times"></i></button>

                        </div>
                    ))}
                    <div id="bottom"class="todo row">
                        
                        <li id="task-left" class="paper list-group-item col">{this.state.lista.length} item(s) left</li>


                        <button onClick={this.handleDeleteAll} id="delete-all" type="button" class="col-4 list-group-item">Delete All</button>
                        
                    </div>
                </ul>
            </div>
        )
    }
}

export default TodoList