
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


const VIEW_STATE_MPI = 'VIEW_STATE_MPI'

const VIEW_STATE_HEALTH = 'VIEW_STATE_HEALTH'

const VIEW_STATE_EDUCATION = 'VIEW_STATE_EDUCATION'

const VIEW_STATE_LIVINGSTANDARD = 'VIEW_STATE_LIVINGSTANDARD'

const mpi_values = map({ 'KAZ':0.000220284302486107,
	'SRB':0.000957292621023953,
	'TKM':0.00113580515608192,
	'ARM':0.0011552,
	'MNE':0.00126327527686954,
	'KGZ':0.00187353254295886,
	'BIH':0.00191713112872094,
	'MKD':0.00240706978365779,
	'MDA':0.00274540460668504,
	'BRB':0.00304509117268026,
	'THA':0.00322704762220383,
	'LCA':0.0033675110898912,
	'PSE':0.00412293337285519,
	'UKR':0.00423584599047899,
	'TUN':0.00446908408775926,
	'MEX':0.004825952462852,
	'ALB':0.00514652533456683,
	'LBY':0.0055855056270957,
	'DZA':0.00567355751991272,
	'JOR':0.00593148730695248,
	'JAM':0.00698073906823993,
	'UZB':0.00841109734028578,
	'GUY':0.0130748711526394,
	'ECU':0.0133945317938924,
	'EGY':0.0135669466108084,
	'SYR':0.016401931643486,
	'CHN':0.0166689269244671,
	'BLZ':0.0182823613286018,
	'MDV':0.0183552373200655,
	'TTO':0.0197401605546474,
	'AZE':0.0209599547088146,
	'BRA':0.0214918162673712,
	'COL':0.0220031086355448,
	'SUR':0.0239935088902712,
	'SLV':0.0261823572218418,
	'VNM':0.029003432020545,
	'DOM':0.03396375477314,
	'ZAF':0.0359307378530502,
	'MNG':0.0406441278755665,
	'PER':0.0430951975286007,
	'IRQ':0.0447718985378742,
	'PHL':0.0521277077496052,
	'TJK':0.0538514144718647,
	'SWZ':0.0663268491625786,
	'IDN':0.0663715451955795,
	'MAR':0.0673939138650894,
	'GAB':0.070148691534996,
	'NIC':0.0724009349942207,
	'HND':0.0724256709218025,
	'STP':0.0814527124166489,
	'BOL':0.0893447920680046,
	'GTM':0.113074153661728,
	'BTN':0.11927829682827,
	'VUT':0.128639906644821,
	'MMR':0.134167015552521,
	'DJI':0.138537973165512,
	'LSO':0.140194267034531,
	'KHM':0.146370857954025,
	'ZWE':0.151992812752724,
	'GHA':0.155681595206261,
	'COM':0.172738939523697,
	'LAO':0.173780992627144,
	'NPL':0.17487,
	'COG':0.181340128183365,
	'KEN':0.187418192625046,
	'IND':0.191099092364311,
	'NAM':0.193113133311272,
	'BGD':0.195758670568466,
	'PAK':0.230319485068321,
	'YEM':0.235675990581512,
	'CMR':0.247799515724182,
	'HTI':0.248289927840233,
	'MWI':0.250630021095276,
	'TGO':0.252278000116348,
	'RWA':0.25867360830307,
	'AGO':0.2591769,
	'ZMB':0.281496226787567,
	'TZA':0.284275144338608,
	'MRT':0.28492671251297,
	'SDN':0.286563962697983,
	'AFG':0.295268654823303,
	'SEN':0.2956446,
	'NGA':0.302670866250992,
	'BEN':0.306662499904633,
	'CIV':0.310152143239975,
	'GMB':0.322581380605698,
	'MDG':0.356571167707443,
	'TLS':0.360227078199387,
	'UGA':0.366949677467346,
	'GNB':0.370754301548004,
	'LBR':0.374256044626236,
	'MOZ':0.38887831568718,
	'COD':0.400851190090179,
	'CAF':0.430190563201904,
	'BDI':0.453692436218262,
	'MLI':0.457107096910477,
	'GIN':0.458989769220352,
	'SLE':0.464481204748154,
	'ETH':0.5057949,
	'SOM':0.513741254806519,
	'BFA':0.535162150859833,
	'TCD':0.552102863788605,
	'SSD':0.557405412197113,
	'NER':0.604626595973969})

const health_contribution = map({ 
	'KAZ':97.220588684082,
	'SRB':10.0224504470825,
	'TKM':73.0006408691406,
	'ARM':59.56143,
	'MNE':12.9264192581177,
	'KGZ':50.6168823242188,
	'BIH':55.8263549804688,
	'MKD':43.094425201416,
	'MDA':21.4830837249756,
	'BRB':97.411994934082,
	'THA':39.0105438232422,
	'LCA':81.7897872924805,
	'PSE':49.8041496276856,
	'UKR':94.1915130615234,
	'TUN':25.7055110931397,
	'MEX':35.1790618896484,
	'ALB':44.9477615356445,
	'LBY':48.1840553283691,
	'DZA':32.6933403015137,
	'JOR':73.7578964233398,
	'JAM':42.7639198303223,
	'UZB':55.6889038085938,
	'GUY':36.5082664489746,
	'ECU':47.8080673217773,
	'EGY':39.6386795043945,
	'SYR':33.5212211608887,
	'CHN':45.4368934631348,
	'BLZ':31.1848220825195,
	'MDV':81.1082382202148,
	'TTO':94.2850952148438,
	'AZE':49.3554344177246,
	'BRA':68.4516983032227,
	'COL':33.5038108825684,
	'SUR':33.8483581542969,
	'SLV':19.4472503662109,
	'VNM':58.1222610473633,
	'DOM':72.1334686279297,
	'ZAF':56.9518623352051,
	'MNG':24.9815406799316,
	'PER':23.961612701416,
	'IRQ':38.388053894043,
	'PHL':56.3315200805664,
	'TJK':52.2977180480957,
	'SWZ':33.5112571716309,
	'IDN':60.7495079040527,
	'MAR':18.5358810424805,
	'GAB':45.0248680114746,
	'NIC':13.8167915344238,
	'HND':24.1983375549316,
	'STP':25.9055023193359,
	'BOL':27.5444869995117,
	'GTM':27.2415752410889,
	'BTN':21.247465133667,
	'VUT':17.2989273071289,
	'MMR':31.6091384887695,
	'DJI':24.5682334899902,
	'LSO':30.8352642059326,
	'KHM':29.8243083953857,
	'ZWE':33.3407707214356,
	'GHA':35.2945213317871,
	'COM':24.9961681365967,
	'LAO':30.3504772186279,
	'NPL':43.73066,
	'COG':33.4361763000488,
	'KEN':32.9884719848633,
	'IND':44.3818435668945,
	'NAM':38.6774673461914,
	'BGD':32.4992485046387,
	'PAK':37.2893676757813,
	'YEM':36.7100219726563,
	'CMR':30.7216529846191,
	'HTI':28.4990539550781,
	'MWI':28.3309993743897,
	'TGO':32.7229309082031,
	'RWA':24.8820095062256,
	'AGO':21.31449,
	'ZMB':29.7022228240967,
	'TZA':24.9305725097656,
	'MRT':21.4245147705078,
	'SDN':23.5302028656006,
	'AFG':32.1014251708984,
	'SEN':27.26601,
	'NGA':33.0938949584961,
	'BEN':13.377555847168,
	'CIV':29.6491985321045,
	'GMB':37.3949851989746,
	'MDG':16.6509571075439,
	'TLS':30.9675388336182,
	'UGA':34.0665283203125,
	'GNB':26.5904598236084,
	'LBR':32.0732765197754,
	'MOZ':20.6672191619873,
	'COD':31.6374244689941,
	'CAF':24.0816345214844,
	'BDI':28.8758163452148,
	'MLI':24.9334621429443,
	'GIN':27.9047527313232,
	'SLE':31.4643630981445,
	'ETH':26.1265,
	'SOM':18.6290664672852,
	'BFA':27.8907146453857,
	'TCD':23.8770847320557,
	'SSD':12.7037439346313,
	'NER':27.7329406738281})

const education_contribution = map({ 
	'KAZ':1.38970839977264,
	'SRB':48.7562294006348,
	'TKM':20.6532287597656,
	'ARM':18.15699,
	'MNE':57.4214820861816,
	'KGZ':23.4784660339355,
	'BIH':26.6642398834229,
	'MKD':28.1819229125977,
	'MDA':31.1778602600098,
	'BRB':0,
	'THA':40.9797973632813,
	'LCA':6.19418525695801,
	'PSE':36.1326560974121,
	'UKR':1.39555490016937,
	'TUN':48.1334228515625,
	'MEX':31.4291172027588,
	'ALB':32.0154266357422,
	'LBY':44.0215225219727,
	'DZA':45.9798202514648,
	'JOR':23.8497982025147,
	'JAM':15.6244192123413,
	'UZB':23.1822128295898,
	'GUY':18.5253524780273,
	'ECU':21.4851341247559,
	'EGY':52.786247253418,
	'SYR':55.4058723449707,
	'CHN':29.1985511779785,
	'BLZ':40.9957695007324,
	'MDV':13.6172742843628,
	'TTO':1.29474365711212,
	'AZE':24.4057426452637,
	'BRA':10.8998403549194,
	'COL':31.7893028259277,
	'SUR':31.2440299987793,
	'SLV':39.174617767334,
	'VNM':17.6193294525147,
	'DOM':12.5170965194702,
	'ZAF':5.30280780792236,
	'MNG':17.9890956878662,
	'PER':20.5896892547607,
	'IRQ':51.2845649719238,
	'PHL':16.2860450744629,
	'TJK':21.2535972595215,
	'SWZ':16.078067779541,
	'IDN':12.5606079101563,
	'MAR':47.3005752563477,
	'GAB':15.3701467514038,
	'NIC':38.3547973632813,
	'HND':31.8505859375,
	'STP':30.59912109375,
	'BOL':19.8116416931152,
	'GTM':33.9574394226074,
	'BTN':40.3644523620606,
	'VUT':29.6842842102051,
	'MMR':25.6303405761719,
	'DJI':38.3013305664063,
	'LSO':13.8859434127808,
	'KHM':27.2541427612305,
	'ZWE':9.45032787322998,
	'GHA':24.3179550170898,
	'COM':28.7192821502686,
	'LAO':31.383472442627,
	'NPL':18.616092,
	'COG':9.88266181945801,
	'KEN':9.76469707489014,
	'IND':13.2208881378174,
	'NAM':11.4889907836914,
	'BGD':21.1206378936768,
	'PAK':31.4542465209961,
	'YEM':28.0252075195313,
	'CMR':23.5832252502441,
	'HTI':19.6886157989502,
	'MWI':16.6591339111328,
	'TGO':22.0223579406738,
	'RWA':21.0301990509033,
	'AGO':30.54187,
	'ZMB':18.4688320159912,
	'TZA':20.7232322692871,
	'MRT':32.0499000549316,
	'SDN':26.7087516784668,
	'AFG':36.2615165710449,
	'SEN':41.32109,
	'NGA':28.1677761077881,
	'BEN':41.6537017822266,
	'CIV':34.4832382202148,
	'GMB':28.9091110229492,
	'MDG':34.2759628295898,
	'TLS':21.2879085540772,
	'UGA':15.5826416015625,
	'GNB':30.8354072570801,
	'LBR':21.5393714904785,
	'MOZ':29.1011581420898,
	'COD':15.0449905395508,
	'CAF':24.1004104614258,
	'BDI':23.0762767791748,
	'MLI':36.1278190612793,
	'GIN':34.0183219909668,
	'SLE':23.0844650268555,
	'ETH':25.37706,
	'SOM':34.1595344543457,
	'BFA':36.1884727478027,
	'TCD':31.4306621551514,
	'SSD':40.0877838134766,
	'NER':32.1463584899902})

const livingstandard_contribution = map({ 'KAZ':1.38970851898193,
	'SRB':41.2213249206543,
	'TKM':6.34613466262817,
	'ARM':22.281574,
	'MNE':29.6521034240723,
	'KGZ':25.9046516418457,
	'BIH':17.509407043457,
	'MKD':28.7236518859863,
	'MDA':47.3390655517578,
	'BRB':2.58800339698792,
	'THA':20.0096607208252,
	'LCA':12.0160236358643,
	'PSE':14.0632038116455,
	'UKR':4.41293525695801,
	'TUN':26.1610717773438,
	'MEX':33.3918228149414,
	'ALB':23.0368194580078,
	'LBY':7.7944278717041,
	'DZA':21.3268413543701,
	'JOR':2.39230751991272,
	'JAM':41.6116638183594,
	'UZB':21.128885269165,
	'GUY':44.9663887023926,
	'ECU':30.7068042755127,
	'EGY':7.57506847381592,
	'SYR':11.0729112625122,
	'CHN':25.3645515441895,
	'BLZ':27.8194122314453,
	'MDV':5.27449035644531,
	'TTO':4.42016124725342,
	'AZE':26.2388286590576,
	'BRA':20.6484680175781,
	'COL':34.7068901062012,
	'SUR':34.9076080322266,
	'SLV':41.3781394958496,
	'VNM':24.2584075927734,
	'DOM':15.3494329452515,
	'ZAF':37.7453346252441,
	'MNG':57.0293731689453,
	'PER':55.4487037658691,
	'IRQ':10.3273820877075,
	'PHL':27.3824329376221,
	'TJK':26.4486885070801,
	'SWZ':50.4106826782227,
	'IDN':26.6898784637451,
	'MAR':34.1635475158691,
	'GAB':39.6049919128418,
	'NIC':47.8284149169922,
	'HND':43.9510765075684,
	'STP':43.4953804016113,
	'BOL':52.6438789367676,
	'GTM':38.8009910583496,
	'BTN':38.3880844116211,
	'VUT':53.0167922973633,
	'MMR':42.7605247497559,
	'DJI':37.1304321289063,
	'LSO':55.2788009643555,
	'KHM':42.9215545654297,
	'ZWE':57.208911895752,
	'GHA':40.3875236511231,
	'COM':46.2845573425293,
	'LAO':38.2660522460938,
	'NPL':37.653253,
	'COG':56.6811676025391,
	'KEN':57.2468338012695,
	'IND':42.397274017334,
	'NAM':49.833553314209,
	'BGD':46.3801155090332,
	'PAK':31.2563896179199,
	'YEM':35.2647666931152,
	'CMR':45.6951217651367,
	'HTI':51.8123321533203,
	'MWI':55.0098648071289,
	'TGO':45.2547111511231,
	'RWA':54.0877990722656,
	'AGO':48.143634,
	'ZMB':51.8289489746094,
	'TZA':54.3461990356445,
	'MRT':46.5255851745606,
	'SDN':49.761043548584,
	'AFG':31.6370544433594,
	'SEN':31.412903,
	'NGA':38.7383308410645,
	'BEN':44.9687423706055,
	'CIV':35.867561340332,
	'GMB':33.6959075927734,
	'MDG':49.0730819702148,
	'TLS':47.7445526123047,
	'UGA':50.3508338928223,
	'GNB':42.5741310119629,
	'LBR':46.3873558044434,
	'MOZ':50.2316246032715,
	'COD':53.3175888061523,
	'CAF':51.8179550170898,
	'BDI':48.0479049682617,
	'MLI':38.9387168884277,
	'GIN':38.0769233703613,
	'SLE':45.451171875,
	'ETH':48.496443,
	'SOM':47.2113952636719,
	'BFA':35.9208068847656,
	'TCD':44.6922492980957,
	'SSD':47.2084732055664,
	'NER':40.1206970214844})


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

