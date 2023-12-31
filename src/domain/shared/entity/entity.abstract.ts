import Notification from "../notification/notification";

export default abstract class Entity {
    protected id: string
    notification: Notification

    constructor(id?:string){
        this.notification = new Notification()
        if(id!== undefined){
            this.id = id;
        }
    }
}