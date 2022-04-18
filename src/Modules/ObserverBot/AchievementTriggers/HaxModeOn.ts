import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class HaxModeOn extends AchievementTrigger{


    constructor(invert:boolean,){
        super(invert);
    }

    toString = ()=>{
        if(this.invert){
            return `HAXMODE MUST BE OFF`;
        }
        return `HAXMODE MUST BE ON`;
    }

    triggered = (observer: ObserverBot )=>{
        const ret =  (window as any).haxMode;
        if(this.invert){
            return !ret;
        }else{
            return ret;
        }
    }

}