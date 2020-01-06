import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import { Tooltip, Icon } from 'antd';
import LikeDislike from '../components/LikeDislike';

export default function VoteScreen() {
	const context = useContext(ThemeContext);
	const { voteProperty, setVoteProperty } = context;

	return (
		<div className='App'>
			<header className='App-header'>
				<div>
					<div className='gallery'>
						<img
							src='https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
							alt='Cinque Terre'
							width={600}
							height={400}
						/>

						<div className='desc'>sky</div>
						<LikeDislike />
					</div>
					<div className='gallery'>
						<img
							src='https://images.pexels.com/photos/3418058/pexels-photo-3418058.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
							alt='Forest'
							width={600}
							height={400}
						/>

						<div className='desc'>diwali</div>
					</div>
					<div className='gallery'>
						<img
							src='https://images.pexels.com/photos/3457299/pexels-photo-3457299.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
							alt='Northern Lights'
							width={600}
							height={400}
						/>

						<div className='desc'>room</div>
					</div>
					<div className='gallery'>
						<img
							src='https://images.pexels.com/photos/3303614/pexels-photo-3303614.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
							alt='Mountains'
							width={600}
							height={400}
						/>
						<div className='desc'>xmas</div>
					</div>
				</div>
			</header>
		</div>
	);
}
