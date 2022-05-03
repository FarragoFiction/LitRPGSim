import {Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class GameReward extends Reward{

    toString = ()=>{
        return `Secrets Dug`;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        (window as any).pauseButton(true);
        return "Are you sure this is a good idea?";

    }
 }