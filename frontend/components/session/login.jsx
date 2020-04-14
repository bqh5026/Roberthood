import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state)
      .then(() => this.props.history.push('/dashboard'));
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <div className="sign-in-container">
          <div>
            <img className="sign-in-image" src={signInURL} />
          </div>

          <div className="sign-in-form">
            <h1 className='sign-in-header'>Welcome to Roberthood</h1>
            <form>
              <span className='label'>Username</span><br/>
                <input className='input'
                  type="text"
                  value={this.state.username}
                  onChange={this.handleInput("username")}
                /> <br />
              <span className='label'>Password</span><br />
                <input className='input'
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInput("password")}
                /> <br />
              <span className='retrieval'>Forgot your username or password?</span>
              <br />
              <br />
              <button className='sign-in-btn' onClick={this.handleSubmit}>Sign In</button>
            </form>
          </div>

          <div className='demo-user'>
            <form>
              <input 
                type="hidden"
                value={this.state.username = 'bqh5026'}
                />
              <input 
                type="hidden"
                value={this.state.password = 'password'}
              />
              <button className='demo-user-btn' onClick={this.handleSubmit}>Demo User</button>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

export default Login 

