import React from "react"
import "./FirstPage.css"
import { Link } from 'react-router-dom';

const helloImgsrc = require("./Image/HelloIMG1.png");
const dataButtonaIirports = require("./Data/dataButtonAirports.json")
const statistic = require("./Image/statistic.png");
const description = "Наша компания специализируется на сборе сведений о планируемых и фактически выполненных авиаперевозках на территории Российской Федерации. Мы предоставляем услуги по мониторингу рейсов, анализу данных и составлению рейтинга авиакомпаний, основываясь на данных пунктуальности. Наша команда профессионалов следит за актуальными расписаниями авиаперевозок, а также поддерживает связь с компаниями для получения дополнительных и наиболее достоверных сведений. Мы обеспечиваем клиентам точные и надежные данные о перевозках воздушным транспортом для принятия обоснованных решений и оптимизации бизнес-процессов."
const planetImg = require("./Image/planet.png");
const russiaMap = require("./Image/RussiaMap.png");
const permMap = require("./Image/PermMap.png");
const endPage = require("./Image/endPages.png");
const dataContacts = require("./Data/dataContacts.json");

const calculationMethod2 ="Мы считаем, что любой рейс, прибывший в течение 15 минут после опубликованного времени прибытия, был выполнен с соблюдением требования к пунктуальности. Мы посчитали, сколько рейсов вылетели и прилетели вовремя, и выразили этот показатель в процентном отношении. Чем выше показатель, тем выше процент прибывающих вовремя рейсов. Например, оценка 8,5 означает, что 85% рейсов были выполнены вовремя."

const errMessage = "error download img";

export const FirstPage = () => {
    
    console.log(dataContacts)
    return (
        <div>
            <div className="header_section">
                <div className="Background" ></div>
                <img className="Image1" src={helloImgsrc} alt={errMessage}></img> 
                <div className="Head">
                    <div className="Hahmlet400Head">ФГУП «ЗащитаИнфоТранс»</div>
                    <div className="Jaldi400Head">МЫ РАБОТАЕМ ДЛЯ ВАС </div>
                    <div className="Hahmlet300Head">{description}</div>
                </div>
            </div>
            <div className="top_section">
                <div className="Top">
                    {
                        dataButtonaIirports.Data.map((item) => {
                            return <button className="ButtonAiroport"><img className="CompanyImg" src={require(`./Image/${item.ImageUrl}`)} alt={errMessage}></img></button>
                        })
                    }
                </div>
                <Link to="/statisticCompanyPage" className="Statistic">
                    <img src={statistic} alt={errMessage} />
                </Link>
            </div>
            <div className="PlanetBlock">
                <img  src={planetImg} className="planetBlockImg"  width="100%" alt={errMessage}></img>
                <button><img src={russiaMap} alt={errMessage} className="RussiaMap"></img></button>
                <button><span className="TextMap">Российская федерация</span></button>
                <button><img src={permMap} className="PermMap" alt={errMessage}></img></button>
                <button onClick={() => console.log("dsad")}><span className="TextMap1">Пермский край</span></button>
            </div>
            <div className="calculate_info_section">
                <div className="Jaldi400Centre">Способ расчета </div>
                <div className="Hahmlet300Centre">{calculationMethod2}</div>
            </div>
            <div className="EndPage" >
                <img className="EndImg" src={endPage} alt={errMessage} width="100%"></img>
                <div className="EndLink">
                    <div className="Contacts" >Контакты</div>
                    <div className="ContactList">
                        {
                        dataContacts.Data.map((item) => {return <div className="MapContacts">
                            <img className="LinkIcon" src={require(`./Image/${item.IconUrl}`)} alt={errMessage}></img>
                            <p className="LinkName ">{item.Name}</p>
                        </div>
                        })
                        }
                    </div>  
                </div>
            </div>
        </div>
    )
}