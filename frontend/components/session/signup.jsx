import React from 'react';
import {Link} from 'react-router-dom';

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
        .then( () => this.props.history.push('/dashboard')); 
    }

    render() {
        return (
          <div>
          
            <form className="signup-form">

              <div className="signup-navbar">
                <Link to="/">
                  <img className="signup-logo" src={roberthoodHatURL} />
                </Link>
                <Link className="active" to="#">Account</Link>
                <Link className="signup-navbar-item" to="#">Basic Info</Link>
                <Link className="signup-navbar-item" to="#">Identity</Link>
                <Link className="signup-navbar-item" to="#">Funding</Link>
                <Link className="signup-navbar-item" to="#">Submit</Link>
              </div>
              <hr />

              <div>
                <h1 className="signup-header">Make Your Money Move</h1>
                <h3 className="signup-subheader">
                  Roberthood lets you invest in companies you love, commission-free.
                </h3>
              </div>
              <div className="firstname-lastname">
                <input
                  className='signup-input1'
                  type="text"
                  value={this.state.first_name}
                  onChange={this.handleInput("first_name")}
                  placeholder="First name"
                />
                <input
                  className='signup-input1'
                  type="text"
                  value={this.state.last_name}
                  onChange={this.handleInput("last_name")}
                  placeholder="Last name"
                />
              </div>
              <br />
              <br />
              <input
                className="signup-input2"
                type="text"
                value={this.state.username}
                onChange={this.handleInput("username")}
                placeholder="Username"
              />
              <br />
              <br />
              <br />
              <input
                className="signup-input2"
                type="password"
                value={this.state.password}
                onChange={this.handleInput("password")}
                placeholder="Password"
              />
              <br />
              <br />
              <br />
              <button className="signup-btn" onClick={this.handleSubmit}>
                Continue
              </button>
              <br />
              <br />
              <br />
              <div>
                <p className="application">
                  Already started? <span className="application-continue">Log in to complete your application.</span>
                </p>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <div>
                <img className="signup-form-footer-image" src={signupFormFooterURL} />
              </div>
            </form>
           
           

          </div>
      
        ); 
    }
}

export default Signup; 
