import {Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class RageReward extends Reward{

    toString = ()=>{
        return `Secrets Dug`;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        (window as any).setRageMode(true);
        return "Well now you've done it.";

    }
 }