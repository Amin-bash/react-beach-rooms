import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomConsumer } from '../context';
import RoomList from '../components/RoomList';
import RoomFilter from '../components/RoomFilter';
import Loading from '../components/Loading';

export const Home = () => {
	return (
		<RoomConsumer>
			{(value) => {
				const { loading, sortedRooms, rooms } = value;
				if (loading) {
					return <Loading />;
				}
				return (
					<React.Fragment>
						<Hero>
							<Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
								<Link to="/rooms" className="btn-primary">
									Our Features
								</Link>
							</Banner>
						</Hero>
						<RoomFilter rooms={rooms} />
						<RoomList rooms={sortedRooms} />
					</React.Fragment>
				);
			}}
		</RoomConsumer>
	);
};

Hero.defaultProps = {
	hero: 'defaultHero'
};