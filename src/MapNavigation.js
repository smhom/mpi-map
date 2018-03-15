import React, { Component } from "react"
import {Nav, NavItem} from "react-bootstrap"

class MapNavigation extends Component {
	
	//constructor() {
	//    super()

	  
	// }	

	handleSelect(selectedKey) {
		  console.log(`mn selected ${selectedKey}`);
		  
	}
	
	handleClick(i) {
		  console.log(`mn clicked ${i}`);
		  //this.setState({this.props.activeTab:selectedKey});
	}


	

  render() {
    return (
      <div>
        
        <Nav
          bsStyle="pills"
          justified
          stacked
          activeKey={this.props.activeTab}
          //onSelect={key => function(){ this.props.handleSelect(key)}}
          //onClick={(i) => this.handleClick(i)}
        >
          <NavItem eventKey={1} title="MPI Score" >
            MPI Score
          </NavItem>
          <NavItem eventKey={2} title="Health Contribution">
            Health Contribution
          </NavItem>
          <NavItem eventKey={3} title="Educational Contribution" >
            Educational Contribution
          </NavItem>
           <NavItem eventKey={4} title="Living Standard Contribution" >
            Living Standard Contribution
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default MapNavigation