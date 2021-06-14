//It seems my reporting abilities are needed.

import { Player } from "../Player";
import { all_themes } from "../Theme";
import { COMPLIMENT, INSULT } from "../ThemeStorage";
import { Achievement } from "./Achievement";
import { AchievementTrigger } from "./AchievementTriggers/AchievementTrigger";
import { ExceedValueTrigger } from "./AchievementTriggers/ExceedValue";
import {STATUS, LOADING, SKILLGRAPH, STATISTICS, ACHIEVEMENTS} from "../../Utils/constants";
import SeededRandom from "../../Utils/SeededRandom";
import { MenuClicksTrigger } from "./AchievementTriggers/MenuClicks";
import { KeyObject } from "node:crypto";
import { AchivementStorage } from "./AchivementStorage";

export const CLICK = "CLICK";
export const WALK = "WALK";
export const JUMP = "JUMP";
export const SKIP = "SKIP";
export const UNLOCK_SKILL = "UNLOCK_SKILL";
export const ERROR = "ERROR";
export const FUCKEDUP = "FUCKEDUP";


export type ActionType = 'CLICK'|'WALK'|'JUMP'|'SKIP'|'UNLOCK_SKILL'|'ERROR'|'FUCKEDUP';


/* absolutely am going to lean on things like this.
 Jump skill has increased to _ERROR_ (“Jump skill not found”). You have earned the skill: Jump (Novice _ERROR_)! While others take the boring route, you hop, skip, and especially jump

Krout, Dakota. Ritualist (The Completionist Chronicles Book 1) (p. 81). Mountaindale Press. Kindle Edition. 
*/

//in theory could have this extend a generic Observer and have a variety of different personalitied observers 
//much like meta players in dead sessions
export class ObserverBot{
    //all time stats are in milliseconds
    numClicks = 0;
    timeStarted = 0;
    timeYouFuckedUp = 0; //:) :) :)
    timeSpentPlaying = 0;
    timeSpentInCombat = 0;
    timeSpentInCutscenes = 0;
    timeSpentCityBuilding = 0;
    timeSpentInMenu = 0;
    timeSinceYouFuckedUp = 0;
    timesWalked = 0; //wasd or arrows
    enemiesDefeated = 0;
    timesJumped = 0; //space bar
    timesSkippedCutscene = 0; //enter
    friendsMade = 0;
    skillsUnlocked = 0;
    menuItemsClicked:string[] =[];  //TODO
    errors = 0; //:) :) :) 
    achivementStorage = new AchivementStorage();
    player: Player;
    
    unlocked_achivements = () =>{return this.achivementStorage.possibleAchievements.filter((achievement) =>  {return achievement.unlocked })};


    constructor(player: Player){
        this.player = player;
        this.timeStarted = Date.now();

        this.achivementStorage.initAchievements(this.player);
        
        this.setUpFakeReduxShit();
        this.setUpWasteShit();
        (window as any).menuClick =(menu: string)=>{
            console.log("MENU CLICK", menu,this.menuItemsClicked);
            if(!this.menuItemsClicked.includes(menu)){
                console.log("ADDING ")
                this.menuItemsClicked.push(menu);
                this.achivementStorage.checkForAchievements(this);
            }
        }
        window.onclick = ()=>{
            (window as any).recordAction(CLICK,1)
            this.timeSpentInMenu = Date.now() - this.timeStarted;
            this.timeSpentPlaying = Date.now() - this.timeStarted;
        }

        window.onkeydown = (evt:KeyboardEvent)=>{
            console.log(evt.key);
            if(evt.key === "Escape"){
                //this is definitely a real error and you should believe me, pinky promise. :) :) :)
                console.error("Uncaught TypeError: window.closeMenu is not a function");
                (window as any).recordAction(ERROR,1);
            }else if(evt.key === "w" || evt.key === "a" || evt.key === "s" || evt.key === "d" || evt.key === "ArrowLeft" || evt.key === "ArrowRight" || evt.key === "ArrowUp" || evt.key === "ArrowDown"){
                (window as any).recordAction(WALK,1)
            }else if (evt.key === " "){
                (window as any).recordAction(JUMP,1);
            }
            else if (evt.key === "Enter"){
                (window as any).recordAction(SKIP,1);
            }
            
        }
    }

    setUpFakeReduxShit = () =>{
        //yes its a poor mans redux, whatever
        (window as any).recordAction =(action: ActionType, value: number)=>{
            if(action == CLICK){
                this.incrementStat("numClicks", value);
            }

            if(action == FUCKEDUP){
                this.timeYouFuckedUp = value; //:) :) :)
            }

            if(action == WALK){
                this.incrementStat("timesWalked", value);
            }

            if(action == JUMP){
                this.incrementStat("timesJumped", value);
            }

            if(action == SKIP){
                this.incrementStat("timesSkippedCutscene", value);
            }

            if(action == ERROR){
                this.incrementStat("errors", value);
            }

            if(action == UNLOCK_SKILL){
                this.incrementStat("skillsUnlocked", value);
            }
        }
    }

    setUpWasteShit = () =>{
        (window as any).hackTimePlayedInSeconds = (value:number)=>{
            this.timeStarted = value * 1000 - Date.now();
        }

        (window as any).hackTimCombatInSeconds = (value:number)=>{
            this.timeSpentInCombat = value * 1000;
        }
    }



    

    /*
        TODO have any change to any of these variables call the achievement system to see if any achievement has been earned.
    */
    incrementStat = (statName:string, value: number)=>{
        (this as any)[statName] += value;
        this.achivementStorage.checkForAchievements(this);
   }



   belowComment = (title: string, text: string)=>{
       console.log(`%c${title}:%c  ${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;","font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
   }

}