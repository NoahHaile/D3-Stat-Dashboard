import { timer } from "d3";

const rotatationSpeed = {
    speed: 0,
    waitTime: 0,
}

let prevIsPaused = false;
function Rotate(projection, isPaused, g, generator, config) {

    timer(function (elapsed) {

        if(!isPaused){
            if(prevIsPaused != isPaused){
                rotatationSpeed.waitTime += elapsed - rotatationSpeed.speed;
            }
            rotatationSpeed.speed = elapsed;
        }
        else{
            if ( prevIsPaused != isPaused )
                rotatationSpeed.speed = elapsed
        }
        prevIsPaused = isPaused;
        projection.rotate(
            [config.speed*(rotatationSpeed.speed + rotatationSpeed.waitTime)-120, 
            config.verticalTilted, 
            config.horizontalTilted]);
            g.selectAll("path").attr("d", generator);
        });
      
}

export default Rotate;