import React, {Component} from 'react'
const d3 = require('d3');

export default class NewEntryForm extends Component {


  render() {
    return(
      <form className="new-entry-form" onSubmit={this.props.handleNewEntry}>
        <div>
          <input type="text" name="newEntryTitle" className="new-entry-title" placeholder="New entry" value={this.props.newEntryTitle} onChange={this.props.onInputChange}/>
          <input type="number" name="newEntryNumber" className="new-entry-number" placeholder="0" value={this.props.newEntryNumber} onChange={this.props.onInputChange}/>
        </div>
        <div>
          <input type="submit"/>
        </div>
      </form>
    )
  }

}
