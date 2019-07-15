import {Role} from "./Role";

class Seer extends Role{

    constructor(){
        super(101,"预言家")
    }

    action(io: any, callback: (any) => void) {
    }

    deadWords() {
    }


}