import React from "react";

import "../CSS/Header.css"
import Image from "../Assets/img/svgImage2.svg"


class Header extends React.Component {

    componentDidMount(){
        const movingImage = document.getElementById('surfer');
        

    }
  render() { 
    return (
        /*<svg class="parent-svg" xmlns="http://www.w3.org/2000/svg">
        <image class="svg-image" href={svgImage} width="100%" height="100%" />
        </svg>*/
    <div className="svg-container">
        <div className="headerContainer">
            <h1><span className="dark-red">YOUTUBE</span> NUMBERS & STATISTICS</h1>
        </div>
        <div className="Image-Container">
            <img src={Image} width="120px" height="120px" className="icon" id="surfer"/>
        </div> 
    </div>
    );
  }
}

export default Header;
