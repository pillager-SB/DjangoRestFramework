import React from "react";

function Menu() {
    return (
        <menu_block>
            <container>
                <nav>
                    <ul class="nav_links">
                        <li><a href='/'>User List</a></li>
                        <li><a href='/projects'>Project List</a></li>
                        <li><a href='/todos'>ToDo List</a></li>
                    </ul>
                </nav>
            </container>
        </menu_block>
    )
}

export default Menu