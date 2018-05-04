import React, { Component } from 'react';
import axios from 'axios'
import Loading from './Loading'

//data = {}

class App extends Component {
  constructor(props){
    super(props)
    //state
    this.state ={
      users: [],
      loading: false
    }
    //bind
    //this.handleSubmit = this.handleSubmit.bind(this)
  }

  getUsers(){
    this.setState({loading:true})
    axios('https://api.randomuser.me/?nat=US&results=5').then(response => this.setState({
      users: [...this.state.users, ...response.data.results],
      loading: false
    }))
  }

  handleSubmit(e){
    e.preventDefault();
    this.getUsers();
    console.log('more users loaded');
  }

  componentWillMount(){
    //axios('https://api.randomuser.me/?nat=US&results=5').then(response => console.log(response))
    this.getUsers()  
  
  }

  render() {
    const {loading, users} = this.state;
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
            <input type="submit" value="load more..."/>
          </form>
        {!loading ? users.map(user => (
          <div key={user.id.value}>
          <h3 style={{color:'red'}}>{user.name.first} {user.name.last}</h3>
          <p>{user.email}</p>
          <hr />
          
          </div>
        )) : <Loading message="Loading!!"/>}
      </div>
    );
  }
}

export default App;
