import React, { Component } from 'react';
// import items from './data';
import Client from './Contentful';

const RoomContext = React.createContext();

class RoomProvider extends Component {
	state = {
		rooms: [],
		sortedRooms: [],
		featuredRooms: [],
		loading: true,
		type: 'all',
		capacity: 1,
		price: 0,
		minPrice: 0,
		maxPrice: 0,
		minSize: 0,
		maxSize: 0,
		breakfast: false,
		pets: false
	};

	// Get data
	getData = async () => {
		try {
			let response = await Client.getEntries({
				content_type: 'beachRooms',
				order: 'sys.createdAt'
			});
			let rooms = this.formatData(response.items);
			let featuredRooms = rooms.filter((room) => room.featured === true);

			let maxPrice = rooms[0].price;
			let maxSize = rooms[0].size;
			//Get maxPrice and maxSize
			[ ...rooms ].forEach((item) => {
				item.price > maxPrice && (maxPrice = item.price);
				item.size > maxSize && (maxSize = item.size);
			});

			this.setState({
				rooms,
				featuredRooms,
				sortedRooms: rooms,
				loading: false,
				price: maxPrice,
				maxPrice,
				maxSize
			});
		} catch (error) {
			console.log(error);
		}
	};

	componentDidMount() {
		this.getData();
	}

	formatData(items) {
		let tempItems = items
			.map((item) => {
				let id = item.sys.id;
				let images = item.fields.images.map((image) => {
					return image.fields.file.url;
				});
				let room = { ...item.fields, images, id };
				return room;
			})
			.sort((a, b) => (a.price < b.price ? 1 : -1));

		return tempItems;
	}

	getRoom = (slug) => {
		let tempRoom = [ ...this.state.rooms ];
		const room = tempRoom.find((room) => room.slug === slug);
		return room;
	};

	handleChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = event.target.name;

		this.setState(
			{
				[name]: value
			},
			this.filterRooms
		);
	};

	filterRooms = () => {
		let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state;

		// // All the rooms
		let tempRooms = [ ...rooms ];

		// // Transform  value
		capacity = parseInt(capacity);

		tempRooms = rooms.filter(room => room.price <= price
			&& (type === 'all' || room.type === type)
			&& (capacity === 1 || room.capacity >= capacity)
			&& (!breakfast || room.breakfast === true)
			&& (room.size >= minSize && room.size < maxSize)
			&& (!pets || room.pets === true)
			)

		// Change the state
		this.setState({
			sortedRooms: tempRooms
		});
	};

	render() {
		return (
			<RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
				{this.props.children}
			</RoomContext.Provider>
		);
	}
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
