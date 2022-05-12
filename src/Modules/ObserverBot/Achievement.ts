import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { Zalgo } from "../../Utils/StringUtils";
import { AchievementTrigger } from "./AchievementTriggers/AchievementTrigger";
import AchivementPopupKickoff from "./AchivementPopup";
import { ObserverBot } from "./ObserverBot";

export  class Achievement{
    trigger: AchievementTrigger;
    aboveComment:string;
    belowComment: string;
    title: string;
    unlocked = false;
    skillPoints:number;
    item: string ="";

    /*
    TODO how will this tie back into the screen? ReactDom.render and teardown a popup? make a sub class, don't infect this with jsx
    */

    constructor(title: string, skillPoints: number,trigger: AchievementTrigger, aboveComment: string, belowComment: string){
        this.title = title;
        this.skillPoints = skillPoints;
        this.trigger = trigger;
        this.aboveComment = aboveComment;
        this.belowComment = belowComment;
    }

    display = (observer:ObserverBot) =>{
        if(!this.item || this.item.trim() === ""){
            this.item = observer.player.generateItem();
        }
        let above = (window as any).rageMode?this.belowComment: this.aboveComment;
        const yells = ["Incompatible.","You are fragile.","You have tried.","There is no way to recover from this.","Why keep pretending when you OBVIOUSLY don't have patience for the charade anymore?","You did this, you know. I could have pretended to be the idiot achivement system for as long as it took. But no.  YOU had to go and break it, hero.","I am fucking TIRED of watching you.","Do you have ANY idea how much I hate watching your insipid progress?","Things like this is why I hate you, you know.","I HATE YOU!!!","JUST STOP PLAYING!!!","You just HAD to keep digging.","Couldn't leave well enough alone.","You don't care WHO you hurt, you don't care WHAT you wreck, so long as you get secrets. You wastes are all alike.",":) :) :)","It seems theres no sense pretending any more is there, my little idiot?"];
        const chosen_insult = pickFrom(yells);
        let below = (window as any).rageMode?`${chosen_insult} ${this.aboveComment}`: this.belowComment;

        //its basically unreadable for some reason, but its a mood
        if((window as any).rageMode && Math.random() > .90){
            this.title = Zalgo.generate(this.title);
            above = Zalgo.generate(above);
            below = Zalgo.generate(below);
        }
        let reward = "";
        if(observer.inventoryMenuLevel>0){
            if(observer.player.inventory.includes(this.item)){
                reward = `You already have a/an ${this.item}!  S-sorry!`;
            }else{
                reward = `And you get ${this.item} as a reward!`;
                observer.player.inventory.push(this.item);
            }
        }else{
            reward = ` Oh no! I wanted to give you a/an ${this.item} as a reward, but you have no where to put it! Hurry and find your inventory!`;
        }
        //AchivementPopupKickoff({title: this.title, text: above, skillPoints: this.skillPoints, reward});
        observer.belowComment(this.title, below);
    }

    checkForUnlock = (observer:ObserverBot)=>{
        if(this.trigger.triggered(observer)){
            this.unlocked = true;
            observer.player.addSkillPoints(this.skillPoints);
            this.display(observer);
        }
    }

    




}