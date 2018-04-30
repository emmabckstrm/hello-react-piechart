import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pieData: [
          {label: 'Margarita', value: 20.0},
          {label: 'John', value: 55.0},
          {label: 'Tim', value: 25.0 }
        ],
        newEntryTitle: '',
        newEntryNumber: null,
      };
    }

    handleNewEntry = (event) => {
      // takes original data
      // calculates total amount
      // calculates percentage per data point
      event.preventDefault();
      const newEntry = {
        label: this.state.newEntryTitle,
        value: this.state.newEntryNumber
      }
      this.setState((prevState) => {
        pieData: prevState.pieData.push(newEntry);
      });
    }

    onInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const inputName = target.name;
      this.setState({
        [inputName]: value
      })
    }

    render () {
        const pieData2 =  [
          {label: 'Margarita', value: 20.0},
          {label: 'John', value: 55.0},
          {label: 'Tim', value: 25.0 },
          {label: 'Erin', value: 3.0}
        ];
        return (
          <div>
            <h1>Hello PieChart!</h1>
            <PieChart
              data={this.state.pieData}
              width={400}
              height={400}
              radius={100}
              innerRadius={20}
              title="This is my Pie Chart"
            />
            <div>
              <form onSubmit={this.handleNewEntry}>
                <input type="text" name="newEntryTitle" placeholder="New entry" value={this.state.newEntryTitle} onChange={this.onInputChange}/>
                <input type="number" name="newEntryNumber" value={this.state.newEntryNumber} onChange={this.onInputChange}/>
                <input type="submit"/>
              </form>
            </div>
        </div>

        );
    }
}
