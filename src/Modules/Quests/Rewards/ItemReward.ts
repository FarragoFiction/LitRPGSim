import { Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class ItemReward extends Reward{
    item?: string;
    text?: string;

    toString = ()=>{
        return `${this.item} obtained!`;
    }

    constructor(item?: string){
        super();
        this.item = item;
        this.text = item;
    }

    giveReward = (player: Player,quest:QuestObject )=>{
        let ret = "";
        if(!this.item){
            this.item = player.generateItem();
        }
        this.text = this.item;
        this.text = quest.replaceTags(this.text);
        if(player.observer.inventoryMenuLevel>0){
            if(player.inventory.includes(this.text)){
                ret = `You already have a/an ${this.text}!  S-sorry!`;
            }else{
                ret = `And you get ${this.text} as a reward!`;
                player.inventory.push(this.text);
            }
        }else{
            ret = ` Oh no! I wanted to give you a/an ${this.text} as a reward, but you have no where to put it! Hurry and find your inventory!`;
        }
        return ret;
    }
 }