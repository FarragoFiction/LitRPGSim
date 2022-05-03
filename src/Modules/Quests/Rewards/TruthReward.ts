import {Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class TruthReward extends Reward{

    toString = ()=>{
        return `Secrets Dug`;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        (window as any).setJustTruthMode(true);
        return "Truth always enjoys your company.";

    }
 }