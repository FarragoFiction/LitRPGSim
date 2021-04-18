import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";
//TODO aspects also have hardcoded skills (with or without themes)
//some skills are special purpose, for example, the ability to see/upgrade the status screen
//or see/upgrade your allies (blood would especially be good at this)
interface AspectMap {
    [details: string] : Aspect;
}
//autopopulated by creating aspects
export const all_aspects:AspectMap = {};


export  class Aspect{
    key: string;
    name_possibilities:string[];
    chosen_name:string;
    themes:Theme[];
    seeded_random: SeededRandom;


    constructor(key: string,name_possibilities: string[], seeded_random:SeededRandom, themes: Theme[] ){
        this.name_possibilities = name_possibilities;
        this.seeded_random = seeded_random;
        this.chosen_name = seeded_random.getRandomElementFromArray(this.name_possibilities);
        this.themes = themes;
        this.key = key;
        all_aspects[key]= this;


    }

    debug = ()=>{
        console.log("debug aspect");
    }

}
s
export function initAspects(seeded_random: SeededRandom){
    new Aspect("life", ["Life", "Growth", "Power", "Evolution", "Vitality"], seeded_random, [all_themes.healing, all_themes.plants]);
}
