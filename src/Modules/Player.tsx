import {all_aspects, Aspect} from "./Aspect";
import { all_classes, RPGClass } from "./RPGClass";
import { CoreSkill, Skill, StatSkill, WasteSkill } from "./Skill";
import {all_interests, Interest} from "./Interest";
import {Theme} from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillGenAlg } from "./SkillGenerationAlgorithms/SkillGenAlg";
import { BonesFirstAlg } from "./SkillGenerationAlgorithms/BonesFirstAlg";
import { all_stats, FREESPIRITED, LOYAL, Stat, StatMap } from "./Stat";
import { HAX_FAIL, ObserverBot } from "./ObserverBot/ObserverBot";
import { Memory } from "./ObserverBot/Memory";
import { ADJ, CHILDBACKSTORY, FAMILY, GENERALBACKSTORY, LOCATION, LONELY, OBJECT } from "./ThemeStorage";
import { titleCase } from "../Utils/StringUtils";
import { God } from "./God";
import { getParameterByName } from "../Utils/URLUtils";
export   class Player{
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[] = [];
    skills: Skill[] =[];
    rand: SeededRandom;
    skillPoints: number = 1;
    rootSkill: Skill;
    fullName = "They"; //can write it in or companions will auto set it
    lastUnlockedSkill: Skill;
    stats: StatMap = {};
    skillGenAlg: SkillGenAlg|undefined;
    observer: ObserverBot;
    title: string = "BROKEN";
    gods: God[];
    buildings: string[] = [];
    backstory = "";
    companions: Companion[] = [];
    inventory:string[] = [];

    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom, shadowPlayer:boolean){
        this.rand = rand;
        this.class_name = class_name;
        this.aspect = aspect;
        this.interests = interests;
        this.rootSkill = new CoreSkill("NPC",0);
        this.lastUnlockedSkill = this.rootSkill;
        this.observer = new ObserverBot(this,[]);
        this.initStats(this.rand);
        this.gods = [];

        if(shadowPlayer){
            this.shadowInit(class_name, aspect, interests);

        }else{
            this.fullInit(class_name, aspect, interests);
        }

    }

    fullInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[])=>{

        this.skillGenAlg = new BonesFirstAlg();
        let themes:Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        //a god from your first three themes, a god for your back three, you are supposed to pick ones
        this.gods = [new God(themes.slice(0,3)),new God(themes.slice(-3))];
        console.log("JR NOTE: god is ", this.gods);
        interests.forEach((interest) => {themes = themes.concat(interest.themes)});
        this.theme_keys = themes.map((x)=> x.key);
        this.skills = this.skillGenAlg.generateSkills(class_name, aspect, interests,themes,this.rand);
        this.rootSkill = this.skills[0];
        this.rootSkill.unlocked = true;
        this.lastUnlockedSkill = this.rootSkill;
        this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, this.rand);
        //JR NOTE: i'm worried theres some weird decoupling here, if i make OB up top they get a player without anything set which is WEIRD.
        //is it a copy and not a reference?
        let memories:Memory[] = [];
        themes.forEach((theme) => {memories = memories.concat(theme.memories)});
        this.observer.memories = memories;
        this.observer.init();
        this.observer.achivementStorage.checkForAchievements(this.observer);
        this.title = this.generateTitle();
        this.generateBuildings(themes,this.rand);
        this.generateBackstory(themes,this.rand,0);
        this.generateCompanions(this.rand);
        for(let i = 0; i<3; i++){
            this.generateItem();
        }
    }

    shadowInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[])=>{
        this.class_name = class_name;
        this.aspect = aspect;
        this.title = this.generateTitle();
        let themes:Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        this.theme_keys = themes.map((x)=> x.key);
        interests.forEach((interest) => {themes = themes.concat(interest.themes)});
        //assume companions aren't stuck at level 1 like you are plz
        themes.forEach((theme)=>{this.addStats(theme.stats) });
        this.generateBackstory(themes,this.rand,0);
        for(let i = 0; i<3; i++){
            this.generateItem();
        }
    }

    generateSkills = (themes: Theme[], rand: SeededRandom)=>{
        if(this.skillGenAlg){
            this.skills = this.skillGenAlg.generateSkills(this.class_name, this.aspect, this.interests,themes,rand);
            this.rootSkill = this.skills[0];
            this.rootSkill.unlocked = true;
            this.lastUnlockedSkill = this.rootSkill;
            this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, rand);
        }

    }

    generateBuildings = (themes: Theme[],rand:SeededRandom)=>{
        for(let theme of themes){
            const building:string = titleCase(rand.pickFrom(theme.getPossibilitiesFor(LOCATION)));
            this.buildings.push(building);
        }
    }

    generateCompanions = (rand:SeededRandom)=>{
        let max = rand.getRandomNumberBetween(1,5);
        if(this.theme_keys.includes(LONELY)){
            max = 1;
        }else if (this.theme_keys.includes(FAMILY)){
            max = max*2;
        }
        for(let i = 0; i<max; i++){
            this.companions.push(new Companion(rand));
        }
    }

    generateItem = ()=>{
        let themes:Theme[] = [];
        themes = themes.concat(this.class_name.themes)
        themes = themes.concat(this.aspect.themes);
        //since this is done on the fly, don't always allow interests in. focus on classpect.
        if(this.rand.nextDouble()>0.5){
            this.interests.forEach((interest) => {themes = themes.concat(interest.themes)});
        }
        const object_theme = this.rand.pickFrom(themes);
        if(this.rand.nextDouble()>0.5){
            return object_theme.pickPossibilityFor(this.rand,OBJECT);
        }else{
            const modifier_theme = this.rand.pickFrom(themes);
            return modifier_theme.pickPossibilityFor(this.rand,ADJ) + object_theme.pickPossibilityFor(this.rand,OBJECT);

        }


    }

    generateBackstory = (themes: Theme[],rand:SeededRandom, num:number)=>{
        if(this.backstory.length > 213 || num > 10){
            this.backstory += ".";
            return;
        }
        let idea = "";
        let idea_seed;
        if(this.backstory.trim() === ""){
            idea_seed = rand.pickFrom(rand.pickFrom(themes).getPossibilitiesFor(CHILDBACKSTORY));
            this.backstory = `${this.fullName} ${idea_seed}`;
            console.log("JR NOTE after init ", this.backstory);

        }else{
            idea_seed = rand.pickFrom(rand.pickFrom(themes).getPossibilitiesFor(GENERALBACKSTORY));

            if(num === 1){
                const transitions = ["Now they","These days they","In the present, they","They","Nowadays they"];
                idea =  `. ${rand.pickFrom(transitions)} ${idea_seed}`;

            }else if(rand.nextDouble() >0.5){
                const transitions = ["They","They also","Additionally, they","They"];

                idea =  `. ${rand.pickFrom(transitions)} ${idea_seed}`;
            }else{
                const connection = ["and","yet","but"];
                console.log("JR NOTE connector ", this.backstory);
                idea = `, ${rand.pickFrom(connection)} ${idea_seed}`;

            }
        }
        if(!this.backstory.includes(idea_seed)){
            this.backstory += idea;
        }
        this.generateBackstory(themes, rand, num+1);
    }

    generateTitle = ()=>{
        if(this.rand.nextDouble()>0.5){
            return `${this.class_name.chosen_name} of ${this.aspect.chosen_name}`
        }else{
            return `${this.aspect.chosen_name} ${this.class_name.chosen_name}`
        }
    }

    initStats = (rand: SeededRandom) =>{
        for(const key of Object.keys(all_stats)){
            //0 is baseline neutral human
            let values = [1,0,-1];
            const skill = all_stats[key].copy(rand.pickFrom(values));
            this.stats[skill.positiveName] = skill;
        }
        this.addStats(this.aspect.stats);
        for(const interest of this.interests){
            this.addStats(interest.stats);
        }
    }

    //for each stat in the new map, add its value to your stats.
    addStats = (stats:StatMap) =>{
        for(const key of Object.keys(stats)){
            const newStat = stats[key];
           this.addStat(newStat);
        }
    }

    addStat= (stat: Stat) =>{
        this.stats[stat.positiveName].add(stat.value * this.class_name.stat_multiplier);
    }

    unlocked_skills_no_stats = () =>{return this.skills.filter((skill) =>  {return skill.unlocked && (skill.type !== "StatSkill") })};

    unlocked_skills = () =>{return this.skills.filter((skill) =>  {return skill.unlocked })};

    canAffordSkill = (skill: Skill)=>{
        return this.skillPoints >= skill.tier;
    }

    unlockSkill = (found: Skill) =>{
        this.lastUnlockedSkill = found;
        found.unlocked = true;
        this.skillPoints += -1 * found.tier;
        if(found.type === "StatSkill"){
            console.log("its a state skill");
            const stat = (found as StatSkill).stat;
            this.addStat(stat);
        }else if (found.type === "WasteSkill"){
            console.log("its a waste skill");

            if((window as any).haxMode){
                //:) :) :)
                (window as any)[(found as WasteSkill).hackFunctionName](19191919);
            }else{
                (window as any).recordAction(HAX_FAIL,1);
            }
        }else if(found.type == "CoreSkill"){
            console.log("its a core skill");
            this.observer.upgradeMenu(found.name);
        }
    }

    addSkillPoints = (points: number)=>{
        this.skillPoints += points;
        this.observer.skillPointsGainedFromMenu += points;
    }

    findSkill = (skill_id: string) =>{
        const found = this.skills.find((skill) =>{return skill.cytoscapeID()===skill_id});
        if(found){
            return found;
        }
        return null;
    }
}

export function randomPlayer(rand: SeededRandom, shadowPlayer=false){
    //TODO if these values are set in the url params use those instead of the seed.
    let cl;
    //TODO should really make sure these are valid.
    let url_class:string|null = shadowPlayer? null: getParameterByName("class",null);
    let url_aspect:string|null = shadowPlayer? null: getParameterByName("aspect",null);
    let url_i1:string|null = shadowPlayer? null: getParameterByName("interest1",null);
    let url_i2:string|null = shadowPlayer? null: getParameterByName("interest2",null);

    if(rand.initial_seed === 13){
        cl = all_classes["waste"];
    }else{
        cl = url_class? all_classes[url_class] :rand.pickFrom(Object.values(all_classes));
    }
    const ap= url_aspect? all_aspects[url_aspect]: rand.pickFrom(Object.values(all_aspects));
    const i1 = url_i1?all_interests[url_i1] : rand.pickFrom(Object.values(all_interests));
    const i2 = url_i2? all_interests[url_i2]: rand.pickFrom(Object.values(all_interests));
    console.log("JR NOTE: values are class",cl,"aspect:", ap,"interest1", i1,"interest2", i2);

    const ret = new Player(cl, ap, [i1,i2], rand, shadowPlayer);
    return ret;
}


//is it unspeakably cruel that all the npcs are players just like you who are killed seconds after they spawn
//and replaced with hollowed out dead eyed doppelangers?
//yes. 
//its also extremely
//EXTREMELY easier than doing it right.
export   class Companion{
    title: string;
    backstory = "";
    loyalty = 0;
    theme_keys:string[];
    inventory:string[];
    fullName = "They"; //can write it in or companions will auto set it

    constructor(rand: SeededRandom){
        const shadowPlayer = randomPlayer(rand, true);
        this.title = shadowPlayer.title;
        this.backstory = shadowPlayer.backstory;
        const first_names = ["John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Eve","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];
        const last_names = ["Gently","Egbert","Claire","Lalonde","Strider","Hussain","King","Stoker","Sims","Blackwood","Barker","James","Blake","Dalon","Vasil","Hebert","Jensen","Lindt","Newell","Laborn","Fell","Wilbourn","Livsey","Lamb","Bacama","Kharun","Reynolds","Braggi","Seelee","Cassan","Folnir","Citato","Grigor","Crew","Robertson","Fairchild","Lukas","Richardson","Dominguez","Cane","Salesa","Shelly"];
        this.fullName = `${rand.pickFrom(first_names)} ${rand.pickFrom(last_names)}`;
        this.theme_keys = shadowPlayer.theme_keys;//needed for shoving them into quests
        console.log("JR NOTE: stats are", shadowPlayer.stats)
        this.loyalty = shadowPlayer.stats[LOYAL].value;
        this.inventory = shadowPlayer.inventory;
    }



}