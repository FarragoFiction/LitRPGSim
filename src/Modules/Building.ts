//at first i thought positioning buildings was going to be hard but then i remembered

import { Theme } from "@emotion/react";
import { HORROR_KEY } from "../Utils/constants";
import { pickFrom } from "../Utils/NonSeededRandUtils";
import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import { God } from "./God";
import { Companion, Player } from "./Player";
import { artifacts, CustomSkill, generateDescription } from "./Skill";
import { all_themes } from "./Theme";
import { LOC_DESC, TWISTING, SMELL, SOUND, TASTE, FEELING, LOCATION, EFFECTS } from "./ThemeStorage";

//im perfectly fine with "non euclidean" geometry.
export class BuildingMetaData {
    key: string;
    unlocked: boolean;
    neighbors: string[] = [];//you can move around.
    rand: SeededRandom;
    items: string[] = []; //you can find items.
    people: Companion[] = []; //you can meet randos.
    description: string = "test";
    smells: string[] = [];
    tastes: string[] = [];
    feelings: string[] = [];
    sounds: string[] = [];

    constructor(key: string, order: boolean, themes: Theme[]|null, unlocked: boolean, rand: SeededRandom, items: string[]) {
        this.key = key;
        this.unlocked = unlocked;
        this.rand = rand;
        this.items = items;
        if(themes && !order){
            this.generateDescription(themes);
        }else if(order){
            this.description = "It is a building."
        }
        
        
    }


    //JUST for game mode, don't risk leaning on this too much
    ///example "You see several math equations floating in the air as you get acclimated to the CLASSROOM.
    // There is a model anatomy skeleton in the corner.  There's a huge map of Zampanio on a wall."
    //"there is" or "you see",or "there's" is going to be added by the system. don't worry.
    generateDescription = (themes: Theme[]) => {
        const foodItems = ["MinoBurgers", "Spiral Fries", "Not!Spiral Onion Rings"];
        let ret = `It is a mall store that seems to sell a variety of objects. ${this.rand.nextDouble()>0.75?`You see ads for ${this.rand.pickFrom(foodItems)}.`:""} You see ${this.rand.pickFrom(themes).pickPossibilityFor(this.rand, LOC_DESC)}. `;
        const num = this.rand.getRandomNumberBetween(1, 3);
        for(let i = 0; i< 3; i++){
            const theme = this.rand.pickFrom(themes);
            if(themes.includes(all_themes[TWISTING])){
                const scromble = [SMELL, SOUND, TASTE, FEELING];
                //tastes like purple is a common spiral trope. it is not what it is
                this.smells.push(theme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.sounds.push(theme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.tastes.push(theme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.feelings.push(theme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
            }else{
                this.smells.push(theme.pickPossibilityFor(this.rand, SMELL));
                this.sounds.push(theme.pickPossibilityFor(this.rand, SOUND));
                this.tastes.push(theme.pickPossibilityFor(this.rand, TASTE));
                this.feelings.push(theme.pickPossibilityFor(this.rand, FEELING));
            }
        }
        for (let i = 0; i < num; i++) {
            if (this.rand.nextDouble() > 0.3) {
                const connectors = ["There's", "There's also", "You also see"];
                ret += `${this.rand.pickFrom(connectors)} ${this.rand.pickFrom(themes).pickPossibilityFor(this.rand, LOC_DESC)}. `;
            } else {
                const non_visual_choices = [`The floor feels weirdly of ${this.rand.pickFrom(this.feelings)}.`, `You almost gag against the taste of ${this.rand.pickFrom(this.tastes)}.`, `You almost have to cover your ears to drown out the unending sound of ${this.rand.pickFrom(this.sounds)}.`, `The reek of ${this.rand.pickFrom(this.smells)} permeates the air.`];
                ret += `${this.rand.pickFrom(non_visual_choices)}`;
            }
        }

        this.description = ret;
    }

    debug=()=>{
        return `key: ${ this.key }, unlocked: ${ this.unlocked }, neighbors: ${ this.neighbors.join(", ") }, items: ${ this.items.join(", ") }, companions: ${ this.people.join(", ") }
            } `;
    }

    beEntered = (player: Player)=>{
        this.people = [];
        if(this.neighbors.length < 3){
            if(player.rand.nextDouble()>0.5){
                if(player.observer.godsMenuLevel>0 && player.rand.nextDouble()>0.5 ){
                    const temple = player.spawnRandomTemple();
                    this.neighbors.push(temple.key);
                    temple.neighbors.push(this.key);
                }else{
                    const theme = player.rand.pickFrom(Object.values(all_themes));
                    const building:string = titleCase(player.rand.pickFrom(theme.getPossibilitiesFor(LOCATION)));
                    //one new random theme but the rest just from player.
                    player.metaDataForOneBuilding(building,[theme, ...player.collateThemes()], player.rand,true);
                    this.neighbors.push(building);
                    player.buildingMetaData[building].neighbors.push(this.key);
                }

            }
        }
        //you really can't escape it. if it hasn't caught you yet, it will. even if you've restarted.
        if(window.localStorage[HORROR_KEY]){
            this.people.push(player.spawnAMonster());
        }

        if(player.rand.nextDouble()>0.4){
            this.people.push(player.rand.pickFrom(player.companions));
        }

        if(player.companions.length === 0){
            player.spawnNotAMinotaur();
        }else if(player.companions.length === 1 && player.companions[0].fullName.includes("Minotaur")){
            player.spawnAMonster();
        }

    }

    assignNeighbors = (possible_neighbor_keys:string[])=>{
        if(possible_neighbor_keys.length ===0){
            return [];
        }
        //you can only go straight or right. its a spiral
        const num = this.rand.getRandomNumberBetween(1,3);
        for(let i=0; i<num; i++){
            const choice = this.rand.pickFrom(possible_neighbor_keys);
            if(!this.neighbors.includes(choice)){
                this.neighbors.push(choice);
            }
        }
        return [...this.neighbors]; //copy just in case
    }
}

/*a god has
 name: string;
    domains: Theme[];
*/
//note: what artifact it has is a TRUE RANDOM because gods don't have to follow normal rules
export const spawnTempleForGod = (player: Player, god: God, rand: SeededRandom)=>{
    //a temple is a regular building with the gods themes and then ALSO skill effects for those themes layered into the description.
    const artifact = pickFrom(artifacts);
    const temple = new TempleMetaData(`Temple of ${god.name}`,artifact, god.domains, rand, []);
    const ambiance1 = pickFrom(god.domains);
    const ambiance2 = pickFrom(god.domains);
    if(!player.skills.includes(artifact)){
        temple.description += `${generateDescription([ambiance1, ambiance2], rand)}. You are suddenly aware of the location of the ${artifact.name}. It was inside you all along.`;
    }
    return temple;

}
export class TempleMetaData extends BuildingMetaData{
    artifact: CustomSkill;
    constructor(key: string, artifact: CustomSkill, themes: Theme[]|null, rand: SeededRandom, items: string[]) {
        super(key, false,themes, true, rand, items);
        this.artifact = artifact;
    }
    
    beEntered = (player: Player)=>{
        //NO ITEMS, NO COMPANIONS BUT YOU DO GET A SKILL OUT OF NOWHERE. (unless you already have it)
        if(!player.skills.includes(this.artifact)){
            player.skills.push(this.artifact);
            player.checkForApocalypseConditions();
        }
    }
    
} 