import { min, max, scaleLinear, scaleBand, axisLeft, axisTop } from 'd3'

export const ScatterPlot = () => {
    
    let width
    let height
    let data
    let display
    let pointHeight
    let pointWidth
    let title
    let margin
    let radius
    let spaceForAxis = 10

    const my = (selection) => {
        if ( data == null ){
            
        }
        else{
        const pointScale = scaleLinear()
        .domain([ max(data.slice(0, display), d => +pointHeight(d)), min(data.slice(0, display), d => +pointHeight(d))])
        .range([margin.top, height - margin.bottom ])
        
        const pointPosition = scaleLinear()
            .domain([min(data.slice(0, display), d => +pointWidth(d)), max(data.slice(0, display), d => +pointWidth(d))])
            .range([margin.left, width - margin.right])


            const marks = data.map((d, i ) => {
                if(i >= display){
                    return null;
                }
                return {
                    lineHeight: pointScale(pointHeight(d)),
                    position: pointPosition(pointWidth(d)),
                    title: title(d) +"\nViews - " + pointWidth(d) + "\nUploads - " + pointHeight(d)
                }
                
            }
            ).filter(element => element !== null)
            console.log(display)
            selection.selectAll('circle.marks')
            .data(marks)
            .join('circle')
            .attr('fill', "#000000")
            .attr('r', radius )
            .attr('cx', (d) => `${d.position}px` )
            .attr('cy', (d) => `${d.lineHeight}px`)
            .attr("class", "marks")
            .append('title')
            .text((d) => d.title)
            


            selection.selectAll('g.x-axis')
            .data([null])
            .join('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height - spaceForAxis} ) `)
            .call(axisTop(pointPosition))

            selection.selectAll('g.y-axis')
            .data([null])
            .join('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margin.left}, 0 ) `)
            .call(axisLeft(pointScale))

            
            
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

    my.display = function (_) {
        return arguments.length
        ? ((display = _), my)
        : display;
    };

    my.pointHeight = function (_) {
        return arguments.length
        ? ((pointHeight = _), my)
        : pointHeight;
    };

    my.pointWidth = function (_) {
        return arguments.length
        ? ((pointWidth = _), my)
        : pointWidth;
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
    
    return my
}

export default ScatterPlot;