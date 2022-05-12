import { all_aspects, all_aspects_except_null, Aspect } from "./Aspect";
import { all_classes, all_classes_except_null, RPGClass } from "./RPGClass";
import { artifacts, CoreSkill, Skill, StatSkill, WasteSkill } from "./Skill";
import { all_interests, all_interests_except_null, Interest } from "./Interest";
import { all_themes, Theme } from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillGenAlg } from "./SkillGenerationAlgorithms/SkillGenAlg";
import { BonesFirstAlg } from "./SkillGenerationAlgorithms/BonesFirstAlg";
import { all_stats, LOYAL, Stat, StatMap } from "./Stat";
import { HAX_FAIL, ObserverBot } from "./ObserverBot/ObserverBot";
import { Memory } from "./ObserverBot/Memory";
import { ADJ, CHILDBACKSTORY, FAMILY, FEELING, GENERALBACKSTORY, genericEndingQuests, genericMiddleQuests, genericStartingQuests, LOCATION, LOC_DESC, LONELY, MONSTER_DESC, OBJECT, PHILOSOPHY, SMELL, SOUND, TASTE, testQuestObjects, TWISTING } from "./ThemeStorage";
import { titleCase } from "../Utils/StringUtils";
import { God } from "./God";
import { getParameterByName } from "../Utils/URLUtils";
import { removeItemOnce, uniq } from "../Utils/ArrayUtils";
import { BuildingMetaData, spawnTempleForGod } from "./Building";
import { HORROR_KEY } from "../Utils/constants";
import { GodDescription, QuestObject } from "./Quests/QuestObject";

export interface BuildingMetaMap {
    [name: string]: BuildingMetaData
}

export class Player {
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[] = [];
    skills: Skill[] = [];
    rand: SeededRandom;
    skillPoints: number = 1;
    buildingMetaData: BuildingMetaMap = {};
    rootSkill: Skill;
    fullName = "They"; //can write it in or companions will auto set it
    lastUnlockedSkill: Skill;
    stats: StatMap = {};
    skillGenAlg: SkillGenAlg | undefined;
    observer: ObserverBot;
    title: string = "BROKEN";
    gods: God[];
    chosen_god: God|undefined;
    rival_god: God|undefined;

    buildings: string[] = [];
    backstory = "";
    current_location: string = "";
    companions: Companion[] = [];
    inventory: string[] = [];
    quests: QuestObject[];
    order = false;
    chaos = false;
    storySoFar:QuestObject[] = [];

    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom, shadowPlayer: boolean,order = false, chaos=false, ) {
        this.rand = rand;
        this.order = order;
        this.chaos = chaos;
        this.class_name = class_name;
        this.aspect = aspect;
        this.quests = [];
        this.interests = interests;
        this.rootSkill = new CoreSkill("NPC", 0);
        this.lastUnlockedSkill = this.rootSkill;
        this.observer = new ObserverBot(this, []);
        this.initStats(this.rand);
        this.gods = [];

        if (shadowPlayer) {
            this.shadowInit(class_name, aspect, interests);

        } else {
            this.fullInit(class_name, aspect, interests);
        }

    }

    collateThemes = (careInterests = true) => {
        let themes: Theme[] = [];
        for (let theme of this.theme_keys) {
            themes.push(all_themes[theme]);
        }
        return themes;
    }

    //this might have unintended behaivor if theres more than two gods, but thats the point
    chooseGod(god: God){
        this.chosen_god = god;
        const index = this.gods.indexOf(god);
        if(index === 0){
            this.rival_god = this.gods[1]
        }else{
            this.rival_god = this.gods[0]
        }
    }

    fullInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[]) => {

        this.skillGenAlg = new BonesFirstAlg();
        let themes: Theme[] = [];
        console.log("JR NOTE: rip out test quest objects from player");
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        //a god from your first three themes, a god for your back three, you are supposed to pick ones
        this.gods = [new God(themes.slice(0, 3),this.order), new God(themes.slice(-3), this.order)];

        interests.forEach((interest) => { themes = themes.concat(interest.themes) });
        this.theme_keys = themes.map((x) => x.key);
        this.skills = this.skillGenAlg.generateSkills(class_name, aspect, interests, themes, this.rand);
        this.rootSkill = this.skills[0];
        this.rootSkill.unlocked = true;
        this.lastUnlockedSkill = this.rootSkill;
        this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, this.rand);
        //JR NOTE: i'm worried theres some weird decoupling here, if i make OB up top they get a player without anything set which is WEIRD.
        //is it a copy and not a reference?
        let memories: Memory[] = [];
        themes.forEach((theme) => { memories = memories.concat(theme.memories) });
        this.observer.memories = memories;
        this.observer.init();
        this.observer.achivementStorage.checkForAchievements(this.observer);
        this.title = this.generateTitle();
        this.generateBackstory(themes, this.rand, 0);
        this.generateCompanions(this.rand);
        this.generateBuildings(themes, this.rand);
        for (let i = 0; i < 3; i++) {
            this.inventory.push(this.generateItem());
        }
        //you really can't escape it. if it hasn't caught you yet, it will. even if you've restarted.
        if(window.localStorage[HORROR_KEY]){
            this.companions.push(this.spawnAMonster());
        }
        this.generateQuests(themes);

    }

    questsAvailableToTurnIn = ()=>{
        let ret:QuestObject[] = [];
        for(let quest of this.quests){
            if(quest.canTurnIn(this.observer)){
                ret.push(quest);
            }
        }
        return ret;
    }

    generateQuests = (themes: Theme[])=>{
        let quests = [...this.rand.pickXFrom(genericStartingQuests(),5)];

        const questsBeforeThemes = quests.length;

        for(let theme of themes){
            quests = [...quests, ...theme.quests];
        }
        const questsAfterThemes = quests.length;

        const amountNeededForPadding = 10-Math.max(0,questsAfterThemes-questsBeforeThemes);
        if(amountNeededForPadding>0){
            quests =[...quests, ...this.rand.pickXFrom(genericMiddleQuests(),amountNeededForPadding)];
        }

        //genericMiddleQuests
        quests = [...quests, ...this.rand.pickXFrom(genericEndingQuests(),2)];
       // quests = uniq(quests);

        for(let quest of quests){
            this.addQuest(quest);
        }

    }

    //if a quest didn't get  a god on creation nows the time
    returnGodForQuest = (quest: QuestObject)=>{
        console.log("JR NOTE: returnGodForQuest")
        if(quest.god_index ){
            console.log("JR NOTE: there was a god index and it was", quest.god_index);
            if(quest.god_index === GodDescription.CHOSEN){
                quest.god = this.chosen_god;
            }else if(quest.god_index === GodDescription.RIVAL) {
                quest.god = this.rival_god;
            }else if(quest.god_index === GodDescription.FIRST) {
                quest.god = this.gods[0]
            }else if(quest.god_index === GodDescription.SECOND) {
                quest.god = this.gods[1]
            }
        }else{
            quest.god = this.rand.pickFrom(this.gods);
        }

    }

    addQuest = (input_quest: QuestObject)=>{
        const quest = input_quest.copy();
        this.quests.push(quest);
        quest.companion = this.rand.pickFrom(this.companions)
        quest.theme_keys = this.theme_keys;
        quest.rand = this.rand;
        if(quest.god_index ){
            console.log("JR NOTE: there was a god index and it was", quest.god_index);
            if(quest.god_index === GodDescription.CHOSEN){
                quest.god = this.chosen_god;
            }else if(quest.god_index === GodDescription.RIVAL) {
                quest.god = this.rival_god;
            }else if(quest.god_index === GodDescription.FIRST) {
                quest.god = this.gods[0]
            }else if(quest.god_index === GodDescription.SECOND) {
                quest.god = this.gods[1]
            }
        }else{
            quest.god = this.rand.pickFrom(this.gods);
        }
        //  return rand.pickFrom(Object.values(theme.stats)).copy(parent.tier +1);
        if(!quest.stat){
            const chosen_theme = all_themes[this.rand.pickFrom(this.theme_keys)]
            quest.stat = this.rand.pickFrom(Object.values(chosen_theme.stats)).copy(3);
        }


    }

    shadowInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[]) => {
        this.class_name = class_name;
        this.aspect = aspect;
        this.title = this.generateTitle();
        let themes: Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        this.theme_keys = themes.map((x) => x.key);
        interests.forEach((interest) => { themes = themes.concat(interest.themes) });
        //assume companions aren't stuck at level 1 like you are plz
        themes.forEach((theme) => { this.addStats(theme.stats) });
        this.generateBackstory(themes, this.rand, 0);
        for (let i = 0; i < 3; i++) {
            this.inventory.push(this.generateItem());
        }
    }

    generateSkills = (themes: Theme[], rand: SeededRandom) => {
        if (this.skillGenAlg) {
            this.skills = this.skillGenAlg.generateSkills(this.class_name, this.aspect, this.interests, themes, rand);
            this.rootSkill = this.skills[0];
            this.rootSkill.unlocked = true;
            this.lastUnlockedSkill = this.rootSkill;
            this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, rand);
        }
    }

    generateBuildings = (themes: Theme[], rand: SeededRandom) => {
        this.buildings.push("Your House");
        this.buildingMetaData["Your House"] = new BuildingMetaData("Your House", this.order,themes, true, rand, []);
        this.current_location = this.buildings[0];
        for (let theme of themes) {
            let building: string = titleCase(rand.pickFrom(theme.getPossibilitiesFor(LOCATION)));
            if(this.order){
                building = "Building";
            }
            this.metaDataForOneBuilding(building, themes, rand,false)
            this.buildings.push(building);
        }
        //this is ONLY useful for the actual game which is purposefully stupid hard to find. :)
        this.positionNeighbors();
    }

    metaDataForOneBuilding = (building: string, themes: Theme[], rand: SeededRandom, locked: boolean) => {
        const items = [];
        if (rand.nextDouble() > 0.3) {
            items.push(this.generateItem());
        }
        this.buildingMetaData[building] = new BuildingMetaData(building, this.order, themes, locked? !locked:rand.nextDouble() > 0.5, rand, items);
    }


    positionNeighbors = () => {
        let remaining = [...this.buildings];
        for (let buildingMeta of Object.values(this.buildingMetaData)) {
            const toRemove = buildingMeta.assignNeighbors(remaining);
            for (let r of toRemove) {
                //you should at LEAST be able to get back to where you're going plz.
                if (!this.buildingMetaData[r].neighbors.includes(buildingMeta.key)) {
                    this.buildingMetaData[r].neighbors.push(buildingMeta.key);
                }
                removeItemOnce(remaining, r);
            }
        }
    }

    generateCompanions = (rand: SeededRandom) => {
        let max = rand.getRandomNumberBetween(1, this.theme_keys.length);
        if (this.theme_keys.includes(LONELY)) {
            max = 1;
        } else if (this.theme_keys.includes(FAMILY)) {
            max = max * 2;
        }
        for (let i = 0; i < max; i++) {

            this.companions.push(randomCompanion(rand,this.order));
        }
    }

    generateItem = () => {
        if(this.order){
            return "Item";
        }
        let themes: Theme[] = [];
        themes = themes.concat(this.class_name.themes)
        themes = themes.concat(this.aspect.themes);
        //since this is done on the fly, don't always allow interests in. focus on classpect.
        if (this.rand.nextDouble() > 0.3) {
            this.interests.forEach((interest) => { themes = themes.concat(interest.themes) });
        }
        const object_theme = this.rand.pickFrom(themes);
        if (this.rand.nextDouble() > 0.5) {
            return titleCase(object_theme.pickPossibilityFor(this.rand, OBJECT));
        } else {
            const modifier_theme = this.rand.pickFrom(themes);
            return titleCase(modifier_theme.pickPossibilityFor(this.rand, ADJ) + " " + object_theme.pickPossibilityFor(this.rand, OBJECT));
        }


    }

    generateBackstory = (themes: Theme[], rand: SeededRandom, num: number) => {
        if (this.backstory.length > 213 || num > 10) {
            this.backstory += ".";
            return;
        }
        let idea = "";
        let idea_seed;
        if (this.backstory.trim() === "") {
            idea_seed = rand.pickFrom(rand.pickFrom(themes).getPossibilitiesFor(CHILDBACKSTORY));
            this.backstory = `${this.fullName} ${idea_seed}`;

        } else {
            idea_seed = rand.pickFrom(rand.pickFrom(themes).getPossibilitiesFor(GENERALBACKSTORY));

            if (num === 1) {
                const transitions = ["Now they", "These days they", "In the present, they", "They", "Nowadays they"];
                idea = `. ${rand.pickFrom(transitions)} ${idea_seed}`;

            } else if (rand.nextDouble() > 0.5) {
                const transitions = ["They", "They also", "Additionally, they", "They"];

                idea = `. ${rand.pickFrom(transitions)} ${idea_seed}`;
            } else {
                const connection = ["and", "yet", "but"];
                idea = `, ${rand.pickFrom(connection)} ${idea_seed}`;

            }
        }
        if (!this.backstory.includes(idea_seed)) {
            this.backstory += idea;
        }
        this.generateBackstory(themes, rand, num + 1);
    }

    generateTitle = () => {
        if (this.rand.nextDouble() > 0.5) {
            return `${this.class_name.chosen_name} of ${this.aspect.chosen_name}`
        } else {
            return `${this.aspect.chosen_name} ${this.class_name.chosen_name}`
        }
    }

    initStats = (rand: SeededRandom) => {
        for (const key of Object.keys(all_stats)) {
            //0 is baseline neutral human
            let values = [1, 0, -1];

            const skill = all_stats[key].copy(rand.pickFrom(values));
            if(this.order){
                skill.positiveName = "Positive Stat";
                skill.negativeName = "Negative Stat";
            }
            this.stats[skill.key] = skill;
        }
        this.addStats(this.aspect.stats);
        for (const interest of this.interests) {
            this.addStats(interest.stats);
        }
    }

    //for each stat in the new map, add its value to your stats.
    addStats = (stats: StatMap) => {
        for (const key of Object.keys(stats)) {
            const newStat = stats[key];
            this.addStat(newStat);
        }
    }

    addStat = (stat: Stat) => {
        this.stats[stat.key].add(stat.value * this.class_name.stat_multiplier);
    }

    unlocked_skills_no_stats = () => { return this.skills.filter((skill) => { return skill.unlocked && (skill.type !== "StatSkill") }) };

    unlocked_skills = () => { return this.skills.filter((skill) => { return skill.unlocked }) };
    locked_skills = () => { return this.skills.filter((skill) => { return !skill.unlocked }) };

    canAffordSkill = (skill: Skill) => {
        return this.skillPoints >= skill.tier;
    }

    checkForApocalypseConditions = ()=>{
        let found:string[] = [];
        const types = artifacts.map((artifact)=>{return artifact.type});
        for(let skill of this.skills){
            if(types.includes(skill.type)){
                found.push(skill.type);
            }
        }
        if(uniq(found).length >= 9){
            (window as any).triggerApocalypse();
            return true;
        }
        return false;
    }

    unlockSkill = (found: Skill) => {
        this.lastUnlockedSkill = found;
        found.unlocked = true;
        this.skillPoints += -1 * found.tier;
        if (found.type === "StatSkill") {
            const stat = (found as StatSkill).stat;
            this.addStat(stat);
        } else if (found.type === "WasteSkill") {

            if ((window as any).haxMode) {
                //:) :) :)
                (window as any)[(found as WasteSkill).hackFunctionName](19191919);
            } else {
                (window as any).recordAction(HAX_FAIL, 1);
            }
        } else if (found.type === "CoreSkill") {
            this.observer.upgradeMenu(found.name);
        }
        this.checkIfCompletedSkillTree();
    }

    checkIfCompletedSkillTree = ()=>{
        for(let skill of this.skills){
            if(!skill.unlocked){
                return false;
            }
        }
        (window as any).setCreditsMode(true);
    }

    addSkillPoints = (points: number) => {
        this.skillPoints += points;
        this.observer.skillPointsGainedFromMenu += points;
    }

    spawnRandomTemple = ()=>{
        const god = this.rand.pickFrom(this.gods);
        const temple = spawnTempleForGod(this,god, this.rand);
        this.buildings.push(temple.key);
        this.buildingMetaData[temple.key] = temple;
        return temple;
    }

    spawnNotAMinotaur = () => {
        const NotAMinotaur = new Companion(this.rand)
        NotAMinotaur.fullName = "ThisIsNotAMinotaur";
        NotAMinotaur.backstory = this.rand.pickFrom(this.collateThemes()).pickPossibilityFor(this.rand, PHILOSOPHY);
        NotAMinotaur.title = "False Minotaur";
        this.companions.push(NotAMinotaur);
    }

    spawnAMonster = () => {
        window.localStorage[HORROR_KEY]=true;
        const monster = new Companion(this.rand)
        monster.fullName = "Shambling Horror With Your Face";
        const themes = this.collateThemes();

        monster.backstory = "It is a monster. It is you. You're a monster.";
        for(let theme of themes){
            monster.backstory += ` ${theme.pickPossibilityFor(this.rand, MONSTER_DESC)}`;
        }
        this.companions.push(monster);
        return monster;
    }

    findSkill = (skill_id: string) => {
        const found = this.skills.find((skill) => { return skill.cytoscapeID() === skill_id });
        if (found) {
            return found;
        }
        return null;
    }
}

function orderPlayer(rand: SeededRandom){
    console.log("JR NOTE: its an order player")
    const ret = new Player(all_classes["seer"], all_aspects["eye"], [all_interests["null"]],rand, false,true,false);
    ret.fullName = "Jeffery";
    ret.title = "Bringer of Order";
    for(let i = 0; i< ret.skills.length; i ++){
        ret.skills[i].name = "Skill " + (i+1);
    }
    ret.backstory = "They are a character in a video game. They were only just born. They have no memories.";
    //TODO make as much as possible manual
    return ret;
}

function chaosPlayer(rand: SeededRandom){
    const cl = rand.pickFrom(Object.values(all_classes_except_null));
    const ap = rand.pickFrom(Object.values(all_aspects_except_null));
    let i1 = rand.pickFrom(Object.values(all_interests_except_null));
    let i2 = rand.pickFrom(Object.values(all_interests_except_null));

    const ret = new Player(cl, ap,  [...Object.values(all_interests)], rand, false,false,true);

    return ret;
}

export function randomPlayer(rand: SeededRandom, shadowPlayer = false) {
    let apocalypse: string | null = getParameterByName("apocalypse", null);

    if(apocalypse && apocalypse === "chaos" && !shadowPlayer){
        return chaosPlayer(rand);
    }else if(apocalypse && !shadowPlayer){//very deliberately any kind of apocalypse besides order is chaos.  order has definitions, chaos does not.
        return orderPlayer(rand);
    }

    let cl;
    let url_class: string | null = shadowPlayer ? null : getParameterByName("class", null);
    let url_aspect: string | null = shadowPlayer ? null : getParameterByName("aspect", null);
    let url_i1: string | null = shadowPlayer ? null : getParameterByName("interest1", null);
    let url_i2: string | null = shadowPlayer ? null : getParameterByName("interest2", null);

    if (rand.initial_seed === 13) {
        cl = all_classes["waste"];
    } else {
        cl = url_class ? all_classes[url_class] : rand.pickFrom(Object.values(all_classes_except_null));
    }
    let ap = url_aspect ? all_aspects[url_aspect] : rand.pickFrom(Object.values(all_aspects_except_null));
    let i1 = url_i1 ? all_interests[url_i1] : rand.pickFrom(Object.values(all_interests_except_null));
    let i2 = url_i2 ? all_interests[url_i2] : rand.pickFrom(Object.values(all_interests_except_null));

    cl = cl ? cl : all_classes["null"];
    ap = ap ? ap : all_aspects["null"];
    i1 = i1 ? i1 : all_interests["null"];
    i2 = i2 ? i2 : all_interests["null"];

    const ret = new Player(cl, ap, [i1, i2], rand, shadowPlayer);
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
        const first_names = ["Ria","Devona","Neville","Witherby","Camille","Craig","John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Eve","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];
        const last_names = ["Researcher","Gently","Egbert","Claire","Lalonde","Strider","Hussain","King","Stoker","Sims","Blackwood","Barker","James","Blake","Dalon","Vasil","Hebert","Jensen","Lindt","Newell","Laborn","Fell","Wilbourn","Livsey","Lamb","Bacama","Kharun","Reynolds","Braggi","Seelee","Cassan","Folnir","Citato","Grigor","Crew","Robertson","Fairchild","Lukas","Richardson","Dominguez","Cane","Salesa","Shelly"];
        this.fullName = `${ rand.pickFrom(first_names) } ${ rand.pickFrom(last_names) }`;
        this.theme_keys = shadowPlayer.theme_keys;//needed for shoving them into quests
        this.loyalty = shadowPlayer.stats[LOYAL].value;
        this.inventory = shadowPlayer.inventory;
    }

    toString=()=>{
        return this.fullName;
    }



}

export const randomCompanion = (rand: SeededRandom,order: boolean, fullName?:string, backstory?:string, title?: string)=>{
    const friend = new Companion(rand);
    if(order){
        friend.fullName = "Friend";
        friend.backstory = "They are an NPC in a video game. They have no memory.";
        friend.title = "NPC";
    }else{
        if(fullName){
            friend.fullName = fullName;
        }
        if(backstory){
            friend.backstory = backstory;
        }
        if(title){
            friend.title = title;
        }
    }
    return friend;
}