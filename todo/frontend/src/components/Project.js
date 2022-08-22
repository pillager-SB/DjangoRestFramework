import React from 'react'
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repo}</td>
            <td>
                <Link to={`/project/${project.id}`}>More Info...</Link>
            </td>

        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>Id</th>
            <th>Name</th>
            <th>Repository</th>
            <th>Detail</th>

            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectList