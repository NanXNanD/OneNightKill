import {Room, RoomSet} from "./Room";

export function mysocket(io) {

    var roomSet = new RoomSet(10);

    io.on('connection', function (socket) {
        console.log("a user connection");
        var name = socket.handshake.query.name;
        var id = socket.id;
        var roomId = socket.handshake.query.room;
        var newRoomId = socket.handshake.query.newRoom;
        var roomPlyNum = socket.handshake.query.roomPlyNum;

        if(newRoomId){
            // create room
            roomSet.addRoom(new Room(newRoomId, roomPlyNum))
            console.log('create new room ' + newRoomId);
        }else {
            // enter room
            if (!roomSet.hasRoom(roomId)) {
                // room not found
                socket.emit("sysErr","没有这个房间");
                // io.disconnect();
            } else if (roomSet.getRoomById(1).roomStatus != Room.FREE) {
                // room full or playing
                socket.emit("sysErr","房间不可加入");
                // io.disconnect();
            } else {
                // success
                console.log(name+"加入了"+roomId);
                socket.join(roomId);
                io.to(roomId).emit("roomMsg","new Player:"+name);
                io.to(roomId).emit("roomPlayers",roomSet.getRoomById(roomId).players);
            }
        }

        socket.on('disconnect',()=>{
            console.log(name+" disconnect")
        })
    });
};