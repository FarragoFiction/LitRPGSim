import SeededRandom from '../Utils/SeededRandom';
import { Memory } from './ObserverBot/Memory';
import * as Stat from './Stat';
import * as ThemeStorage from './ThemeStorage';
interface ThemeMap {
    [details: string] : Theme;
}

interface PossibilitiesListMap {
    [details: string] : string[];
}


//auto populated by creating themes. 
export const all_themes:ThemeMap = {};

export   class Theme{
    //TODO refactor solo/first/second/super to instead by parts of speect like
    //TODO ing, 's, ed, etc.
    key: string;
    stats: Stat.StatMap={};

    /*will look like this: 
    nouns: [],
    adjs: [],
    insults: [],
    compliments: [],
    etc etc
    */
    string_possibilities: PossibilitiesListMap;
    memories: Memory[];

    tier: number;


    constructor(key: string, tier: number,stats: Stat.StatMap,  string_possibilities: PossibilitiesListMap, memories: Memory[]){
        this.key = key;
        this.tier = tier;
        this.initStats(stats);
        this.string_possibilities = string_possibilities;
        this.memories = memories;
        all_themes[key] = this;
    }

    pickPossibilityFor=(rand: SeededRandom, key: string)=>{
        return rand.pickFrom(this.getPossibilitiesFor(key));
    }

    //takes in things like noun, adj, insult etc etc
    getPossibilitiesFor=(key: string)=>{
        if(!this.string_possibilities){
            return ["[ERROR: DATA NOT FOUND]"];
        }
        if((key in this.string_possibilities) &&this.string_possibilities[key] ){
            return  this.string_possibilities[key];
        }else{
            console.error(`[ERROR: ${key} NOT FOUND ]`);
            return [`[ERROR: ${key} NOT FOUND ]`];
        }        
    }

    initializeIfNecessary =(tier: number)=>{
        if(!this.tier || this.tier === 0){
            this.tier = tier;
        }
    }

    initStats = (stats: Stat.StatMap) =>{
        for(const key of Object.keys(stats)){
            //whatever direction and magnitude the sample stat is, do it too
            const skill = stats[key].copy(null);
            this.stats[skill.positiveName] = skill;
        }
    }

    debug = ()=>{
        console.log("debug theme");
    }

}



//tiers of 0 will be initialized when in use 
//(YES this means that if the first player to use "Healing" theme has it high tier it will be high for EVERYONE. deal with tihs. )
export function initThemes(){
    //TODO eventually have each of these maps be a separate json file by key
    ThemeStorage.initThemes();
    ThemeStorage.checkIfAllKeysPresent();
    for(let key of ThemeStorage.keys){
        const string_possibilities:PossibilitiesListMap = {};
        string_possibilities[ThemeStorage.NOUN] = ThemeStorage.noun_possibilities[key];
        string_possibilities[ThemeStorage.LOCATION] = ThemeStorage.location_possibilities[key];
        string_possibilities[ThemeStorage.OBJECT] = ThemeStorage.object_possibilities[key];

        string_possibilities[ThemeStorage.ADJ] = ThemeStorage.adj_possibilities[key];
        string_possibilities[ThemeStorage.SUPERMOVE] = ThemeStorage.super_name_possibilities_map[key];
        string_possibilities[ThemeStorage.COMPLIMENT] = ThemeStorage.compliment_possibilities[key];
        string_possibilities[ThemeStorage.INSULT] = ThemeStorage.insult_possibilities[key];
        string_possibilities[ThemeStorage.MENU] = ThemeStorage.menu_options[key];
        string_possibilities[ThemeStorage.CHILDBACKSTORY] = ThemeStorage.child_backstories[key];
        string_possibilities[ThemeStorage.GENERALBACKSTORY] = ThemeStorage.general_backstories[key];
        string_possibilities[ThemeStorage.MIRACLE] = ThemeStorage.miracles[key];

        const memories = ThemeStorage.memories[key]?ThemeStorage.memories[key]:[];
        new Theme(key, 0,Stat.WrapStatsToStatMap(ThemeStorage.stats_map[key]),string_possibilities,memories);
    }



}


