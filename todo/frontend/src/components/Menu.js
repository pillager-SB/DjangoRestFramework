import React from "react";


function Menu() {
    return (
        <container>
            <nav>
                <ul className="nav_links">
                    <li><a href='/'>User List</a></li>
                    <li><a href='/projects'>Project List</a></li>
                    <li><a href='/todos'>ToDo List</a></li>

                </ul>
            </nav>
            <li>{localStorage.getItem('login')}</li>
        </container>
    )
}

export default Menu