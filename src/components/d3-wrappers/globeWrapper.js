import React from "react";

import { select, timer, json } from "d3"; // Correct import for selection
import { geoOrthographic, geoPath } from "d3-geo"; // Import geoOrthographic and geoPath
import Globe from "../../d3-components/Globe";
import mapJson from '../../data/customGeo.json';

class GlobeWrapper extends React.Component{

    projection = null
    generator = null
    group = null
    config = {
        speed: 0.025,
        verticalTilted: -10,
        horizontalTilted: 0
    };
    countries = [];
    prevIsHovered = false;

    constructor(props){
        super(props)
        this.state = {
            globeRef: React.createRef(),
            mapJson: null,
            isHovered: false,  
        }

    }
    async componentDidMount(){
        this.group = select(this.state.globeRef.current);
        
        this.globe = Globe()
            .width(1000)
            .height(700)
            .margin({
                top: 20,
                right: 20,
                bottom: 50,
                left: 50
            })

        try {
                
                const result = await json(mapJson)
              
                this.setState({ mapJson: result }); // Update the state with fetched data
                
        } catch (error) {
                console.error("Error fetching data:", error);
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.mapJson !== this.state.mapJson) {
            this.updateCountries();
            this.updateProjections();
            this.Rotate();
            this.updateChart();
           
            
        }   
        
      }


    updateCountries(){
        this.state.mapJson.features.map(d => {
          this.countries.push({
            
            name: d.properties.name,
            volume: 0
          })
          
        })
      }
    updateProjections(){
        this.projection = geoOrthographic()
        .fitSize([200, 200], this.state.mapJson)
        .center([0, 0]) 
        .scale(100)
        .clipAngle(90)
        .translate([1000 / 2, 700 / 3])
        .rotate([0, 0]);

        this.generator = geoPath().projection(this.projection)

    }

    

    Rotate() {

        const rotatationSpeed = {
            speed: 0,
            waitTime: 0,
        }

        const self = this;
        
        timer(function(elapsed) {
    
            if(!(self.state.isHovered)){
                if(self.prevIsHovered != self.state.isHovered){
                    rotatationSpeed.waitTime += elapsed - rotatationSpeed.speed;
                    
                }
                rotatationSpeed.speed = elapsed;
            }
            else{
                if ( self.prevIsHovered != self.state.isHovered )
                    rotatationSpeed.speed = elapsed
            }

            self.prevIsHovered = self.state.isHovered
            self.projection.rotate(
                [self.config.speed*(rotatationSpeed.speed - rotatationSpeed.waitTime)-120, 
                self.config.verticalTilted, 
                self.config.horizontalTilted]);
                self.group.selectAll("path").attr("d", self.generator);
            });
          
    }

    updateChart(){
        
        this.globe.data(this.props.data)
            .projection(this.projection)
            .generator(this.generator)
            .globeJson(this.state.mapJson)
            .countries(this.countries);
            
        this.globe(this.group);
            
        
    }

    handleMouseEnter = () => {
        this.setState({ isHovered: true });
    };

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    };

    render(){
        
        return <g onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave} ref={this.state.globeRef} id="Globe" className="globe"></g>;
    }

}

export default GlobeWrapper