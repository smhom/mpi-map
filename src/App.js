import React, { Component } from 'react';
import './App.css';
import UpdatableCloropleth from './UpdatableCloropleth'
import {Nav, NavItem} from "react-bootstrap"


import {VIEW_STATE_MPI, VIEW_STATE_HEALTH, 
	VIEW_STATE_EDUCATION, 
	VIEW_STATE_LIVINGSTANDARD} from './data'


class App extends Component {
	constructor(props) {
	    super(props)
	    this.state = {      
		  activeTab: VIEW_STATE_MPI 
	    }
	 }	
	
	handleSelect(selectedKey) {
		  this.setState({activeTab:selectedKey});
	}	
	
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Multidimensional Povery Index Visualization</h1>
        </header>
		
       <div> 
        <Nav
          bsStyle="pills"
          justified
          stacked
          activeKey={this.state.activeTab}
          onSelect={key => this.handleSelect(key)}
          // onClick={(i) => this.handleClick(i)}
        >
          <NavItem eventKey={VIEW_STATE_MPI} title="MPI Score" >
            MPI Score
          </NavItem>
          <NavItem eventKey={VIEW_STATE_HEALTH} title="Health Contribution">
            Health Contribution
          </NavItem>
          <NavItem eventKey={VIEW_STATE_EDUCATION} title="Educational Contribution" >
            Educational Contribution
          </NavItem>
           <NavItem eventKey={VIEW_STATE_LIVINGSTANDARD} title="Living Standard Contribution" >
            Living Standard Contribution
          </NavItem>
        </Nav>
        </div>
        
		<UpdatableCloropleth viewState={this.state.activeTab}/>
		References:
			http:// ophi.org.uk/multidimensional-poverty-index/
      </div>
    );
  }
}

export default App;
