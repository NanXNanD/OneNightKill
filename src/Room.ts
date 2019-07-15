/*
* model room
* {
*   roomId: number,
*   roomStatus: number, //-1:full, 0:free, other:started(gameId)
*   playerNum: number,
*   users: number[],    //Ids of the user in the room
* }
* */
export interface Player {
    id: string;
    name: string;
}

export class Room {

    public static FREE:number = 0;
    public static FULL:number = 1;
    public static PLAYING:number = -1;
    public static MIN_NUM = 6;
    public static MAX_NUM = 8;

    private _roomId: number;

    private _roomStatus: number;

    private _playerNum: number;

    private _players: Player[];

    constructor(roomId: number,playerNum: number){
        this._roomId = roomId;
        this._roomStatus = Room.FREE;
        this._playerNum = playerNum;
        this._players = [];
    }

    get roomStatus(): number {
        return this._roomStatus;
    }

    get roomId(): number {
        return this._roomId;
    }

    get playerNum(): number {
        return this._playerNum;
    }

    get players(): object[] {
        return this._players;
    }

    public addPlayer(playerId: string, playerName: string): boolean{
        if( this._roomStatus != Room.FREE ) return false;
        this._players.push({
            id: playerId,
            name: playerName
        });
        if( this._players.length >= this._playerNum) this._roomStatus = Room.FULL;
        return true;
    }

    public removePlayer(playerId: string): boolean{
        if( this._players.length ==0 ) return false;
        this._players.filter( p => {
            p.id == playerId
        });
        if( this._roomStatus == Room.FULL && this._players.length >= this._playerNum) this._roomStatus = Room.FREE;
        return false;
    }

    public startGame(): boolean{
        if( this._roomStatus != Room.FULL) return false;
        this._roomStatus = Room.PLAYING;
        return true;
    }

}

export class RoomSet {

    private _rooms: Room[];

    private _roomIds: number[];

    private _max_room_num: number;

    constructor(max_room_num: number) {
        this._max_room_num = max_room_num;
        this._rooms = new Array(max_room_num);
        this._roomIds = new Array(max_room_num);
    }

    public addRoom(room: Room): boolean{
        if(room.roomId == 0) return false;
        if(this._roomIds.length <= this._max_room_num){
            this._rooms.push(room);
            this._roomIds.push(room.roomId);
            return true;
        }else {
            this._roomIds.forEach( (r,i) => {
                if(r==0){
                    this._roomIds[i] = room.roomId;
                    this._rooms[i] = room;
                    return true;
                }
            });
            return false;
        }
    }

    public removeRoom(roomId: number){
        let index = this._roomIds.indexOf(roomId);
        this._roomIds[index] = 0;
        this._rooms[index] = null;
    }

    public getRoomById(roomId: number): Room{
        if(roomId==0) return null;
        let index = this._roomIds.indexOf(roomId);
        if( index < 0 ) return null;
        else return this._rooms[index];
    }

    public hasRoom(roomId: number): boolean{
        return this._roomIds.indexOf(roomId)!=-1;
    }
}