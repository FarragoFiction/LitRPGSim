import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class MenuClicksTrigger extends AchievementTrigger{
    menuName:string;

    constructor(menuName: string){
        super();
        this.menuName  = menuName;
    }

    triggered = (observer: ObserverBot )=>{
        return observer.menuItemsClicked.includes(this.menuName);
    }

}