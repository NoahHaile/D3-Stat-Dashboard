import React from "react";

import "../CSS/Nav.css"
import img1 from "../Assets/img/Refresh.png"
import img2 from "../Assets/img/Notes2.png"
import img3 from "../Assets/img/Download.png"


class NavBar extends React.Component {
 
  render() { 
    return (
      <ul>
        <li><img src={img1} className="nav-buttons"/></li>
        <li><img src={img2} className="nav-buttons"/></li>
        <li><img src={img3} className="nav-buttons"/></li>
      </ul>
    );
  }
}

export default NavBar;
