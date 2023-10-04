import { sum, schemeSet2, scaleOrdinal, scaleLinear, path } from 'd3';

const PieChart = () => {
    
    let width
    let height
    let display
    let data
    let arcWidth
    let radius
    let title
    let margin
    let spaceForAxis = 30

    const my = (selection) => {
        
        if ( data == null ){
            
        }
        else{
            const darkColorPalette = [
                "#1F77B4", // Dark blue
                "#FF7F0E", // Dark orange
                "#2CA02C", // Dark green
                "#D62728", // Dark red
                "#9467BD", // Dark purple
                "#8C564B", // Dark brown
                "#E377C2", // Dark pink
                "#7F7F7F", // Dark gray
                "#BCBD22", // Dark yellow
                "#17BECF"  // Dark cyan
              ];
        const circleWidth = scaleLinear()
            .domain([0, sum(data.slice(0, display), arcWidth)]) // d3.extent(data, xValue)
            .range([0, Math.PI * 2]);
        
        const colorScale = scaleOrdinal()
            .domain(data.map((d) => arcWidth(d))) // Specify the unique data categories as the domain
            .range(darkColorPalette); //CHANGE THIS ACCORDING TO THE COLORS YOU NEED
        
        
        let currentAngle = 0
        const marks = data.map((d, i) => { 
                if(i >= display){
                    return null;
                }
                else{
                    
                    const mark = {
                        startAngle: currentAngle,
                        endAngle: currentAngle + circleWidth(arcWidth(d)),
                        color: colorScale(arcWidth(d)),
                        tooltip: title(d), 
                    }

                    currentAngle = mark.endAngle
                    return mark;
                }
                
            }).filter(element => element !== null);
            
            const arcFunction = (d) => {
                
                const semiCirclePath = path();
                semiCirclePath.moveTo(width / 2, height / 2);
                semiCirclePath.arc(width / 2, height / 2, radius, d.startAngle, d.endAngle);
                return semiCirclePath;
            }

            
            selection.selectAll('path.marks')
            .data(marks)
            .join('path')
            .attr("d", (d) => arcFunction(d))
            .attr('fill', (d) => d.color)
            .append('title')
            .text((d) => d.tooltip)

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

    my.display = function (_) {
        return arguments.length
        ? ((display = +_), my)
        : display;
    };

    my.data = function (_) {
        return arguments.length
        ? ((data = _), my)
        : data;
    };


    my.title = function (_) {
        return arguments.length
        ? ((title = _), my)
        : title;
    };

    my.margin = function (_) {
        return arguments.length
        ? ((margin = _), my)
        : margin;
    };

    my.radius = function (_) {
        return arguments.length
        ? ((radius = _), my)
        : radius;
    };

    my.arcWidth = function (_) {
        return arguments.length
        ? ((arcWidth = _), my)
        : arcWidth;
    };
    
    return my
}

export default PieChart;