import React, {Component} from 'react'
const PieChart = require('react-d3/piechart').PieChart;

export default class App extends Component {

    render () {
        const pieData =  [
          {label: 'Margarita', value: 20.0},
          {label: 'John', value: 55.0},
          {label: 'Tim', value: 25.0 }
        ];
        return (
          <div>
            <h1>Hello PieChart!</h1>
            <PieChart
              data={pieData}
              width={400}
              height={400}
              radius={100}
              innerRadius={20}
              title="This is my Pie Chart"
            />
        </div>
        );
    }
}
