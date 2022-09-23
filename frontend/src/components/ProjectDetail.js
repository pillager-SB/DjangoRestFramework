import React from 'react'
import {useParams} from "react-router-dom";

const ProjectDetailItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repo}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectDetailList = ({projects}) => {
    let {projectId} = useParams()
    console.log(projectId)
    let filter_projects = projects.filter((project) => project.id.includes(parseInt(projectId)))
    return (
        <table>
            <th>Id</th>
            <th>Name</th>
            <th>Repository</th>
            <th>Users</th>


            {filter_projects.map((project) => <ProjectDetailItem project={project}/>)}
        </table>
    )
}

export default ProjectDetailList