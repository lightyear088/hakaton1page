import React, { useEffect, useState } from "react";
import { Table, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import {requestToApi} from "../../Api/Get"
import "./HistoryPage.css"
import SelectImpl from "../StatisticCompanyPage/Select"
import {useParams} from "react-router-dom";

const headerStatisticImg = require("../StatisticCompanyPage/Image/StatisticHeader.png");
const homeImg = require("../StatisticCompanyPage/Image/logoVIT.png");

const errMessage = "error download img";

const columns = [
    {
    title: "Авивкомпания",
    dataIndex: "companyName",
    key: "companyName"
    },
    {
    title: "Город вылета",
    dataIndex: "cityDepartureName",
    key: "cityDepartureName"
    },
    {
    title: "Аэропорт вылета",
    dataIndex: "airportDepartureName",
    key: "airportDepartureName",
    }, 
    {
    title: "Город прилёта",
    dataIndex: "cityArrivalName",
    key: "cityArrivalName",
    }, 
    {
    title: "Аэропорт прилёта",
    dataIndex: "airportArrivalName",
    key: "airportArrivalName",
    }, 
    {
    title: "Плановый полёт",
    dataIndex: "plan",
    key: "plan",
    render: (_, entity) => {
    return new Date(entity.flightPlanDeparture).toLocaleString() + " - " + new Date(entity.flightPlanArrival).toLocaleString()
    }},
    {
    title: "Фактический полёт",
    dataIndex: "fact",
    key: "fact",
    render: (_, entity) => {
    return new Date(entity.flightFactDeparture).toLocaleString() + " - " + new Date(entity.flightFactArrival).toLocaleString()
    },}, 
    
    ]

const GridDataOption = {
    namedFilters:[],
    rowCount:10,
    page:1,
    orderBy:'companyName'
    }

const url = "/v1/apps/flight/getlist";

export const HistoryPage = () => {

    const [citiesDeparture, SetCitiesDeparture] = useState([]);
    const [citiesArrival, SetCitiesArrival] = useState([]);
    const [airportsDeparture, SetAirportsDeparture] = useState([]);
    const [airportsArrival, SetAirportsArrival] = useState([]);
    const [companies, SetCompanies] = useState([]);
    const [flights, SetFlights] = useState([]);

    const [isLoading, SetisLoading] = useState(true);

    const [pagination] = useState({
        current: 2,
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total)=>{
        return ("Всего " + total)
        },
        onChange: (page, pageSize) => {
        GridDataOption.page = page;
        GridDataOption.rowCount = pageSize;
        
        SetisLoading(true);
        }
        })

    const {id} = useParams()


    useEffect(() => {
        GridDataOption.namedFilters = []
        GridDataOption.namedFilters.push({name: "companyId", value: parseInt(id)})
        if(isLoading) {
            requestToApi.post(url, GridDataOption)
            .then(data => {
            SetFlights(data.result);
            pagination.total = data.allRowCount;
            pagination.current = data.page;
            pagination.pageSize = data.rowCount;
            })
            .finally(() => SetisLoading(false));
            }
    }, [id, isLoading, pagination])

    let filters = [
        <SelectImpl 
            placeholder={"Город вылета"}
            className={"filter"}
            key={"cityid"}
            onClick={() => {

            requestToApi.post("/v1/apps/city/getlist", {
                namedFilters:[],
                rowCount:100,
                page:1,
                orderBy:'cityName'
            })
                .then((data) => {
                    SetCitiesDeparture(data.result)
                })
                
            }}
            onChange={(value) => {
                if(value !== undefined){
                    let existIndex = GridDataOption.namedFilters.findIndex(nf => nf.name === "cityDepartureId");
                    if(existIndex !== -1){
                        GridDataOption.namedFilters.splice(existIndex, 1, {name:"cityDepartureId", value: value});
                    }else{
                        GridDataOption.namedFilters.push({name:"cityDepartureId", value: value});
                    }
                }else{
                    GridDataOption.namedFilters = GridDataOption.namedFilters.filter(nf => nf.name !== "cityDepartureId")
                }
                reload()
            }}
            options={citiesDeparture.map((city) => {
                return {
                    label: city.cityName,
                    value: city.cityId
                }
            })}/>,

            <SelectImpl 
            placeholder={"Город прилёта"}
            className={"filter"}
            key={"cityidarrival"}
            onClick={() => {

            requestToApi.post("/v1/apps/city/getlist", {
                namedFilters:[],
                rowCount:100,
                page:1,
                orderBy:'cityName'
            })
                .then((data) => {
                    SetCitiesArrival(data.result)
                })
                
            }}
            onChange={(value) => {
                if(value !== undefined){
                    let existIndex = GridDataOption.namedFilters.findIndex(nf => nf.name === "citArrivalId");
                    if(existIndex !== -1){
                        GridDataOption.namedFilters.splice(existIndex, 1, {name:"citArrivalId", value: value});
                    }else{
                        GridDataOption.namedFilters.push({name:"citArrivalId", value: value});
                    }
                }else{
                    GridDataOption.namedFilters = GridDataOption.namedFilters.filter(nf => nf.name !== "citArrivalId")
                }
                reload()
            }}
            options={citiesArrival.map((city) => {
                return {
                    label: city.cityName,
                    value: city.cityId
                }
            })}/>,

            <SelectImpl 
            placeholder={"аэропорт отлёта"}
            className={"filter"}
            key={"AirCompanyDeparture"}
            onClick={() => {

            requestToApi.post("/v1/apps/airport/getlist", {
                namedFilters:[],
                rowCount:100,
                page:1,
                orderBy:'AirportName'
            })
                .then((data) => {
                    SetAirportsDeparture(data.result)
                })
                
            }}
            onChange={(value) => {
                if(value !== undefined){
                    let existIndex = GridDataOption.namedFilters.findIndex(nf => nf.name === "airportDepartureId");
                    if(existIndex !== -1){
                        GridDataOption.namedFilters.splice(existIndex, 1, {name:"airportDepartureId", value: value});
                    }else{
                        GridDataOption.namedFilters.push({name:"airportDepartureId", value: value});
                    }
                }else{
                    GridDataOption.namedFilters = GridDataOption.namedFilters.filter(nf => nf.name !== "airportDepartureId")
                }
                reload()
            }}
            options={airportsDeparture.map((airport) => {
                return {
                    label: airport.airportName,
                    value: airport.airportId
                }
            })}/>,

            <SelectImpl 
            placeholder={"аэропорт прилёта"}
            className={"filter"}
            key={"AirCompanyArrival"}
            onClick={() => {

            requestToApi.post("/v1/apps/airport/getlist", {
                namedFilters:[],
                rowCount:100,
                page:1,
                orderBy:'AirportName'
            })
                .then((data) => {
                    SetAirportsArrival(data.result)
                })
                
            }}
            onChange={(value) => {
                if(value !== undefined){
                    let existIndex = GridDataOption.namedFilters.findIndex(nf => nf.name === "cityArrivalId");
                    if(existIndex !== -1){
                        GridDataOption.namedFilters.splice(existIndex, 1, {name:"cityArrivalId", value: value});
                    }else{
                        GridDataOption.namedFilters.push({name:"cityArrivalId", value: value});
                    }
                }else{
                    GridDataOption.namedFilters = GridDataOption.namedFilters.filter(nf => nf.name !== "cityArrivalId")
                }
                reload()
            }}
            options={airportsArrival.map((airport) => {
                return {
                    label: airport.airportName,
                    value: airport.airportId
                }
            })}/>

        ]

        
            function reload(){
                SetisLoading(true)
            }

    return(
        <div>
            <div className="headerStatistic">
                <div className="BackgroundImg" ></div>
                <img className="headerStatisticImg" src={headerStatisticImg} alt={errMessage} width="100%"></img>
                <div className="head">
                <Link to="/" className="homeButton">
                    <img src={homeImg} alt={errMessage} width={"180px"} style={{"marginLeft": "50px", "marginTop": "10px"}}/>
                </Link>
                </div>
            </div>
            <div className="filters">
                {/* <p className="blok_name"></p> */}
                <div className="filterBlock">
                {filters}
                </div>        
            </div>
            
            <div className="statisticTable">
                <Table dataSource={flights} columns={columns} pagination={pagination} loading={isLoading} rowKey={(record) => record.flightId}/>
            </div>
        </div>
    )
}

export default HistoryPage