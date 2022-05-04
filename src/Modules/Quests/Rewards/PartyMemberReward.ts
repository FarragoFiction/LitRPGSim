import { Companion, Player, randomCompanion } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class CompanionReward extends Reward{
    name: string;
    backstory: string;
    title: string

    toString = ()=>{
        return `${this.name} joins the party!`;
    }

    constructor(name: string, backstory: string, title: string){
        super();
        this.name = name;
        this.backstory = backstory;
        this.title = title;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        let ret = this.toString();
        const companion = randomCompanion(player.rand,false,quest.replaceTags(this.name), quest.replaceTags(this.backstory), quest.replaceTags(this.title));
        player.companions.push(companion);
        return ret;
    }
 }