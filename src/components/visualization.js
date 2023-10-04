import React from "react";

import PieChartWrapper from "./d3-wrappers/pieChartWrapper"; // Make sure to import your PieChart component
import ScatterPlotWrapper from "./d3-wrappers/scatterPlotWrapper";
import GlobeWrapper from "./d3-wrappers/globeWrapper";

import "../CSS/Visualization.css"

import DataTable from "./Sub-Components/DataTable";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


class Visualization extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pieChartInput: 10,
      scatterPlotInput: 10,
    };
  }

  handleInputChangePieChart = (value) => {
    this.setState({
      pieChartInput: value,
    });
    console.log(this.state.pieChartInput)
  };

  handleInputChangeScatterPlot = (value) => {
    this.setState({
      scatterPlotInput: value,
    });
  };


 
  render() { 
    return (
    <div className="visualizations">
      <div className="pie-chart-container">
          <span className="chart-descriptors">TOTAL SUBSCRIBERS RATIO</span>
          <svg className="pie-chart" id="piechartContainer">
            <PieChartWrapper data={this.props.data} displayed={this.state.pieChartInput} />
          </svg>
          
        <Slider
        min={1}
        max={this.props.data.length}
        step={1}
        defaultValue={10}
        onChange={this.handleInputChangePieChart}
        trackStyle={{ backgroundColor: 'green', height: 5 }}
        handleStyle={{ borderColor: 'blue', borderWidth: 2 }}
        railStyle={{ backgroundColor: 'lightgray', height: 5 }}
      />
      </div>
      <div className="scatterplot-container">
        <Slider
          min={1}
          max={this.props.data.length}
          step={1}
          defaultValue={10}
          onChange={this.handleInputChangeScatterPlot}
          trackStyle={{ backgroundColor: 'green', height: 5 }}
          handleStyle={{ borderColor: 'blue', borderWidth: 8 }}
          railStyle={{ backgroundColor: 'lightgray', height: 5 }}
          vertical
        />
        
        <svg className="scatterplot" id="scatterplotContainer">
          
          <ScatterPlotWrapper data={this.props.data} displayed={this.state.scatterPlotInput}/>
        </svg>
        <span className="chart-descriptors-scatter">VIEWS/UPLOADS</span>
      </div>
      <div className="globe-container">
      <svg className="globe">
        <GlobeWrapper data={this.props.data} />
      </svg>
      </div>
      <div className="data-table">
        <DataTable data={this.props.data} />
      </div>
    </div>
    );
  }
}

export default Visualization;
