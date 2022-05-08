import { Companion, Player, randomCompanion } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class CompanionReward extends Reward{
    name?: string;
    backstory?: string;
    title?: string

    toString = ()=>{
        return `${this.name} joins the party!`;
    }

    constructor(name?: string, backstory?: string, title?: string){
        super();
        this.name = name;
        this.backstory = backstory;
        this.title = title;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        //if its undefined, just pass it through and it'll randomize
        const name  = this.name?quest.replaceTags(this.name):this.name;
        const backstory  = this.backstory?quest.replaceTags(this.backstory):this.backstory;
        const title  = this.title?quest.replaceTags(this.title):this.title;

        const companion = randomCompanion(player.rand,false,name, backstory, title);
        player.companions.push(companion);
        return `${companion.fullName}, the ${companion.title} joins the party!`;
    }
 }