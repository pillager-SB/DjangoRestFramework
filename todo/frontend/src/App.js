import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/User";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        const users = [
            {
                "username": "user1",
                "first_name": 'Фёдор',
                "last_name": 'Достоевский',
                "email": "user1@usr.com",
            },
            {
                "username": "user2",
                "first_name": 'Нобунага',
                "last_name": 'Ода',
                "email": "user2@usr.com",

            },
            {
                "username": "user3",
                "first_name": "Лев",
                "last_name": "Троцкий",
                "email": "user3@usr.com",

            },
            {
                "username": "admin",
                "first_name": "Джабба",
                "last_name": "Хатт",
                "email": "admin@usr.com",

            }
        ]
        this.setState(
            {
                'users':users
            }
        )
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}

export default App;
