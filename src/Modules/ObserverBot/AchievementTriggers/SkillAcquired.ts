import { QuestObject } from "../../Quests/QuestObject";
import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export class SkillAcquired extends AchievementTrigger {
    skillName: string;
    text: string;

    constructor(invert: boolean, skillName: string) {
        super(invert);
        this.skillName = skillName;
        this.text = skillName;
    }

    toString = () => {
        if (this.invert) {
            return `A SKILL CALLED ${[this.text]} MUST NOT BE KNOWN`;
        }
        return `A SKILL CALLED ${[this.text]} MUST BE KNOWN`;
    }

    triggered = (observer: ObserverBot,  quest?: QuestObject) => {
        let ret = false;
        this.text = this.skillName;
        if (quest) {
            this.text = quest.replaceTags(this.text);
        }
        for (let item of observer.player.unlocked_skills()) {
            if (item.name.toUpperCase().includes(this.text.toUpperCase())) {
                ret = true;
            }
        }
        if (this.invert) {
            return !ret;
        } else {
            return ret;
        }
    }

}