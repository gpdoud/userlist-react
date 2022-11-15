import React from 'react';
class Userlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            error : null,
            isLoaded : false,
            users : [] 
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        console.debug("componentDidMount()");
        fetch("http://localhost:5000/api/users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.debug("Sucessful AJAX call!", result);
                    this.setState({ 
                        isLoaded: true,
                        users: result
                    });
                    console.debug(this.state);
                },
                (error) => {
                    console.error(error);
                    this.setState({
                        error,
                        isLoaded: false
                    });
                }
            );
    
    }

    generateRows() {
        console.debug("generateRows()");
        const users = this.state.users;
        let trs = [];
        users.map((u,i) => {
            let tr = (
                <tr key={'tr'+i}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.firstname}</td>
                    <td>{u.lastname}</td>
                    <td>{u.isReviewer ? "Yes" : "No"}</td>
                    <td>{u.isAdmin ? "Yes" : "No"}</td>
                    <td>ACTION</td>
                </tr>
            )
            trs.push(tr);
        })
        return trs;
    }

    render() {
        console.debug("render()");
        const users = this.state.users;
        const isLoaded = this.state.isLoaded;
        const error = this.state.error;
        console.debug("State:", isLoaded, users, error);
        if(error) { 
            console.error(error);
            return <p>Error</p>
        } else if(!isLoaded) {
            console.debug("Loading ...");
            return <p>Loading ...</p>
        } else {
            console.debug("Users:", users);
            const rows = this.generateRows();
            return (
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Reviewer</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            )
        }
    }
}

export default Userlist;