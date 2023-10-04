
import { zoom, scaleThreshold } from 'd3'
import "../CSS/Country.css"

const Globe = () => {
    
    let width
    let height
    let data
    let globeJson
    let margin
    let config
    let projection
    let generator
    let countries

    const my = (selection) => {

        if ( data && globeJson ){

            
            const g = selection.append('g')
            .style("pointer-events", "all")
            .attr("id", "g-element");

            selection.call(zoom().scaleExtent([1 / 3, 10]).on('zoom', (event) => {
                g.attr("transform", event.transform)
            }));

            g.append("path") // append instead of enter
            .datum({type: "Sphere"})
            .attr("d", generator)
            .style("fill", "lightblue")
            .style("stroke", "black")
            .style("stroke-width", 0.3);

            

            data.map((d, i) => {
                let currentCountry = countries.findIndex( country => country.name == d.Country)
                if ( currentCountry == -1 ){
                  
                  
                }
                else{
                  
                  countries[currentCountry].volume += +d.subscribers;
                }
              })

              const thresholds = [1, 1000, 1000000, 10000000, 100000000, 1000000000, 10000000000]

              const colorScale = scaleThreshold()
                .domain(thresholds)
                .range(["#777777", "#AAAAAA" , "#DDDDDD","#FFFFFF",  "rgb(8, 255, 75)", "rgb(5, 156, 46)" , "rgb(5, 71, 23)" ]);

                const generateColor = (d) => {
                    let currentCountry = countries.findIndex( (country) => {return country.name == d.properties.name})

                    if ( currentCountry == -1 ){
                      
                        
                        return 0;
                      }
                      else{
                        
                        return +countries[currentCountry].volume;
                      }
                  }

                  const generateSubs = (d) => {
                    let currentCountry = countries.findIndex( (country) => {return country.name == d.properties.name})

                    if ( currentCountry == -1 ){
                      
                        
                        return 0;
                      }
                      else{
                        
                        return +countries[currentCountry].volume;
                      }

                }
                      g
                      .selectAll("path.c")
                      .data(globeJson.features)
                      .join("path")
                      .attr("d", generator)
                      .attr('class', 'c')
                      .attr('stroke', '#000')
                      .attr('stroke-width', '0.05px')
                      
                      .attr('fill', (d) => {
                        return colorScale((generateColor(d)))})
                      .append('title')
                      .text((d) => `Country Name - ${d.properties.name}\nSubscriber Count - ${generateSubs(d)}`);
                  

        }
    }

    my.width = function (_) {
        return arguments.length
        ? ((width = +_), my)
        : width;
    };

    my.height = function (_) {
        return arguments.length
        ? ((height = +_), my)
        : height;
    };

    my.data = function (_) {
        return arguments.length
        ? ((data = _), my)
        : data;
    };

    my.globeJson = function (_) {
        return arguments.length
        ? ((globeJson = _), my)
        : globeJson;
    };

    my.margin = function (_) {
        return arguments.length
        ? ((margin = _), my)
        : margin;
    };

    my.config = function (_) {
        return arguments.length
        ? ((config = _), my)
        : config;
    };

    my.generator = function (_) {
        return arguments.length
        ? ((generator = _), my)
        : generator;
    };

    my.projection = function (_) {
        return arguments.length
        ? ((projection = _), my)
        : projection;
    };

    my.countries = function (_) {
        return arguments.length
        ? ((countries = _), my)
        : countries;
    };

    return my;
}


export default Globe;