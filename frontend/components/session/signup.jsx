import React from 'react';

class Signup extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
        }

        this.handleSubmit= this.handleSubmit.bind(this); 
    }

    handleInput(type) {
       return e => this.setState({[type]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createNewUser(this.state)
        .then( () => this.props.history.push('/api/users')); 
    }

    render() {
        return (
          <div className="session-form">
            <h1>Make Your Money Move</h1>
            <h3>
              Robinhood lets you invest in companies you love, 
              commission-free.
            </h3>
            <form>
              <label>
                First Name
                <input
                  type="text"
                  value={this.state.first_name}
                  onChange={this.handleInput("first_name")}
                />
              </label>
              <label>
                Last Name
                <input
                  type="text"
                  value={this.state.last_name}
                  onChange={this.handleInput("last_name")}
                />
              </label>
              <label>
                Username
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.handleInput("username")}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInput("password")}
                />
              </label>
              <button onClick={this.handleSubmit}>Continue</button>
            </form>
          </div>
        ); 
    }
}

export default Signup; 