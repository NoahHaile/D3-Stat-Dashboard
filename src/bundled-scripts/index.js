import React from "react";
import ReactDOM from "react-dom/client";
import Visualization from "../components/visualization";
import NavBar from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer"

import { csv } from "d3";
import data from '../data/data.csv';

require("../CSS/Dashboard.css")


class Dashboard extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            data: null,
        }
    }

    async componentDidMount(){
        try {
            const result = await csv(data); // Assuming this function returns a promise
            console.log(result)
            this.setState({ data: result }); // Update the state with fetched data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    render(){
        return(
            
            <div className="app">
                <header className="header">
                    <Header/>
                </header>
                
                <nav className="navbar">
                    <NavBar />
                </nav>
                

                <main className="main">
                    {this.state.data ? <Visualization data={this.state.data} /> : <h1>LOADING</h1>}
                </main>
                
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("index-page"));

root.render(<Dashboard />);