import { Player } from "../../Player";
import { all_stats, Stat } from "../../Stat";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class StatReward extends Reward{
    stat?: Stat;
    value = 1;;
    

    constructor(stat?: Stat, value?:number){
        super();
        this.stat = stat;
        if(value){
            this.value = value;
        }
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        let stat = this.stat;
        if(!this.stat){
            stat = quest.stat?.copy(this.value);
        }
        if(!stat){
            return "ERROR NO STAT FOUND";
        }
        player.addStat(stat);
        return `Raised ${stat.name()} by ${stat.absolute_value()}!;`;
    }
 }