import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,} from "react-simple-maps"
import chroma from "chroma-js"
import { scaleLinear } from "d3-scale"

import ReactTooltip from "react-tooltip"
import {mpi_values, 
	health_contribution,
	livingstandard_contribution, 
	education_contribution} from './data';
import {VIEW_STATE_MPI, VIEW_STATE_HEALTH, 
		VIEW_STATE_EDUCATION, 
		VIEW_STATE_LIVINGSTANDARD} from './data'


const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}



const mpiScale = scaleLinear()
  .domain([0, 1])
  .range(["#c3e2ff", "#08306B"])
  
const healthScale = scaleLinear()
  .domain([0, 100])
  .range(["#FBA8B5", "#D30A32"])
  
const educationScale =  scaleLinear()
  .domain([0, 60])
  .range(["#FBF0A8", "#F2D713"])
  
const livingStandardScale =  scaleLinear()
  .domain([0, 60])
  .range(["#c1e699", "#39741d"])  
  
  

function get_fill_value(viewState, countryCode){
	  switch (viewState) {
		case VIEW_STATE_HEALTH:
			if (health_contribution.get(countryCode) ===undefined)
				return "#f7fbff";
			return healthScale(health_contribution.get(countryCode))
		case VIEW_STATE_LIVINGSTANDARD:
			if (livingstandard_contribution.get(countryCode) === undefined)
				return "#f7fbff";
			return livingStandardScale(livingstandard_contribution.get(countryCode))
		case VIEW_STATE_EDUCATION:
			if (education_contribution.get(countryCode) === undefined)
				return "#f7fbff";
			return educationScale(education_contribution.get(countryCode))			
		default: // VIEW_STATE_MPI
			if (mpi_values.get(countryCode) === undefined)
				return "#f7fbff";
			return mpiScale(mpi_values.get(countryCode))
	}
  }

  
class UpdatableChoropleth extends Component {
 
  render() {
    return (
     
        <div style={wrapperStyles}>
          <ComposableMap
            projectionConfig={{
              scale: 205,
              rotation: [-11,0,0],
            }}
            width={980}
            height={551}
            style={{
              width: "100%",
              height: "auto",
            }}
            >
            <ZoomableGroup center={[0,20]} disablePanning>
              <Geographies
                geography={ "world-50m-with-population.json" }
                disableOptimization
                >
                {(geographies, projection) =>
                  geographies.map((geography, i) => (
                    <Geography
                      key={`${geography.properties.iso_a3}-${i}`}
                      cacheId={`${geography.properties.iso_a3}-${i}`}
                      geography={ geography }
                      projection={ projection }
                      onClick={ this.handleClick }
                      round
					  data-tip={geography.properties.name}
                      style={{
                        default: {
                          fill: get_fill_value(this.props.viewState, geography.properties.iso_a3 ),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",					
                        },
                        hover: {
                          fill: chroma(get_fill_value(this.props.viewState, geography.properties.iso_a3 )),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",						  
                        },
                        pressed: {
                          fill: chroma(get_fill_value(this.props.viewState, geography.properties.iso_a3 )),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        }
                      }}
                    />
                ))}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
		  <ReactTooltip />
        </div>
      
    )
  }
}

export default UpdatableChoropleth

