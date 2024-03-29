import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Table, DatePicker } from 'antd';
import { DownOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {requestToApi} from "../../Api/Get"
import "./StatisticCompanyPage.css"
import SelectImpl from "./Select"


const headerStatisticImg = require("./Image/StatisticHeader.png");
const homeImg = require("./Image/logoVIT.png");
const dataFiltersName = require("./Data/dataFiltersName.json")


const errMessage = "error download img";

const columns = [
    {
    title: "Авивкомпания",
    dataIndex: "companyName",
    key: "companyName"
    },
    {
    title: "Количество рейсов",
    dataIndex: "flightCount",
    key: "flightCount"
    },
    {
    title: "Пункктуальность",
    dataIndex: "rating",
    key: "rating",
    
    render: (_, entity) => {
    return <div>{((entity.flightCount === 0) ? "нет полётов" : (Math.round((entity.ratingDeparture +entity.ratingArrival)/2) / 10))}</div>
    }}
    ]

const GridDataOption = {
    namedFilters:[],
    rowCount:10,
    page:1,
    orderBy:'companyName'
    }

const menu = (
    <Menu>
      <Menu.Item key="1">Опция 1</Menu.Item>
      <Menu.Item key="2">Опция 2</Menu.Item>
      <Menu.Item key="3">Опция 3</Menu.Item>
    </Menu>
);

const url = "/public/getstatistic";

export const StatisticCompanyPage = () => {

    const [citiesDeparture, SetCitiesDeparture] = useState([]);
    const [citiesArrival, SetCitiesArrival] = useState([]);
    const [airportsDeparture, SetAirportsDeparture] = useState([]);
    const [airportsArrival, SetAirportsArrival] = useState([]);

    const [statistic, SetStatistic] = useState();
    const [isLoading, SetisLoading] = useState(true);
    const { RangePicker } = DatePicker;
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


    const [inputValue, setInputValue] = useState(""); // Состояние для хранения значения input

    const handleChange = (event) => {
        setInputValue(event.target.value); // Обновляем значение input при изменении
    };

    useEffect(() => {
        if(isLoading) {
            requestToApi.post(url, GridDataOption)
            .then(data => {
            SetStatistic(data.result);
            pagination.total = data.allRowCount;
            pagination.current = data.page;
            pagination.pageSize = data.rowCount;
            })
            .finally(() => SetisLoading(false));
            }
    }, [isLoading])

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
            })}/>,

            <span style={{"marginLeft": "6px", "color": "white"}}>
                дата вылета</span>,
                <RangePicker 
            style = {{"margin-left": "0.5em", "width":"340px"}}
            showTime={true}
            onCalendarChange={(value) => {
                if(value !== undefined && value[0] !== null && value[1] !== null){
                    let existIndex = GridDataOption.namedFilters.findIndex(nf => nf.name === "dateRangeDeparture");
                    if(existIndex !== -1){
                        GridDataOption.namedFilters.splice(existIndex, 1, {name:"dateRangeDeparture", value: [value[0].valueOf(), value[1].valueOf()]});
                    }else{
                        GridDataOption.namedFilters.push({name:"dateRangeDeparture", value: [value[0].valueOf(), value[1].valueOf()]});
                    }
                }else{
                    GridDataOption.namedFilters = GridDataOption.namedFilters.filter(nf => nf.name !== "dateRangeDeparture")
                }
                reload()
            }}/>,

            <span style={{"marginLeft": "6px", "color": "white"}}>
                дата прилёта</span>,
                <RangePicker 
            style = {{"margin-left": "0.5em", "width":"340px"}}
            showTime={true}
            onCalendarChange={(value) => {
                if(value !== undefined && value[0] !== null && value[1] !== null){
                    let existIndex = GridDataOption.namedFilters.findIndex(nf => nf.name === "dateRangeArrival");
                    if(existIndex !== -1){
                        GridDataOption.namedFilters.splice(existIndex, 1, {name:"dateRangeArrival", value: [value[0].valueOf(), value[1].valueOf()]});
                    }else{
                        GridDataOption.namedFilters.push({name:"dateRangeArrival", value: [value[0].valueOf(), value[1].valueOf()]});
                    }
                }else{
                    GridDataOption.namedFilters = GridDataOption.namedFilters.filter(nf => nf.name !== "dateRangeArrival")
                }
                reload()
            }}/>

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
                <Table dataSource={statistic} columns={columns} pagination={pagination} loading={isLoading} rowKey={(record) => record.companyId}/>
            </div>
        </div>
    )
}

export default StatisticCompanyPage