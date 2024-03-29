
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { FirstPage } from './Components/FirstPage/FirstPage';
import {StatisticCompanyPage} from './Components/StatisticCompanyPage/StatisticCompanyPage.jsx';
import HistoryPage from './Components/HistoryPage/HistoryPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Оборачиваем маршруты в компонент Switch, чтобы отобразить только один из них */}
          <Route exact path="/" element={<FirstPage />} /> {/* Маршрут для главной страницы */}
          <Route exact path="/statisticCompanyPage" element={<StatisticCompanyPage />} /> {/* Маршрут для страницы About */}
          <Route exact path="/history/:id" element={<HistoryPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
