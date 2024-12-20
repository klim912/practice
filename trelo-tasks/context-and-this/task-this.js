class Room {
    constructor(number, rooms, floor) {
        this.number = number;
        this.rooms = rooms;
        this.floor = floor;
        this.isBookedStatus = false;
        this.whoBooked = null;
    }

    book(whoWillBook) {
        if (!this.isBookedStatus) {
            this.isBookedStatus = true;
            this.whoBooked = whoWillBook;
            console.log(`Room number ${this.number} has been booked by ${whoWillBook}.`);
        } else {
            console.log(`Room ${this.number} is already booked by ${this.whoBooked}.`);
        }
    }

    showInfo() {
        console.log(`Room number: ${this.number}
Floor: ${this.floor}
Amount of rooms: ${this.rooms}
Booked by: ${this.whoBooked ? this.whoBooked : 'Not booked'}`);
    }
}

class Hotel {
    constructor(name) {
        this.name = name;
        this.rooms = [];

        this.createNewRoom = this.createNewRoom.bind(this);
        this.bookRoom = this.bookRoom.bind(this);
        this.showBookedRooms = this.showBookedRooms.bind(this);
        this.showAllRooms = this.showAllRooms.bind(this);
    }

    createNewRoom(roomNumber, amountOfRooms, roomFloor) {
        const room = new Room(roomNumber, amountOfRooms, roomFloor);
        this.rooms.push(room);
        console.log(`Room number ${roomNumber} created.`);
    }

    bookRoom(roomNumber, whoWillBook) {
        const room = this.rooms.find(r => r.number === roomNumber);
        if (room) {
            room.book.call(room, whoWillBook);
        } else {
            console.log(`Room number ${roomNumber} does not exist.`);
        }
    }

    showBookedRooms() {
        const bookedRooms = this.rooms.filter(r => r.isBookedStatus);
        if (bookedRooms.length > 0) {
            console.log('Booked rooms:');
            bookedRooms.forEach(room => {
                room.showInfo.apply(room);
            });
        } else {
            console.log('No rooms have been booked yet.');
        }
    }

    showAllRooms() {
        if (this.rooms.length > 0) {
            console.log('All rooms in the hotel:');
            this.rooms.forEach(room => {
                room.showInfo.call(room);
            });
        } else {
            console.log('No rooms available in the hotel.');
        }
    }
}

const hotel = new Hotel('Grand Hotel');
