import { QuestObject } from "../../Quests/QuestObject";
import { all_stats, Stat } from "../../Stat";
import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class StatExceedValueTrigger extends AchievementTrigger{
    stat?: Stat
    value = 1;

    constructor(invert:boolean,stat?: Stat, value?: number){
        super(invert);
        this.stat = stat;
        if(this.stat && value){
            this.stat.value = value;
        }

        if(value){
           this.value = value;
        }
    }

    toString = (quest?: QuestObject)=>{
        let stat = this.stat;
        if(!this.stat){
            stat = quest?.stat;
        }
        if(!stat){
            return "ERROR NO STAT";
        }
        if(this.invert){
            return `${stat.name()} MUST NOT BE MORE THAN ${this.value} (U+FDD0)`;
        }
        return `${stat.name()} MUST BE MORE THAN ${this.value} (U+FDD0)`;
    }

    triggered = (observer: ObserverBot, quest?: QuestObject )=>{
        console.log("JR NOTE: checking trigger for "+this)
        let ret = false;
        let stat = this.stat;
        if(quest && quest.stat && !stat){
            stat = quest.stat.copy(this.value);
        }
        if(!stat){
            return false;
        }
        if(stat.value > 0){
            ret = observer.player.stats[stat.key].value > stat.value;
        }else{
            ret =  observer.player.stats[stat.key].value < stat.value;

        }
        console.log("JR NOTE: about to return trigger for "+this)

        if(this.invert){
            return !ret;
        }else{
            return ret;
        }
    }

}