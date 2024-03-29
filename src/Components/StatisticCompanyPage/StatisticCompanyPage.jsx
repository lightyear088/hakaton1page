import React, { useState } from "react";
import { Dropdown, Menu, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./StatisticCompanyPage.css"


const headerStatisticImg = require("./Image/StatisticHeader.png");
const homeImg = require("./Image/homeImg.png");
const dataFiltersName = require("./Data/dataFiltersName.json")
const columns = require("./Data/dataColumnNameInTable.json")
const dataSource = require("./Data/dataSourceTest.json")

const errMessage = "error download img";

const menu = (
    <Menu>
      <Menu.Item key="1">Опция 1</Menu.Item>
      <Menu.Item key="2">Опция 2</Menu.Item>
      <Menu.Item key="3">Опция 3</Menu.Item>
    </Menu>
);

export const StatisticCompanyPage = () => {

    const [inputValue, setInputValue] = useState(""); // Состояние для хранения значения input

    const handleChange = (event) => {
        setInputValue(event.target.value); // Обновляем значение input при изменении
    };

    return(
        <div>
            <div className="headerStatistic">
                <div className="BackgroundImg" ></div>
                <img className="headerStatisticImg" src={headerStatisticImg} alt={errMessage} width="100%"></img>
                <div className="head">
                    <div className="Hahmlet400Head">ФГУП «ЗащитаИнфоТранс»</div>
                </div>
            </div>
            <div className="filters">
                <p className="blok_name">Фильтры:</p>
                <div className="filterBlock">
                    {dataFiltersName.Data.map((item) => {
                        console.log(item.Type)
                        if(item.Type === "Combobox"){
                            return(
                                <Dropdown overlay={menu}>
                                    <div>
                                        {item.Name} <DownOutlined />
                                    </div>
                                </Dropdown>
                            ) 
                        }
                        else
                        {
                            return(
                                <div >
                                    <input className="search" type="text" value={inputValue} onChange={handleChange} placeholder={item.Name} />
                                </div>
                            )
                        }
                    })}
                </div>        
            </div>
            <div className="statisticTable">
                <Table dataSource={dataSource.Data} columns={columns.Data} pagination={2}/>
            </div>
            <div className="home">
                <Link to="/" className="homeButton">
                    <img src={homeImg} alt={errMessage} />
                </Link>
            </div>
        </div>
    )
}

export default StatisticCompanyPage