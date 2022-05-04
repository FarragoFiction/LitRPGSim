import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export class ItemInInventory extends AchievementTrigger {
    itemPart: string;
    text: string;

    constructor(invert: boolean, itemPart: string) {
        super(invert);
        this.itemPart = itemPart;
        this.text = itemPart;
    }

    toString = () => {
        if (this.invert) {
            return `AN ITEM CALLED ${[this.text]} MUST NOT BE IN YOUR INVENTORY`;
        }
        return `AN ITEM CALLED ${[this.text]} MUST BE IN YOUR INVENTORY`;
    }

    triggered = (observer: ObserverBot, tagReplacingFunction?: (text: string) => string) => {
        this.text = this.itemPart;
        if (tagReplacingFunction) {
            this.text = tagReplacingFunction(this.text);
        }
        let ret = false;
        for (let item of observer.player.inventory) {
            if (item.toUpperCase().includes(this.text.toUpperCase())) {
                ret = true;
            }
        }
        //seriously. just. if you don't have an inventory you don't have an inventory
        if(observer.inventoryMenuLevel<=0){
            ret = false;
        }
        if (this.invert) {
            return !ret;
        } else {
            return ret;
        }
    }

}