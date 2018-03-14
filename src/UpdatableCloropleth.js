
import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import chroma from "chroma-js"
import { scaleLinear, scaleThreshold } from "d3-scale"
import { range } from "d3-array"
import { 
  schemeBlues, 
  schemeGreens, 
  schemeSpectral,
  schemeReds, 
  schemeYlOrRd 
} from "d3-scale-chromatic"
import { map } from "d3-collection"
import ReactTooltip from "react-tooltip"


const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}



//const mpi_data = parse('deprivation_contribution_by_country.csv')

const mpi_data = { data: [
	{'iso_a3': 'KAZ', 'properties': {'mpi': 0.000, 'ed_contribution': 1.4, 'health_contribution': 97.2,'livingstandard_contribution': 1.4}}, 
	{'iso_a3': 'SRB', 'properties': {'mpi': 0.001, 'ed_contribution': 48.8, 'health_contribution': 10.2,'livingstandard_contribution': 41.2}}
  ]
}

const VIEW_STATE_MPI = 'VIEW_STATE_MPI'

const VIEW_STATE_HEALTH = 'VIEW_STATE_HEALTH'

const VIEW_STATE_EDUCATION = 'VIEW_STATE_EDUCATION'

const VIEW_STATE_LIVINGSTANDARD = 'VIEW_STATE_LIVINGSTANDARD'

const mpi_values = map({ 'KAZ': 0.000, 'SRB': 0.001,'NER': 0.605})

const health_contribution = map({ 'KAZ': 97.2, 'SRB': 10.2,'NER': 27.7})

const education_contribution = map({ 'KAZ': 22, 'SRB': 44,'NER': 66})

const livingstandard_contribution = map({ 'KAZ': 5, 'SRB': 25,'NER': 47})


const mpiScale = scaleLinear()
  .domain([0, 1])
  .range(schemeSpectral[3])
  
const healthScale = scaleLinear()
  .domain([0, 100])
  .range(schemeReds[3])
  
const educationScale =  scaleLinear()
  .domain([0, 100])
  .range(schemeGreens[3])
  
const livingStandardScale =  scaleLinear()
  .domain([0, 100])
  .range(schemeYlOrRd[3])  
  
  
const color_scales = map({ VIEW_STATE_MPI: mpiScale, 
							VIEW_STATE_HEALTH: healthScale,
							VIEW_STATE_LIVINGSTANDARD: livingStandardScale,
							VIEW_STATE_EDUCATION: educationScale})
  
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
		default: //VIEW_STATE_MPI
			if (mpi_values.get(countryCode) === undefined)
				return "#f7fbff";
			return mpiScale(mpi_values.get(countryCode))
	}
  }

  
class UpdatableChoropleth extends Component {
  constructor() {
    super()

    this.state = {      
	  viewState: 'VIEW_STATE_MPI' //can be 
    }

    this.switchToPopulation = this.switchToPopulation.bind(this)
    this.switchToRegions = this.switchToRegions.bind(this)
	this.switchToMpi = this.switchToMpi.bind(this)
	this.switchToHealth = this.switchToHealth.bind(this)
	this.switchToEducation = this.switchToEducation.bind(this)
	this.switchToLivingStandard = this.switchToLivingStandard.bind(this)
	//this.switchToView = this.switchToView.bind(this)
	
  }
  switchToPopulation() {
    this.setState({ populationData: true })
  }

  switchToRegions() {
    this.setState({ populationData: false })
  }
  
   switchToMpi() {
	
    this.setState({ viewState: VIEW_STATE_MPI })
  }
  
  switchToHealth() {
	
    this.setState({ viewState: VIEW_STATE_HEALTH })
  }
  
 
  switchToLivingStandard() {
	
    this.setState({ viewState: VIEW_STATE_LIVINGSTANDARD })
  }
  
  switchToEducation() {
	
    this.setState({ viewState: VIEW_STATE_EDUCATION })
  }
  
  
 // switchToView() {
//	console.log('swichToView' + input)
 //   this.setState({ viewState: input })
  //}
  

  
  render() {
    return (
      <div>
        <div>         
		   <button id='VIEW_STATE_MPI' onClick={ this.switchToMpi } >
            { "MPI Score" }
          </button>
		   <button id='VIEW_STATE_HEALTH' onClick={ this.switchToHealth } >
            { "Health Contribution" }
          </button>
		    <button id='VIEW_STATE_EDUCATION' onClick={ this.switchToEducation } >
            { "Education Contribution" }
          </button>
		   <button id='VIEW_STATE_LIVINGSTANDARD' onClick={ this.switchToLivingStandard } >
            { "Living Standard Contribution" }
          </button>
		
        </div>
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
                          fill: get_fill_value(this.state.viewState, geography.properties.iso_a3 ),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",					
                        },
                        hover: {
                          fill: chroma(get_fill_value(this.state.viewState, geography.properties.iso_a3 )),
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
						  tooltip: "{`${geography.properties.iso_a3}-${i}`}"
                        },
                        pressed: {
                          fill: chroma(get_fill_value(this.state.viewState, geography.properties.iso_a3 )),
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
      </div>
    )
  }
}

export default UpdatableChoropleth

