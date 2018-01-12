import React, { Component } from 'react';
import './App.css';
import MessagesList from './Components/MessagesList';
import Toolbar from './Components/Toolbar';
import NewMessage from './Components/NewMessage';
import Navbar from './Components/Navbar';

class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      messages: [],
      hidden: true
    }
  }

  async componentDidMount() {
    const response = await fetch ('http://localhost:8082/api/messages/');
    const json = await response.json();
    this.setState({messages: json._embedded.messages})
  }

  toggleClass = (message, nameOfClass) => {
    const index = this.state.messages.indexOf(message);
    let newMessages = this.state.messages.slice(0);
    newMessages[index][nameOfClass] = !newMessages[index][nameOfClass];
    this.setState({messages:newMessages})
  }

  count = (messages, propName) => {
    let ct = 0;
    let messagesWithProp = [...messages];
    messagesWithProp.forEach((message) => {
      if (message[propName]) ct++;
    })
    return ct;
  }

  countSelected = (messages) => {
    const numSelected = [...messages];
    if (this.count(numSelected, 'selected') < numSelected.length) {
      numSelected.forEach((msg) => {
        msg.selected = true;
      })
      this.setState({messages:numSelected})
    } else {
      numSelected.forEach((msg) => {
        msg.selected = false;
      })
      this.setState({messages:numSelected})
    }
  }

  mark = (messages, val) => {
    const copy = [...messages];
    copy.forEach((msg) => {
      if (msg.selected) msg.read = val;
    })
    this.setState({messages:copy})
  }

  updateLabels = (messages, label, val) => {
    const copy = [...messages];
    copy.forEach((msg) => {
      if (msg.selected) {
        if (val && !msg.labels.includes(label) && label !== "false") {
          msg.labels = [...msg.labels, label];
        }
        else if (!val && msg.labels.includes(label)) {
          msg.labels.splice(msg.labels.indexOf(label), 1)
        }
      }
    })
    this.setState({messages:copy})
  }

  toggleHidden = (hidden) => {
    hidden ? this.setState({hidden:false}) : this.setState({hidden:true})
  }

  // del = (messages) => {
  //   const copy = [...messages];
  //   copy.forEach((msg) => {
  //     if (msg.selected) {
  //       copy.splice(copy.indexOf(msg), 1);
  //     }
  //   })
  //   this.setState({messages:copy})
  // }

  async simplePatch (message, nameOfClass, value) {
    const body = {};
    body['messageIds'] = [message.id];
    body["command"] = nameOfClass;
    body[nameOfClass] = value;
    await fetch('http://localhost:8082/api/messages/', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     }
    })
  }

  async multiPatch (messages, action, value) {
    const body = {};
    body['messageIds'] = [];
    body["command"] = action;
    if (action !== "delete") body[action] = value;
    if (action === "addLabel" || action === "removeLabel") body["label"] = value
    const copy = [...messages];
      copy.forEach((msg) => {
        if (msg.selected) {
          body.messageIds.push(msg.id)
        }
      })
    console.log(body);
    fetch('http://localhost:8082/api/messages/', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     }
    })

    // const response = await fetch ('http://localhost:8082/api/messages/');
    // const json = await response.json();
    // console.log(json);
    // await this.setState({messages: json._embedded.messages})
    // WHY THIS DOESNT WORK :( :( :( :( :( :( :( :( :(
    // there has to be some way

  }

  render() {
    return (
      <div className="App">
        <Navbar  />

        <div className='container'>
          <Toolbar
            messages={this.state.messages}
            count={this.count}
            countSelected={this.countSelected}
            mark={this.mark}
            updateLabels={this.updateLabels}
            // del={this.del}
            multiPatch={this.multiPatch}
            hidden={this.state.hidden}
            toggleHidden={this.toggleHidden}
            />
          <NewMessage hidden={this.state.hidden}
            toggleHidden={this.toggleHidden}/>
          <MessagesList
            messages={this.state.messages}
            toggleClass={this.toggleClass}
            simplePatch={this.simplePatch}/>
        </div>

      </div>
    );
  }
}

export default App;
