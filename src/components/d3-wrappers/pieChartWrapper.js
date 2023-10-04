import React from "react";
import PieChart from "../../d3-components/PieChart";
import { select } from "d3";

class PieChartWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pieChartRef: React.createRef()
        }

    }
    componentDidMount(){

        const container = document.getElementById("piechartContainer");
        const containerWidth = container.clientWidth - 20;
        const containerHeight = container.clientHeight - 20;
        
        this.pieChart = PieChart()
            .width(containerWidth)
            .height(containerHeight)
            .arcWidth((d) => d.subscribers)
            
            .radius(Math.min(containerHeight, containerWidth) / 2)
            .margin({
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            });

        this.updateChart();

        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props || prevState !== this.state) {
          this.updateChart();
        }
      }

    updateChart(){
        const group = select(this.state.pieChartRef.current);
        this.pieChart.display(this.props.displayed);
        this.pieChart.data(this.props.data).title((d) => d.Youtuber);
        this.pieChart(group);
        
    }

    render(){
        return <g ref={this.state.pieChartRef} id="PieChart" className="pie-chart"></g>;
    }

}

export default PieChartWrapper