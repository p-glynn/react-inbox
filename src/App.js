import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import MessagesList from './Components/MessagesList';
import Toolbar from './Components/Toolbar';
import Navbar from './Components/Navbar';

class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      messages: this.props.messages
    }
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

  del = (messages) => {
    const copy = [...messages];
    copy.forEach((msg) => {
      if (msg.selected) {
        copy.splice(copy.indexOf(msg), 1);
      }
    })
    this.setState({messages:copy})
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
            del={this.del}/>
          <MessagesList messages={this.state.messages} toggleClass={this.toggleClass}/>
        </div>

      </div>
    );
  }
}

export default App;
