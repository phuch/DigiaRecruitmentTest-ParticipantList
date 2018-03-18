import React, { Component } from 'react';
import './App.css';
import ParticipantsTable from './components/ParticipantsTable';
import SignupForm from './components/SignupForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      participants: [{
        id: 1,
        name: 'John Doe',
        email: 'john.doe1@gmail.com',
        phone: '0505787896',
      }, {
        id: 2,
        name: 'Christiana Millie Regent',
        email: 'christiana.m.regent@gmail.com',
        phone: '0435467896',
      }, {
        id: 3,
        name: 'Millie Christianas',
        email: 'mil.christine@gmail.com',
        phone: '0235467896',
      }]
    }
  }

  addParticipant = (participant) => {
    const newParticipant = {
      id: this.state.participants.length + 1,
      name: participant.name,
      email: participant.email,
      phone: participant.phone
    }

    this.setState({
      participants: [...this.state.participants, newParticipant]
    });

  }

  editParticipant = (index, newInfo) => {
    console.log('editing');
    const participant = Object.assign({}, this.state.participants[index]);
    
  }

  delParticipant = (index) => {
    const participants = Object.assign([], this.state.participants);
    participants.splice(index, 1);
    this.setState({
      participants: participants
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Integrify Spring Batch</h1>
        </header>
        <main className="App-content">
          <p className="App-intro">
            List of participants
          </p>
          <SignupForm participants={this.state.participants} 
                      addParticipant={this.addParticipant}
          />
          <ParticipantsTable participants={this.state.participants} 
                             delParticipant={this.delParticipant}
                             editParticipant={this.editParticipant}
          />
        </main>
      </div>
    );
  }
}

export default App;
