import React from "react";
import ScatterPlot from "../../d3-components/ScatterPlot";
import { select } from "d3";

class ScatterPlotWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            scatterPlotRef: React.createRef()
        }

    }
    componentDidMount(){

        const container = document.getElementById("scatterplotContainer");
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        this.scatterPlot = ScatterPlot()
            .width(containerWidth)
            .height(containerHeight)
            .pointWidth((d) => d.views)
            .pointHeight((d) => d.uploads)
            .title((d) => d.Youtuber)
            .radius(4)
            .margin({
                top: 30,
                right: 20,
                bottom: 20,
                left: 50
            });

        this.updateChart();

        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props || prevState !== this.state) {
          this.updateChart();
        }
      }

    updateChart(){
        const group = select(this.state.scatterPlotRef.current);
        this.scatterPlot.display(this.props.displayed)
        this.scatterPlot.data(this.props.data);
        this.scatterPlot(group);
        
    }

    render(){
        return <g ref={this.state.scatterPlotRef} id="ScatterPlot" className="scatter-plot"></g>;
    }

}

export default ScatterPlotWrapper