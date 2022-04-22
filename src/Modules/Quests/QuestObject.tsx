import { humanJoining } from "../../Utils/ArrayUtils";
import SeededRandom from "../../Utils/SeededRandom";
import { God } from "../God";
import { AchievementTrigger } from "../ObserverBot/AchievementTriggers/AchievementTrigger";
import AchivementPopupKickoff from "../ObserverBot/AchivementPopup";
import { ObserverBot } from "../ObserverBot/ObserverBot";
import { Companion, Player } from "../Player";
import { collateThemes, Theme } from "../Theme";
import { Reward } from "./Rewards/GenericReward";

export const GODNAME = "<GODNAME>"
export const GODDOMAINS = "<GODDOMAINS>"
export const COMPANIONNAME = "<COMPANIONNAME>"
export const COMPANIONTITLE = "<COMPANIONTITLE>"

//PLUS ALL CONSTANTS FROM THE THEME LIST ITSELF.
// SUCH AS LOCATION OR TASTE

export enum GodDescription {
    FIRST = 1,
    SECOND,
    CHOSEN,
    RIVAL,
  }

  interface PossibilitiesMap {
    [details: string] : string;
}
export  class QuestObject{
    title: string;
    flavorText: string;
    completionText: string;
    turnInTriggers: AchievementTrigger[];
    unlockTriggers: AchievementTrigger[];
    rewards: Reward[];
    theme_keys: string[] | undefined;
    completed: boolean;
    //only ONE companion because theres no guarantee of any more than that
    companion: Companion | undefined;
    god: God | undefined;
    god_index : GodDescription | undefined;
    rand: SeededRandom | undefined;
    string_possibilities: PossibilitiesMap;



    constructor(title:string, flavorText: string, completionText: string, unlockTrigger: AchievementTrigger[],turnInTrigger: AchievementTrigger[], reward: Reward[], god_index?: GodDescription){
        this.title = title;
        this.god_index = god_index;
        this.flavorText = flavorText;
        this.completionText = completionText;
        this.turnInTriggers = turnInTrigger;
        this.unlockTriggers = unlockTrigger;
        this.rewards = reward;
        this.completed = false;
        this.string_possibilities = {};
    }

    copy = ()=>{
        return new QuestObject(this.title, this.flavorText, this.completionText, this.unlockTriggers, this.turnInTriggers, this.rewards, this.god_index)
    }


    giveReward = (player: Player, bonus: string) => {
        player.observer.numberQuestsCompleted++;
        player.storySoFar.push(this);
        this.setCompleted();
        const rewardRes = this.gatherRewards(player);
        (window as any).refresh();
        AchivementPopupKickoff({ title: "Quest Reward!", text: this.replaceTags(this.completionText) + " "+ bonus, skillPoints: 10, reward: rewardRes });
    }

    setCompleted = ()=>{
        this.completed = true;
    }

    unlocked = (observer: ObserverBot)=>{
        for(let item of this.unlockTriggers){
            if(!item.triggered(observer)){
                return false;
            }
        }
        return true;
    }

    canTurnIn = (observer: ObserverBot)=>{
        for(let item of this.turnInTriggers){
            if(!item.triggered(observer)){
                return false;
            }
        }
        return true;
    }

    replaceTags = (text: string)=>{
        let ret = `${text}`;
        if(this.god && this.god.name){
            console.log("JR NOTE: replacing tags, god is", this.god, "text is ", text);
            ret = ret.replaceAll(GODNAME, this.god.name);
            ret = ret.replaceAll(GODDOMAINS, humanJoining(this.god.domains.map((item)=>{return item.key})));
        }
        if(this.companion){
            ret = ret.replaceAll(COMPANIONNAME, this.companion.fullName);
            ret = ret.replaceAll(COMPANIONTITLE, this.companion.title);
        }
        ret = this.replaceThemes(ret);

        return ret;
    }

    replaceThemes = (text: string)=>{
        let ret = `${text}`;
        if(!this.theme_keys  || ! this.rand){
            return ret;   
        }
        let themes = collateThemes(this.theme_keys);
        //might not be all possible keys, but it'll be most of them
        //and i likely am not going to use like, songs or whatever for quests

        let sample_keys = Object.keys(themes[0].string_possibilities);
        for(let key of sample_keys){
            //actually check its there before fetching, rand can be expensive probably, not actually checking
            if(ret.includes(key)){
                //caching is needed so we always pick the same thing (yes this means we can only have one of each key, deal with it, this is already hella robust, future me)
                if(!this.string_possibilities[key]){
                    this.string_possibilities[key] = this.rand.pickFrom(themes).pickPossibilityFor(this.rand,key);
                }
                ret = ret.replaceAll(key,this.string_possibilities[key]);
            }
        }

        return ret;
    }

    gatherRewards = (player:Player)=>{
        let ret = "";
        for(let reward of this.rewards){
            ret = `${ret} ${this.replaceTags(reward.giveReward(player, this))}`;
        }
        return ret;
    }
}



