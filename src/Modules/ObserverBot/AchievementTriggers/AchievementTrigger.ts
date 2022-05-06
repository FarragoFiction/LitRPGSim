import { QuestObject } from "../../Quests/QuestObject";
import { ObserverBot } from "../ObserverBot";

export  class AchievementTrigger{
    invert = false;

    constructor(invert: boolean){
        this.invert = invert;
    }

   toString = (quest?: QuestObject)=>{
       return "AUTO UNLOCK";
   }

   triggered = (observer: ObserverBot, quest?: QuestObject )=>{
       return true; //JR NOTE: children will overwrite this
   }
   
}