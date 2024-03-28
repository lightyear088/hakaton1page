import React from "react"
import "./FirstPage.css"



const helloImgsrc = require("./Image/HelloIMG1.png");
const dataButtonaIirports = require("./Data/dataButtonAirports.json")
const statistic = require("./Image/statistic.png");
const description = "Наша компания специализируется на сборе сведений о планируемых и фактически выполненных авиаперевозках на территории Российской Федерации. Мы предоставляем услуги по мониторингу рейсов, анализу данных и составлению рейтинга авиакомпаний, основываясь на данных пунктуальности. Наша команда профессионалов следит за актуальными расписаниями авиаперевозок, а также поддерживает связь с компаниями для получения дополнительных и наиболее достоверных сведений. Мы обеспечиваем клиентам точные и надежные данные о перевозках воздушным транспортом для принятия обоснованных решений и оптимизации бизнес-процессов."
const planetImg = require("./Image/planet.png");
const russiaMap = require("./Image/RussiaMap.png");
const permMap = require("./Image/PermMap.png");
const endPage = require("./Image/endPages.png");
const dataContacts = require("./Data/dataContacts.json");

const calculationMethod ="НАША КОМПАНИЯ НАША КОМПАНИЯ НАША КОМПАНИЯ НАША КОМПАНИЯ НАША КОМПАНИЯ НАША КОМПАНИЯНАША КОМПАНИЯ НАША КОМПАНИЯНАША формула КОМПАНИЯ НАША КОМПАНИЯ НАША КОМПАНИЯ НАША КОМПАНИЯ НАША КОМПАНИЯ НАША КОМПАНИЯНАША КОМПАНИЯ НАША КОМПАНИЯ"

const errMessage = "error download img";

export const FirstPage = () => {
    
    console.log(dataContacts)
    return (
        <div>
            <div className="Background" ></div>
            <img className="Image1" src={helloImgsrc} alt={errMessage}></img> 
            <div className="Head">
                <div className="Hahmlet400Head">ФГУП «ЗащитаИнфоТранс»</div>
                <div className="Jaldi400Head">МЫ РАБОТАЕМ ДЛЯ ВАС </div>
                <div className="Hahmlet300Head">{description}</div>
            </div>
            <div className="Top">
                {
                    dataButtonaIirports.Data.map((item) => {
                        return <button className="ButtonAiroport"><img className="CompanyImg" src={require(`./Image/${item.ImageUrl}`)} alt={errMessage}></img></button>
                    })
                }
            </div>
            <button className="Statistic"><img src={statistic} alt={errMessage} ></img></button>
            <div className="PlanetBlock">
                <img  src={planetImg}  width="100%" alt={errMessage}></img>
                <button><img src={russiaMap} alt={errMessage} className="RussiaMap"></img></button>
                <button><span className="TextMap">Российская федерация</span></button>
                <button><img src={permMap} className="PermMap" alt={errMessage}></img></button>
                <button onClick={() => console.log("dsad")}><span className="TextMap1">Пермский край</span></button>
            </div>
            <div className="Jaldi400Centre">Способ расчета </div>
            <div className="Hahmlet300Centre">{calculationMethod}</div>
            <div className="EndPage" >
                <img className="EndImg" src={endPage} alt={errMessage} width="100%"></img>
                <div className="EndLink">
                    <div className="Contacts" >Контакты</div>
                    {
                        dataContacts.Data.map((item) => {return <span className="MapContacts">
                            <img className="LinkIcon" src={require(`./Image/${item.IconUrl}`)} alt={errMessage}></img>
                            <span className="LinkName ">{item.Name}</span>
                        </span>
                        })
                    }
                </div>
            </div>
            


        </div>
    )
}