import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import RoomContainer from '../components/RoomContainer';

export const Rooms = () => {
	return (
		<React.Fragment>
			<Hero hero="roomsHero">
				<Banner title="Our Features">
					<Link to="/" className="btn-primary">
						Return home
					</Link>
				</Banner>
			</Hero>
            <RoomContainer />
		</React.Fragment>
	);
};
