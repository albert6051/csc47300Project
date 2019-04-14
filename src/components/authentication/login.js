import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, setUser } from "../../services/auth"
import { I18n } from 'aws-amplify';
import { Auth } from "aws-amplify"
import { withAuthenticator } from 'aws-amplify-react'

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
    error: ``,
    language:'es'
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.handleLogin()
  }

  handleLogin = async() => {
    const { username, password } = this.state;
    try {
      await Auth.signIn(username, password)
      const user = await Auth.currentAuthenticatedUser();
      // console.log("user data is", user);
      const userInfo = {
        ...user.attributes,
        username: user.username,
        language: "es"
      }
      const test = await Auth.userAttributes(user);
      console.log(test)
      // console.log(userInfo);
      setUser(userInfo)
      navigate("/app/user-profile")
    } catch (err) {
      this.setState({ error: err })
      console.log('error....: ', err)
    }
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/app/user-profile`)
    }
    I18n.setLanguage(this.state.language);
    return (
      <>
        <h1>Log in</h1>
        <div>
          <button onClick={()=>{
            this.setState({language:'es'});       
          }}> 
            ENGLISH
          </button> 
          <button onClick={()=>{
            this.setState({language:'ch'});
          }}> 
           中文
          </button> 
       </div>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
          }}
        >
          <label>
          {I18n.get('username')}
            <input type="text" name="username" onChange={this.handleUpdate} />
          </label>
          <label>
          {I18n.get('password')}
            <input
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}

export default Login;