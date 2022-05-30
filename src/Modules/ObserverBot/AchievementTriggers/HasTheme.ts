import { QuestObject } from "../../Quests/QuestObject";
import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export class HasTheme extends AchievementTrigger {
    themeKey: string;

    constructor(invert: boolean, themeKey: string) {
        super(invert);
        this.themeKey = themeKey;
    }

    toString = () => {
        if (this.invert) {
            return `MUST NOT BE ASSOCIATED WITH THE THEME OF ${this.themeKey}`;
        }
        return `MUST  BE ASSOCIATED WITH THE THEME OF ${this.themeKey}`;
    }

    triggered = (observer: ObserverBot,  quest?: QuestObject) => {
        let ret = observer.player.theme_keys.includes(this.themeKey);
        //NOTE this does NOT do text replacement because its pointless, this is for TARGETING specific combos of themes

        if (this.invert) {
            return !ret;
        } else {
            return ret;
        }
    }

}