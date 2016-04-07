import React from 'react';
import { render } from 'react-dom';
import { Router,browserHistory,Redirect, Route, Link, IndexRoute } from 'react-router';

require('./app.css');

const App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul className="navst" >
            <li><Link to="/app">仪表板</Link></li>
            <li><Link to="/inbox">收件箱</Link></li>
            <li><Link to="/calendar">日历</Link></li>
          </ul>
        </header>
        {this.props.children}
      </div>
    );
  }
});

const Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
});

const Inbox = React.createClass({
  render: function () {
    return (
      <div>
        <p>Inbox</p>
      </div>
    );
  }
});

const Calendar = React.createClass({
  render: function () {
    return (
      <div>
        <p>Calendar</p>
      </div>
    );
  }
});


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="app" component={Dashboard}/>
      <Route path="inbox" component={Inbox}/>
      <Route path="calendar" component={Calendar}/>
      <Route path="*" component={Dashboard}/>
    </Route>
  </Router>
), 
document.getElementById("app")
);
