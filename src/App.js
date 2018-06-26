import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Messages from './components/Messages';
import ComposeForm from './components/ComposeForm';

class App extends Component {

  state = {
    showForm: false,
    inbox: []
  }

  async componentDidMount() {
    const result = await fetch(`http://localhost:8082/api/messages`)
    const messages = await result.json()
    console.log(messages)
    this.setState({inbox: messages})
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

  starMail = async (index) => {
    const result = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({messageIds: [this.state.inbox[index].id], command: 'star'})
    })
    const editedMail = await result.json()
    console.log(editedMail)
    this.setState({inbox: editedMail})
  }

  expandMail = async (index) => {
    const mail = {...this.state.inbox[index]}
    mail.expanded = !mail.expanded
    const body = {
      messageIds:[mail.id], 
      command: 'read',
      read: true
    }
    const result = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
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

  markAsRead = async (read) => {
    const body = {
      messageIds:this.state.inbox.filter(mail => mail.selected).map(mail => mail.id), 
      command: 'read',
      read: read
    }
    const result = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    const newInbox = await result.json()
    this.setState({inbox: newInbox})
  }

  addLabel = async (e) => {
    const request_body = {
      messageIds: this.state.inbox.filter(mail => mail.selected).map(mail => mail.id),
      command: 'addLabel',
      label: e.target.value
    }

    const result = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(request_body)
    })
    const newInbox = await result.json()
    this.setState({inbox: newInbox})
  }

  removeLabel = async (e) => {
    const request_body = {
      messageIds: this.state.inbox.filter(mail => mail.selected).map(mail => mail.id),
      command: 'removeLabel',
      label: e.target.value
    }

    const result = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(request_body)
    })
    const newInbox = await result.json()
    this.setState({inbox: newInbox})
  }

  deleteMessages = () => {
    const newInbox = this.state.inbox.filter(mail => !mail.selected)
    this.setState({inbox: newInbox})
  }

  addMessage = async (message) => {
    const newMessage = {
      ...message,
      read: false,
      selected: false,
      labels: [],
      starred: false
    }
    const result = await fetch(`http://localhost:8082/api/messages`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newMessage)
    })
    const mess = await result.json()
    this.setState({inbox: [mess, ...this.state.inbox]})
  }
  
  showForm = () => {
    this.setState({showForm: !this.state.showForm})
  }
}

export default App;
