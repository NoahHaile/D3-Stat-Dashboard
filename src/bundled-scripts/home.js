
import React from "react";
import ReactDOM from "react-dom/client";

class Test extends React.Component{
    render(){
        return(
            <div>This Actually Works Too <a href="index.html">Click</a>
            
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("home-page"));

root.render(<Test />);