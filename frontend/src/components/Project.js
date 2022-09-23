import React, {useState} from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project, delete_project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repo}</td>
            <td></td>
            <td>
                <button onClick={() => delete_project(project.id)} type='button'>Delete</button>
            </td>

        </tr>
    )
}

const ProjectList = ({projects, delete_project}) => {

    const [value, setValue] = useState('')
    const filteredProjects = projects.filter(project => {
        return project.name.toLowerCase().includes(value.toLowerCase())
    })
    return (
        <div className="form">
            <form className="search_form">Search for a project by name:
                <input
                    type="text"
                    placeholder="Project search..."
                    className="search_input"
                    onChange={(event) => setValue(event.target.value)}
                />
            </form>

            <table>

                <th>Id</th>
                <th>Name</th>
                <th>Repository</th>
                <th></th>
                {filteredProjects.map((project) => <ProjectItem project={project} delete_project={delete_project}/>)}
            </table>
        </div>
    )
}

export default ProjectList