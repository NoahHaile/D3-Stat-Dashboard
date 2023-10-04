
import { csv } from "d3";

const getData = async (filename) => {
    return await csv(filename)
}


export default getData