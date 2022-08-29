import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import ProjectList from "./components/Project";
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ToDoList from "./components/ToDo";
import LoginForm from "./components/Auth";
import Cookies from 'universal-cookie';
import {BrowserRouter, Route, Routes, Link, Navigate, useLocation} from "react-router-dom";
import NotFound404 from "./components/NotFound404";
import ProjectDetailList from "./components/ProjectDetail";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',

        }
    }

    lodout() {
        this.set_token('')
        localStorage.setItem('login', '')
    }

    is_auth() {
        return !!this.state.token
    }

    set_token(token) {
        const cookies = new Cookies();
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())

    }
    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }
    get_token(username, password) {
        const data = {username: username, password: password}
        localStorage.setItem('login', username)
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => {
            console.log(error); localStorage.setItem('login', '')
        })
    }



    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response => {
            this.setState(
                {
                    'users': response.data
                }
            )
        }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {
            this.setState(
                {
                    'projects': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/', {headers}).then(response => {
            this.setState(
                {
                    'todos': response.data
                }
            )
        }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div>

                <Menu/>


                <BrowserRouter>
                    <nav>
                        <li>
                            {this.is_auth() ? <button onClick={()=>
                                this.lodout()}>Выйти</button> : <Link to='/login'>Войти</Link>}
                        </li>
                    </nav>

                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path='/projectId' element={<ProjectDetailList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' element={<ToDoList todos={this.state.todos}/>}/>
                        <Route exact path='/login' element={
                            <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>

                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
