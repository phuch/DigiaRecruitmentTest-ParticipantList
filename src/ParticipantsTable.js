import React, { Component } from 'react';
import editIcon from './edit.png';
import deleteIcon from './delete.png';

class ParticipantsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: null,
      isAscending: true,
    };
    this.initialState = this.state
  }

  toggleEditing = (id) => {
    this.setState({
      isEditing: id
    });
  };

  editHandler = (index, e) => {
    const newInfo = {
      name: this.fullName.value,
      email: this.emailAdd.value,
      phone: this.phoneNum.value
    };
     
    this.props.editParticipant(index, newInfo);
    this.setState(this.initialState);
  };

  sortHandler = (header) => {
    this.setState({
      isAscending: !this.state.isAscending
    });
    if (this.state.isAscending) {
      this.props.sortAsc(header);
    } else {
      this.props.sortDesc(header);
    }
  };

  renderTableRow = (participant, index) => {
    if(this.state.isEditing === participant.id) {
      return (
        <tr className="Table-row"
            key={participant.id}
        >
          <td width="25%">
            <input type="text" 
                   name="name"
                   placeholder="Full name"
                   defaultValue={participant.name}
                   ref={input => this.fullName = input}/>
          </td>

          <td width="30%">
            <input type="email" 
                   name="email"
                   placeholder="E-mail address"
                   defaultValue={participant.email}
                   ref={input => this.emailAdd = input}/>
          </td>

          <td width="25%">
            <input type="text" 
                   name="phone"
                   defaultValue={participant.phone}
                   ref={input => this.phoneNum = input}/>
          </td>

          <td width="10%">         
            <button className="Edit-btn"
                    onClick={() => {
                      this.setState(this.initialState)
                    }}
            >
              Cancel
            </button>
          </td>

          <td width="10%">
            <button className="Edit-btn" 
                    id="Save-btn" 
                    onClick={()=>this.editHandler(index)}
            >
              Save
            </button>
          </td>
        </tr>
      )
    } else {
      return (
        <tr className="Table-row" 
            key={participant.id} 
        >
          <td width="25%">{participant.name}</td>
          <td width="30%">{participant.email}</td>
          <td width="25%">{participant.phone}</td>
          <td width="10%">
            <button className='imageButton'>
              <img onClick={() => this.toggleEditing(participant.id)} src={editIcon} alt='edit' width='24' height='24'/>
            </button>
          </td>
          <td width="10%">
            <button className='imageButton'>
              <img onClick={() => this.props.delParticipant(index)} src={deleteIcon} alt='delete' width='24' height='24'/>
            </button>
          </td>
        </tr>
      );
    }
  };

  render() {
    return (
      <table>
        <thead>
          <tr className="Table-header">
            <td onClick={() => this.sortHandler('name')}>Name</td>
            <td onClick={() => this.sortHandler('email')}>E-mail address</td>
            <td onClick={() => this.sortHandler('phone')}>Phone number</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.props.participants.map((participant, index) => {
            return this.renderTableRow(participant, index);
          })}
        </tbody>
      </table>
    );
  }
}

export default ParticipantsTable;