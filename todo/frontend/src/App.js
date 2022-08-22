import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";
import ProjectList from "./components/Project";
import axios from "axios";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import ToDoList from "./components/ToDo";
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
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            this.setState(
                {
                    'users': response.data
                }
            )
        }).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
            this.setState(
                {
                    'projects': response.data
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/').then(response => {
            this.setState(
                {
                    'todos': response.data
                }
            )
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>

                <Menu/>
                <BrowserRouter>

                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path='/projectId' element={<ProjectDetailList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' element={<ToDoList todos={this.state.todos}/>}/>
                        <Route path='*' element={<NotFound404 />} />
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
