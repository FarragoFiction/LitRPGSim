import {Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class GhostReward extends Reward{

    toString = ()=>{
        return `Secrets Dug`;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        (window as any).setGhostMode(true);
        return "Is there even a point to this?";

    }
 }