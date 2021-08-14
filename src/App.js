import { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import './assets/sass/main.scss';
import '@primer/css/utilities/index.scss';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Login from './components/routes/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routes/PrivateRoute';
import Home from './components/routes/Home';
import LeaderBoard from './components/routes/LeaderBoard';
import NewQuest from './components/routes/NewQuest';
import QuestItem from './components/QuestItem';
import QuestResult from './components/QuestResult';
import NotFound from './components/routes/NotFound';
function App() {
  useEffect(() => {
    M.AutoInit();
    document
      .querySelector('#nav-toggole-icon')
      .addEventListener('click', (e) => {
        const navDivs = document.querySelectorAll('#nav-div');
        for (let div of navDivs) {
          div.classList.toggle('show');
        }
      });
  });
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/newquest' component={NewQuest} />
          <PrivateRoute exact path='/leaderBoard' component={LeaderBoard} />
          <PrivateRoute exact path='/question/:id' component={QuestItem} />
          <PrivateRoute
            exact
            path='/question/:id/result'
            component={QuestResult}
          />
          <Route exact path='/login' component={Login} />
          <Route component={NotFound} />
        </Switch>
        <Alerts />
      </Router>
    </Provider>
  );
}

export default App;
