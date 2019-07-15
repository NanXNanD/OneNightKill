/*
* model game
* {
*   gameId: number,
*   users: number[],
*   initialRole: number[],
*   currentRole: number[],
*   actions: {
*       playerId: number,
*       actionCode: number,
*       targetId: number[]
*   }[],
*   winner: number[]
* }
* */
class Game {

    private static roles = {
        2:[101,101,101,101,101]
    }

}