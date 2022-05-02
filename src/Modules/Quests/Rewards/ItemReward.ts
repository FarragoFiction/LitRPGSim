import { Player } from "../../Player";
import { Reward } from "./GenericReward";

export  class ItemReward extends Reward{
    item?: string;
    toString = ()=>{
        return `${this.item} obtained!`;
    }

    constructor(item?: string){
        super();
        this.item = item;
    }

    giveReward = (player: Player )=>{
        let ret = "";
        if(!this.item){
            this.item = player.generateItem();
        }
        if(player.observer.inventoryMenuLevel>0){
            if(player.inventory.includes(this.item)){
                ret = `You already have a/an ${this.item}!  S-sorry!`;
            }else{
                ret = `And you get ${this.item} as a reward!`;
                player.inventory.push(this.item);
            }
        }else{
            ret = ` Oh no! I wanted to give you a/an ${this.item} as a reward, but you have no where to put it! Hurry and find your inventory!`;
        }
        return ret;
    }
 }