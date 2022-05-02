import { ObserverBot } from "../ObserverBot";

export  class AchievementTrigger{
    invert = false;

    constructor(invert: boolean){
        this.invert = invert;
    }

   toString = ()=>{
       return "AUTO UNLOCK";
   }

   triggered = (observer: ObserverBot, tagReplacingFunction?: (text:string)=>string )=>{
       return true; //JR NOTE: children will overwrite this
   }
}