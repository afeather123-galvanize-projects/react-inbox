import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';
import ComposeForm from './components/ComposeForm';

class App extends Component {

  state = {
    showForm: false,
    inbox: [
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ]
  }

  render() {
    return (
      <div>
        <Toolbar selected={this.mailSelected()} 
        selectAllMail={this.selectAllMail}
        markAsUnread={() => {this.markAsRead(false)}}
        markAsRead={()=>this.markAsRead(true)}
        numUnread={this.numUnreadMessage()}
        addLabel={this.addLabel}
        removeLabel={this.removeLabel}
        deleteMessages={this.deleteMessages}
        showForm={this.showForm}/>
        {this.state.showForm ? <ComposeForm handleSubmit={this.addMessage}/> : null}
        <Messages {...this.state} 
        selectMail={this.selectMail} 
        starMail={this.starMail}
        expandMail={this.expandMail}/>
      </div>
    );
  }

  selectMail = (index, selected) => {
    const mail = {...this.state.inbox[index]}
    mail.selected = selected
    const inbox = [...this.state.inbox]
    inbox[index] = mail;
    this.setState({inbox: inbox})
  }

  starMail = (index) => {
    const mail = {...this.state.inbox[index]}
    mail.starred = !mail.starred
    const inbox = [...this.state.inbox]
    inbox[index] = mail;
    this.setState({inbox: inbox})
  }

  expandMail = (index) => {
    const mail = {...this.state.inbox[index]}
    mail.expanded = !mail.expanded
    mail.read = true
    const inbox = [...this.state.inbox]
    inbox[index] = mail;
    this.setState({inbox: inbox})
  }

  mailSelected() {
    const numSelected = this.state.inbox.filter(mail => mail.selected).length;
    if(numSelected <= 0) return 'none'
    if(numSelected === this.state.inbox.length) return 'all'
    return 'some'
  }

  numUnreadMessage() {
    return this.state.inbox.filter(mail => !mail.read).length
  }

  selectAllMail = () => {
    const selected = this.mailSelected()
    let setter = selected === 'none' ? true : false
    const newInbox = this.state.inbox.map(mail => {
      const newMail = {...mail}
      newMail.selected = setter
      return newMail
    })
    this.setState({inbox: newInbox})
  }

  markAsRead = (read) => {
    const newInbox = this.state.inbox.map(mail => {
      if(mail.selected && mail.read !== read) {
        const newMail = {...mail}
        newMail.read = read
        return newMail
      } else {
        return mail
      }
      
    })
    this.setState({inbox: newInbox})
  }

  addLabel = (e) => {
    const label = e.target.value
    if(label === 'Apply Label') {
      return;
    }
    const newInbox = this.state.inbox.map(mail => {
      if(mail.selected) {
        const labelIndex = mail.labels.indexOf(label)
        if(labelIndex === -1) {
          const newMail = {...mail}
          newMail.labels.push(label)
          return newMail
        }
      }
      return mail;
    })
    this.setState({inbox: newInbox})
  }

  removeLabel = (e) => {
    const label = e.target.value
    if(label === 'Remove Label') {
      return;
    }
    const newInbox = this.state.inbox.map(mail => {
      if(mail.selected) {
        const labelIndex = mail.labels.indexOf(label)
        if(labelIndex !== -1) {
          const newMail = {...mail}
          newMail.labels.splice(labelIndex,1)
          return newMail
        }
      }
      return mail;
    })
    this.setState({inbox: newInbox})
  }

  deleteMessages = () => {
    const newInbox = this.state.inbox.filter(mail => !mail.selected)
    this.setState({inbox: newInbox})
  }

  addMessage = (message) => {
    const newMessage = {
      ...message,
      read: false,
      selected: false,
      labels: [],
      starred: false
    }
    this.setState({inbox: [newMessage, ...this.state.inbox]})
  }
  showForm = () => {
    this.setState({showForm: !this.state.showForm})
  }
}

export default App;
