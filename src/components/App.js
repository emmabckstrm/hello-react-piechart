import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;
const d3 = require('d3');

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
        pieData: [],
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
      var color = d3.scale.linear()
        .domain([0,5,10])
        .range(["#FFBB98", "#89A8D8", "#FFD998"]);
        return (
          <div>
            <header>
              <h1>Hello PieChart!</h1>
            </header>
            <div className="chart-container">
              <PieChart
                data={this.state.pieData}
                width={400}
                height={400}
                radius={100}
                innerRadius={20}
                title="This is my Pie Chart"
                colors={color}
              />
              <div>
                <form className="new-entry-form" onSubmit={this.handleNewEntry}>
                  <div>
                    <input type="text" name="newEntryTitle" className="new-entry-title" placeholder="New entry" value={this.state.newEntryTitle} onChange={this.onInputChange}/>
                    <input type="number" name="newEntryNumber" className="new-entry-number" placeholder="0" value={this.state.newEntryNumber} onChange={this.onInputChange}/>
                  </div>
                  <div>
                    <input type="submit"/>
                  </div>
                </form>
              </div>
            </div>
        </div>

        );
    }
}
