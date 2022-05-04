import { Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class QuestReward extends Reward{
    quest?: QuestObject;

    toString = ()=>{
        return `Quest obtained!`;
    }

    constructor(quest?: QuestObject){
        super();
        this.quest = quest;
    }

    giveReward = (player: Player,quest:QuestObject )=>{
        const rewardQuest = this.quest? this.quest: quest.copy();
        player.addQuest(rewardQuest);
        return "You Acquire a New Potential Quest: " +rewardQuest.title;
    }
 }