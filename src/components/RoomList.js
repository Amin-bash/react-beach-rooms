import React from 'react'
import Room from './Room'
import Loading from './Loading'

export default function RoomList({rooms}) {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>Unfortunately no rooms match your search</h3>
      </div>
    )
  }

  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {
          rooms.map(item => {
            if (!item.images) {return <Loading />}
            return <Room key={item.id} room={item} />;
          })
        }
      </div>
    </section>
  )
}
