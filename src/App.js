import React, { Component } from 'react';
import {Route} from 'react-router-dom';
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
    const response = await fetch('http://localhost:8082/api/messages/');
    const json = await response.json();
    this.setState({messages: json._embedded.messages})
  }

  toggleClass = (message, cls) => {
    const i = this.state.messages.indexOf(message);
    let nMsgs = this.state.messages.slice(0);
    cls !== "read" ? nMsgs[i][cls] = !nMsgs[i][cls] : nMsgs[i][cls] = "read"
    this.setState({messages:nMsgs})
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
    } else {
      numSelected.forEach((msg) => {
        msg.selected = false;
      })
    }
    this.setState({messages:numSelected})
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

   reRender = async () => {
    const response = await fetch ('http://localhost:8082/api/messages/');
    const json = await response.json();
    this.setState({messages: json._embedded.messages})
  }

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


  multiPatch = async (messages, action, value) => {
    const body = {};
    body['messageIds'] = []
    body["command"] = action;
    if (action !== "delete") body[action] = value;
    if (action === "addLabel" || action === 'removeLabel') body['label']=value;
    messages.forEach((msg) => {
      if (msg.selected) {
        body.messageIds.push(msg.id)
      }
    })
    let patchReq = fetch('http://localhost:8082/api/messages/', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     }
    })
    await patchReq;
    this.reRender();
  }

  makePost = async (event) => {
    let requestBody = {}
    requestBody["subject"] = document.getElementById("subject").value;
    requestBody["body"] = document.getElementById("body").value;
    let postReq = fetch ('http://localhost:8082/api/messages/', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     }
   })
   await postReq;
   this.reRender();
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
            multiPatch={this.multiPatch}
            />
          <Route path='/compose' component={ props =>
            <NewMessage makePost = {this.makePost} /> }
           />
          <MessagesList
            messages={this.state.messages}
            toggleClass={this.toggleClass}
            simplePatch={this.simplePatch}
            />
        </div>

      </div>
    );
  }
}

export default App;
