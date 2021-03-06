import React, {Component} from 'react';
import NewEntryForm from './NewEntryForm'
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
      }, () => {
        if(callback){
           callback();
        }
      });
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
      if (this.state.newEntryNumber > 0) {
        const newEntry = {
          label: this.state.newEntryTitle.slice(),
          value: this.state.newEntryNumber.slice(),
          originalValue: Number(this.state.newEntryNumber.slice()),
        }
        let newData;
        this.setState((prevState) => {
          newData = prevState.pieData.slice();
          newData.push(newEntry);
          return { pieDataTotal: prevState.pieDataTotal + newEntry.originalValue,
            newEntryNumber: '',
            newEntryTitle: '',
          }
        }, () => {
          this.updatePieData(newData);
        });
      }
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
                radius={120}
                innerRadius={25}
                title="This is my Pie Chart"
                colors={color}
              />
              <p className="text-center">Your team has in total <b>{this.state.pieDataTotal}</b> of arbitrary units</p>
              <div>
                <NewEntryForm
                  handleNewEntry={this.handleNewEntry}
                  newEntryTitle={this.state.newEntryTitle}
                  newEntryNumber={this.state.newEntryNumber}
                  onInputChange={this.onInputChange}
                />
              </div>
            </div>
        </div>

        );
    }
}
