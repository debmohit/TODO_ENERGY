import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import ReactSpeedometer from "react-d3-speedometer"


import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import {
    PieChart, Pie, Sector,
  } from 'recharts';

import { getMonthlyStats, getDailyStats } from '../../services/mockAPI'

const VIEWS = {
    MONTHLY: 'monthly',
    DAILY: 'daily'
}




const RenderBarChart = ({data}) => (
    <BarChart
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 5, right: 30, left: 40, bottom: 5,
        }}
    >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current" fill="#8884d8" />
        <Bar dataKey="prev" fill="#82ca9d" />
      </BarChart>
)

const RenderPieChart = ({data}) => (
    <ReactSpeedometer
        value={333}
        segments={5}
        segmentColors={[
            "#bf616a",
            "#d08770",
            "#ebcb8b",
            "#a3be8c",
            "#b48ead",
        ]}
    />
)


const BarCharts = ({selectedSubMenu}) => {
    const [view, setView] = useState(VIEWS.MONTHLY)
    const [noOfMonths, setNoofMonth] = useState(6)
    const [ enType, setEnType] = useState('consumption')
    const [ data, setData ] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    useEffect(() => {
        if(view == VIEWS.MONTHLY){
            setData(getMonthlyStats(noOfMonths, enType))
        } else {
            setData(getDailyStats(enType))
        }
       
    }, [noOfMonths, enType, view])


   return (
    <div className="section project-details">
        <h4> {selectedSubMenu} {startDate} { endDate}</h4>

        <div className="graph-area">
            <div className="row">
                <div className="col energy-option">
                    <label>
                        <input name="charges" type="radio" checked={enType=='charges'} onChange={() => setEnType('charges')} />
                        <span> Charges</span>
                    </label>
                    <label>
                        <input name="consumption" type="radio" checked={enType=='consumption'} onChange={() => setEnType('consumption')} />
                        <span> Consumption</span>
                    </label>
                </div>
            </div>

            <h5>Time Period</h5>

            <div className="row time-period">
                <div className="col s4">
                    <div className="view-option-1">
                        {
                            view == VIEWS.MONTHLY ?
                            <select onChange={(e) => setNoofMonth(e.target.value)}>
                                <option value={6}> Last 6 month </option>
                                <option value={3}> Last 3 months</option>
                            </select> :
                            <>
                                <input type= "date" className="datepicker" onChange={(e) => setStartDate(e.target.value)} />
                                <input type= "date" className="datepicker" onChange={(e) => setEndDate(e.target.value)} />
                            </>
                        }
                    </div>
                </div>

                <div className="col s4">
                    <div className="view-option-2">
                        <button className={`waves-effect waves-light btn month ${view !== VIEWS.MONTHLY ? 'white' : ''}`} onClick={() => setView(VIEWS.MONTHLY)}> Monthly </button>
                        <button className={`waves-effect waves-light btn daily ${view !== VIEWS.DAILY ? 'white' : ''}`} onClick={() => setView(VIEWS.DAILY)}> Daily </button>
                    </div>
                </div>

                {/* <div className="col s4">
                    <div class="switch">
                        <label> Temprature
                            <input type="checkbox" />
                            <span class="lever"></span>
                        </label>
                    </div>
                </div> */}

            </div>

            <div  className="row">
                
                {
                    enType=='consumption' && view == VIEWS.MONTHLY ?
                    <div className="col s12 offset-s4"> <RenderPieChart data={data} /> </div> :
                    <div className="col s12"> <RenderBarChart data={data} /> </div>
                    
                }
            </div>
            
        </div>
        
    </div>
   )
}


const mapStateToProps = (state) => ({
    selectedSubMenu : state.stats.selectedSubMenu
})

export default connect(mapStateToProps, null)(BarCharts)