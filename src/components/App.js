import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;

export default class App extends Component {
    constructor(props) {
      super(props);
      this.originalPieData = [
        {label: 'Margarita', value: 20.0, originalValue: 30.0},
        {label: 'John', value: 55.0, originalValue: 81.0},
        {label: 'Tim', value: 25.0, originalValue: 45.0 }
      ];

      this.state = {
        newEntryTitle: '',
        newEntryNumber: '',
        pieData: [
          {label: 'Mary', value: 20.0},
          {label: 'Jonas', value: 55.0},
          {label: 'Timothy', value: 25.0 }
        ],
        pieDataTotal: 0,
      };

    }
    componentDidMount = () => {
      this.calculateTotal(this.originalPieData, () => { this.updatePieData(this.originalPieData)});
      //this.updatePieData(this.originalPieData);
    }

    calculateTotal = (data, callback) => {
      let total = 0;
      for (let i=0; i<data.length; i++) {
        total += data[i].originalValue;
      }
      this.setState({
        pieDataTotal: total
      }, () => {callback()});
    }

    updatePieData = (originalData) => {
      let newData = originalData.slice();
      let value = null;
      for (let j=0; j<originalData.length; j++) {

        value = (originalData[j].originalValue / this.state.pieDataTotal)*100;
        newData[j].value = value.toFixed(1);
      }
      this.setState({
        pieData: newData
      })
    }

    handleNewEntry = (event) => {
      event.preventDefault();
      const newEntry = {
        label: this.state.newEntryTitle.slice(),
        value: this.state.newEntryNumber.slice(),
        originalValue: Number(this.state.newEntryNumber.slice()),
      }
      let newData;
      this.setState({
        newEntryNumber: '',
        newEntryTitle: '',
      })
      this.setState((prevState) => {
        newData = prevState.pieData.slice();
        newData.push(newEntry);
        return { pieDataTotal: prevState.pieDataTotal + newEntry.originalValue }
      }, () => {
        this.updatePieData(newData);
      });
    }

    onInputChange = (event) => {
      const target = event.target;
      const inputName = target.name;
      this.setState({
        [inputName]: target.value
      })
    }

    render () {
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
