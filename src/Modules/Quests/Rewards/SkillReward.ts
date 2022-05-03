import { Player } from "../../Player";
import { CustomSkill } from "../../Skill";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class SkillReward extends Reward{
    skill: CustomSkill;
    toString = ()=>{
        return `${this.skill.name} learned!`;
    }

    constructor(skill: CustomSkill){
        super();
        this.skill = skill;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        const ret = this.skill.copy();
        ret.name = quest.replaceTags(ret.name);
        ret.description = quest.replaceTags(ret.description);
        ret.unlocked = true;
        player.skills.push(ret);
        return this.toString();
    }
 }