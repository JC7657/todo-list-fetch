import React from 'react'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            tarea: '',
            input: '',
            left: '',
            selectedUser: window.location.pathname
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
    }
    componentDidMount() {

        //--------------User's todo list  [GET]-----------------------//
        console.log(this.state.selectedUser)
        fetch('https://assets.breatheco.de/apis/fake/todos/user' + this.state.selectedUser)
            .then(resp => {
                console.log(resp.status)
                if (resp.status === 404) {
                    console.log("User not found, creating...")
                    fetch('https://assets.breatheco.de/apis/fake/todos/user' + this.state.selectedUser, {
                        method: 'POST',
                        body: JSON.stringify([]),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(response => {
                        console.log(response.status)
                        console.log(response.ok)
                        window.location.reload(true)
                    })
                }
                return resp.json()
            }).then(data => {
                console.log(data)
                this.setState({
                    lista: data
                })
            })




        //------------Input placeholder generation---------------------//        

        let inputRandom = Math.floor(Math.random() * 5)
        if (inputRandom === 0) {
            this.setState({
                input: 'What are we doing today?'
            })
        }
        else if (inputRandom === 1) {
            this.setState({
                input: "Don't spend your time. Invest it."
            })
        }
        else if (inputRandom === 2) {
            this.setState({
                input: "Write some tasks here. Don't hesitate."
            })
        }
        else if (inputRandom === 3) {
            this.setState({
                input: "Welcome, user. Let's get to work!"
            })
        }
        else if (inputRandom === 4) {
            this.setState({
                input: "Failing to plan = Planning to fail"
            })
        }
    }

    //-------Component handling functions-------------------------//

    handleDelete(key) {
        let Lista = this.state.lista
        Lista.splice(key, 1)
        this.setState({
            lista: Lista
        })
        fetch('https://assets.breatheco.de/apis/fake/todos/user' + this.state.selectedUser, {
            method: 'PUT',
            body: JSON.stringify([...Lista]),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.ok); // will be true if the response is successfull
            console.log(response.status); // the status code = 200 or code = 400 etc.
            return response.json() // (returns promise) will try to parse the result as json as return a promise that you can .then for results
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    }

    //-----------------------------------------------------------//

    handleChange(e) {
        this.setState({
            tarea: e.target.value
        })
    }

    //----------------------------------------------------------//

    handleSubmit(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            let Lista = this.state.lista
            this.setState({
                lista: Lista.concat({ "label": this.state.tarea, "done": false }),
                tarea: ''
            })
            e.target.value = ""
            setTimeout(()=>{console.log(this.state.lista)}, 1000) 
            setTimeout(() => {
                fetch('https://assets.breatheco.de/apis/fake/todos/user' + this.state.selectedUser, {
                    method: 'PUT',
                    body: JSON.stringify(this.state.lista),
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(resp => console.log(resp))
            }, 500)
        }
        else {
            this.setState(
                { tarea: e.target.value }
            )
        }
    }

    //----------------------------------------------------------//

    handleDeleteAll() {
        this.setState({
            lista: []
        })
        setTimeout(() => {
            fetch('https://assets.breatheco.de/apis/fake/todos/user' + this.state.selectedUser, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            })
                .then(resp => {
                    console.log(resp)
                    window.location.reload(true)
                })
        }, 500)
    }

    //---------------Rendered Elements-----------------------------------------------------------------//

    render() {

        const renderedList = this.state.lista.map((tarea, index) => (
            <li className="list-group-item" key={index}>
                <div className="row">
                    <p className="col" id="list-item">{tarea.label}</p>

                    <button
                        id="button-task"
                        type="button"
                        className="btn col-1"
                        onClick={() => this.handleDelete(index)}><i className="fa fas fa-times"></i>
                    </button>
                </div>
            </li>
        ));

        //--------------------------------------------------------------------//

        const renderedBottom =
            <li id="bottom" className="paper list-group-item">
                <div className="row">

                    <p className="col" id="task-left">{this.state.lista.length} item(s) left. {this.state.left}</p>

                    <button
                        onClick={this.handleDeleteAll}
                        id="delete-all"
                        type="button"
                        className="btn col-3">Delete User
                    </button>
                </div>
            </li>

        //--------------------------------------------------------------------------------------------------//

        return (
            <div className="fullApp mt-4">
                <h1>todos</h1>
                <div className="list-group-item">
                    <input id="input" onKeyDown={this.handleSubmit} type="text" placeholder={this.state.input} onChange={this.handleChange} ></input>
                </div>
                <ul className="lista list-group">
                    {renderedList}
                    {renderedBottom}
                </ul>
            </div>
        );
    }


}

export default TodoList