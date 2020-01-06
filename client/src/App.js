import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import landingScreen from './screens/landingScreen';
import rewardScreen from './screens/rewardScreen';
import voteScreen from './screens/voteScreen';

export const ThemeContext = React.createContext({});

function App({ children }) {
	const [ voteProperty, setVoteProperty ] = useState('');

	return (
		<Fragment>
			<ThemeContext.Provider value={{ voteProperty, setVoteProperty }}>
				<button
					onClick={() => {
						console.log(voteProperty);
					}}
				>
					Show State
				</button>
				<Router>
					<Route exact path='/' component={landingScreen} />
					<Route exact path='/reward' component={rewardScreen} />
					<Route exact path='/vote' component={voteScreen} />
				</Router>
			</ThemeContext.Provider>
		</Fragment>
	);
}

export default App;
