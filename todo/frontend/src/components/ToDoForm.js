import React from "react";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', project: props.projects[0]?.id, creator: '', isActive: false}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (event.target.type === 'checkbox') {
            this.setState({isActive: event.target.checked})
        }
    }

    handleSubmit(event) {
        this.props.create_todo(this.state.text, this.state.project, this.state.creator, this.state.isActive)
        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text">text : </label>
                    <input type="text" name="text" placeholder="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project">project : </label>
                    <select name="project" onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="creator">creator : </label>
                    <select name="creator" onChange={(event) => this.handleChange(event)}>
                        {this.props.creators.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="isActive">isActive</label>
                    <input type="checkbox" className="form-control" name="isActive" value={this.state.isActive}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" value="Save"/>
            </form>
        )
    }
}

export default ToDoForm