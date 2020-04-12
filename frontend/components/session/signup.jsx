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
          <div className="signup-form">
            <img className='signup-logo' src={greenFeatherURL} />
            <h1 className='signup-header'>Make Your Money Move</h1>
            <h3 className='signup-subheader'>
              Robinhood lets you invest in companies you love, commission-free.
            </h3>
            <form>
          
              <span>First Name</span>
                <input
                  type="text"
                  value={this.state.first_name}
                  onChange={this.handleInput("first_name")}
                />
          
              <span>Last Name</span>
              
                <input
                  type="text"
                  value={this.state.last_name}
                  onChange={this.handleInput("last_name")}
                />
              <br />
            
              <span>Username</span>
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.handleInput("username")}
                />
           
              <br />
              <span>Password</span>
              
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInput("password")}
                />
              <br />
              <button className="signup-btn" onClick={this.handleSubmit}>
                Continue
              </button>
            </form>
          </div>
        ); 
    }
}

export default Signup; 