import {Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class ApocalypseReward extends Reward{

    toString = ()=>{
        return `Secrets Dug`;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        (window as any).triggerApocalypse(true);
        return "Do you even know how to cause this without hacking?";

    }
 }