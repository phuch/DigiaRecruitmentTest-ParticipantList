import React, { Component } from 'react';

const TableRow = props => (
    <tr className="Table-row">
      <td width="25%">{props.row.name}</td>
      <td width="30%">{props.row.email}</td>
      <td width="25%">{props.row.phone}</td>
      <td width="10%">
      	<button className='imageButton'>
      		<img onClick={props.editParticipant} src='/edit.png' alt='edit' width='24' height='24'/>
      	</button>
      </td>
      <td width="10%">
      	<button className='imageButton'>
      		<img onClick={props.delParticipant} src='/delete.png' alt='delete' width='24' height='24'/>
      	</button>
      </td>
    </tr>
);

class ParticipantsTable extends Component {
  render() {
    const rows = this.props.participants.map((participant, index) => {
      return (
        <TableRow delParticipant={
                    () => this.props.delParticipant(index)
                  } 
                  editParticipant={
                    () => this.props.editParticipant()
                  }
        		      key={participant.id} 
        		      row={participant}
       	/>
      );
    });

    return (
      <table>
        <thead>
          <tr className="Table-header">
            <td>Name</td>
            <td>E-mail address</td>
            <td>Phone number</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export default ParticipantsTable;