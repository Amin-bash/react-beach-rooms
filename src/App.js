import React from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Rooms } from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import { Error } from './pages/Error';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
	return (
		<React.Fragment>
			<Navbar />
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/rooms" component={Rooms} exact />
				<Route path="/rooms/:slug" component={SingleRoom} />
				<Route component={Error} />
			</Switch>
		</React.Fragment>
	);
}

export default App;
