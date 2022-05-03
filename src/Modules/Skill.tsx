import SeededRandom from "../Utils/SeededRandom";
import { sentenceCase, titleCase } from "../Utils/StringUtils";
import { Stat } from "./Stat";
import { Theme } from "./Theme";
import { ADJ, LOCATION, PERSON, OBJECT, EFFECTS } from "./ThemeStorage";
/*TODO
    * subtype of skill that isn't procedurally generated and instead has core functionality
    (such as unlocking stat screens)
    * subtype of skill that IS procedurally generated and also has core functionality (buffing stat etc)
*/
export class Skill {
    type = "Skill";
    name: string;
    tier: number; //TODO should map to cost
    parents: Skill[] = []; //will be set by player
    children: Skill[] = []; //will be set by player
    theme_keys: string[];
    description = "TODO";
    unlocked: boolean = false;  //TODO this should default to false once no longer developing.

    constructor(themes: Theme[] = [], seeded_random: SeededRandom | null) {
        this.name = "Debug";
        this.tier = -13;
        this.theme_keys = [];
        if (themes && seeded_random) {
            this.init(themes, seeded_random);
        }
    }

    //separated so we can pass null in to both
    init = (themes: Theme[] = [], seeded_random: SeededRandom) => {
        this.name = this.generateName(themes, seeded_random);
        this.description = generateDescription(themes, seeded_random);
        if (themes && themes.length > 0) {
            this.theme_keys = themes.map((x) => x.key);
            interface ThemeReducer {
                tier: number;
            }
            const theme_tiers: ThemeReducer[] = themes.map((x) => { return { tier: x.tier } });
            this.tier = theme_tiers.reduce((a: ThemeReducer, c: ThemeReducer) => { return { tier: a ? a.tier + c.tier : c.tier } }).tier;
        } else {
            this.theme_keys = [];
            this.tier = 0;
        }
    }


    generateName = (themes: Theme[], seeded_random: SeededRandom) => {
        const generic_bits = ["beam", "touch", "ray", "aura", "signal"];
        const noun_types = [PERSON, LOCATION, OBJECT];
        if (themes.length === 1) {
            const noun = titleCase(themes[0].pickPossibilityFor(seeded_random, seeded_random.pickFrom(noun_types)));
            const adj = titleCase(themes[0].pickPossibilityFor(seeded_random, ADJ));
            const generic = titleCase(seeded_random.pickFrom(generic_bits));
            const options = [`${adj} ${noun}`, `${noun}`, `${noun} ${generic}`, `${adj} ${generic}`, `${generic} of ${noun}`];

            return seeded_random.pickFrom(options);
        } else if (themes.length === 2) {
            const first_noun = titleCase(themes[0].pickPossibilityFor(seeded_random, seeded_random.pickFrom(noun_types)));
            const first_adj = titleCase(themes[0].pickPossibilityFor(seeded_random, ADJ));

            const second_noun = titleCase(themes[1].pickPossibilityFor(seeded_random, seeded_random.pickFrom(noun_types)));
            const second_adj = titleCase(themes[1].pickPossibilityFor(seeded_random, ADJ));

            const options = [`${first_noun}'s ${second_noun}`, `${first_noun} ${second_noun}`, `${first_noun} of ${second_adj}`, `${first_adj} ${second_noun}`, `${second_adj} ${first_noun}`, `${first_noun} of ${second_noun}s`];
            return seeded_random.pickFrom(options);
        } else if (themes.length === 0) {
            return "ERROR: no themes found";
        } else
            return "ERROR: more than two themes not yet supported";
    }

    toString = () => {
        return this.name;
    }

    cytoscapeID = () => {
        return `${this.name}`;
    }

    convertToCytoscape = () => {
        let styles: any = { 'background-color': 'green' };
        if (!this.unlocked) {
            if (this.parents.filter((parent) => parent.unlocked).length === this.parents.length) {
                styles["opacity"] = "0.33";
            } else {
                styles["display"] = "none";
            }
        }
        const ret: any[] = [{ data: { id: this.cytoscapeID(), label: this.name }, grabbable: false, style: styles }];



        for (const child of this.children) {
            if (this.unlocked && !child.unlocked) {
                ret.push({ data: { source: this.cytoscapeID(), target: child.cytoscapeID(), label: '' }, classes: [(this.unlocked && child.unlocked) ? "visible" : "void"] });
            } else {
                ret.push({ data: { source: this.cytoscapeID(), target: child.cytoscapeID(), label: '' }, classes: [(this.unlocked && child.unlocked) ? "visible" : "void"], style: { opacity: "0.2" } });
            }
        }
        return ret;
    }


}


export const generateDescription =(themes: Theme[], seeded_random: SeededRandom)=> {
    if (themes.length === 0) {
        return "";
    } else if (themes.length > 2) {
        return "ERROR: more than two themes not yet supported";
    }
    if (themes.length === 1) {
        return sentenceCase(themes[0].pickPossibilityFor(seeded_random, EFFECTS));
    } else {
        const transitions = ["while","as","just as","at the same time as","just before"];
        return `${sentenceCase(themes[0].pickPossibilityFor(seeded_random, EFFECTS))} ${seeded_random.pickFrom(transitions)} ${themes[1].pickPossibilityFor(seeded_random, EFFECTS)}`;
    }
}


export class SpecialSkill extends Skill {
    type = "SpecialSkill";
    theme_keys: string[] = [];
    unlocked: boolean = false;
    constructor() {
        super([], null);
    }
}

export class CustomSkill extends SpecialSkill{
    type = "CustomSkill";
    unlocked: boolean = true;
    constructor(name: string,  tier: number,description: string) {
        super();
        this.name = name;
        this.tier = tier;
        this.description =description;
    }

    copy =()=>{
        return new CustomSkill(this.name, this.tier, this.description);
    }
}

export class NovumMirror extends CustomSkill{
    type = "NovumMirror";
    unlocked: boolean = true;
    constructor() {
        super("NOVUM MIRROR",9,(window as any).chaos? "An ornate but tarnished silver mirror, with a 9 carved onto the back. It reflects everyting but faces.  If you shatter the mirror you can never be photographed again nor can anyone who photographs you. No image of you or those you affect can be created past a certain skillpoint, as well. The shattering does not last long.":"An ornate but tarnished silver mirror, with a 9 carved onto the back. If you take a picture of it it will permanently crack and all effects from it will be dispelled. Mundane means will no longer prevent anyone previously effected by it from being photographed and in fact cameras will go out of their way to document them.");
    }
}

export class Octome extends CustomSkill{
    type = "Octome";
    unlocked: boolean = true;
    constructor() {
        super("OCTOME",8,(window as any).chaos? "A crumbling leather book with seemingly latin script, with messily torn pages.  There is an 8 embossed onto the back. If you tear one its pages everyone nearby permanently can not be written about and any writing about them is erased. Additionally, everyone but the tearer dies instantly.":"A crumbling leather book with seemingly latin script, with messily torn pages.  There is an 8 embossed onto the back.  If you repair any of its pages, or add new pages to it all knowledge erased by it is permanently restored and can not be erased again by mundane means. People will find themselves drawn unnaturally to this restored information and it will be very easy to find.");
    }
}

export class SeptemCoin extends CustomSkill{
    type = "SeptemCoin";
    unlocked: boolean = true;
    constructor() {
        super("SEPTEM COIN",7,(window as any).chaos? "An old bronze coin. There is a theater mask on one side, and a 7 on the other. Anyone who possesses it physicaly will go unremarked. They will be perfectly expected and normal wherever they are.":"An old bronze coin. There is a theater mask on one side, and a 7 on the other.  If you render this unrecognizable as a coin (such as melting it down) all previous owners of the coin will be able to retroactively be remarked on. In the present and future, they will stand out horribly in crowds.");
    }
}

export class Sextant extends CustomSkill{
    type = "Sextant";
    unlocked: boolean = true;
    constructor() {
        super("SEXTANT",6,(window as any).chaos? "A highly polished brass sextant. There is a 6 carved onto the main knob.  When activated via twisting the main knob, anyone possessing the sextant is temporarily unable to be located by any means, even observation. Anyone within range besides the activator is instantly killed.":"A highly polished brass sextant. There is a 6 carved onto the main knob. If you unscrew the knob, anything previously undectable (by *any* means) is now somehow more real than anything else. More visible, louder, with a stronger scent/taste, etc.");
    }
}

export class CinqueCloak extends CustomSkill{
    type = "CinqueCloak";
    unlocked: boolean = true;
    constructor() {
        super("CINQUE CLOAK",5,(window as any).chaos? "A simple matte black cloak with a 5 embroidered on the back in shiny black thread. Anyone who wears it finds themeselves permanently considered to be a stranger to their friends/family/enemies who forget they ever existed. Any connections they make can not move past ACQUAINTANCE without being reset. ":"A simple matte black cloak with a 5 embroidered on the back in shiny black thread. If you dab the blood of someone who once knew you well onto it all bonds obscured by it are restored and improved. Mere casual friends now know and think about their target as much as someone they grew up with (for good or bad).");
    }
}

export class QuatroBlade extends CustomSkill{
    type = "QuatroBlade";
    unlocked: boolean = true;
    constructor() {
        super("QUATTOR BLADE",4,(window as any).chaos? "A dull straight razor stained with blood, a number 4 is etched onto the side of the blade. Stabbing it into flesh causes a wound that no one can acknowledge but the wielder. Even the smallest cuts can result in bleeding out/death by infection as a result. ":"A dull straight razor stained with blood, a number 4 is etched onto the side of the blade. If you clean and sharpen it all wounds on any prior victims of it are now incredibly visible and it is immediately obvious to all who see them how to best treat them.");
    }
}

export class TresBottle extends CustomSkill{
    type = "TresBottle";
    unlocked: boolean = true;
    constructor() {
        super("TRES BOTTLE",3,(window as any).chaos? "A simple glass milk bottle with a 3 emblazoned  on it. If you put a scrap of paper with something written on it, everyone will forget that concept or fact.":"A simple glass milk bottle with a 3 emblazened on it. If you fill the bottle with liquid to disolve the paper/ink inside, all information inside will instantly fill the minds of everyone in the world.");
    }
}

export class DuoMask extends CustomSkill{
    type = "DuoMask";
    unlocked: boolean = true;
    constructor() {
        super("DUO MASK",2,(window as any).chaos? "A faceless theater mask with a 2 on the inside of the forehead. If you wear the mask you can make a copy of any person you see that is a SHAMBLING HORROR WITH THEIR FACE. The HORROR will stalk them eternally until they can catch them, kill them, and replace them.":"A faceless theater mask with a 2 on the inside of the forehead. You cannot stop the SHAMBLING HORROR WITH NO FACE that stalks you. Even if you may be able to disrupt the DUO MASK in the real Zampanio, you can not here. It is your own fault.");
    }
}

export class UnusAutographBook extends CustomSkill{
    type = "UnusAutographBook";
    unlocked: boolean = true;
    constructor() {
        super("UNUS AUTOGRAPH BOOK",1,(window as any).chaos? "A tattered cardboard book filled with signatures with an ornate serif '1' embossed onto it. Your signature is already in it. You do not remember your name. No one does. You are only PLAYER.":"A tattered cardboard book filled with signatures with an ornate serif '1' embossed onto it. Even destroying the book will not restore your name to you, PLAYER. You are not real. None of this is. But you're the one insisting we all pretend its a game. This is your fault.");
    }
}

export const artifacts = [new UnusAutographBook(), new DuoMask(), new TresBottle(), new QuatroBlade(), new CinqueCloak(), new Sextant(), new SeptemCoin(), new Octome(), new NovumMirror()];

let numCoreSkills = 0;

export class CoreSkill extends SpecialSkill {
    type = "CoreSkill";
    name: string;
    tier: number;
    key: number;
    theme_keys: string[] = [];
    unlocked: boolean = false;
    constructor(menu_item: string, tier: number) {
        super();
        numStatSkills++;
        this.key = numStatSkills;
        this.name = `${menu_item}+1`;
        this.tier = tier;
    }

    cytoscapeID = () => {
        return `${this.name}${this.key}`;
    }
}

let numStatSkills = 0;
//todo if this gets unweildly at least put the list of functions in ObserverBot
export const wasteHackingFunctions = ["hackBackstoryMenuLevel", "hackInventoryMenuLevel", "hackStatisticsMenuLevel", "hackGodsMenuLevel", "hackCityBuildingMenuLevel", "hackCompanionsMenuLevel", "hackStatisticsMenuLevel", "hackOptionsMenuLevel", "hackTimePlayedInSeconds"];
export const dangerousWasteHackingFunctions = ["hackSkillPointsGainedFromBattle", "hackCityMorale", "hackTimeCombatInSeconds", "hackTimeCutscenesInSeconds", "hackTimeCitybuildingInSeconds"];

export class WasteSkill extends SpecialSkill {
    type = "WasteSkill";

    hackFunctionName: string; //can call it via window["name"].

    constructor(hackFunction: string) {
        super();
        this.hackFunctionName = hackFunction;
        this.name = `window.${this.hackFunctionName}`;
    }
}

export class StatSkill extends SpecialSkill {
    type = "StatSkill";
    name: string;
    tier: number;
    stat: Stat;
    key: number;
    theme_keys: string[] = [];
    unlocked: boolean = false; //todo make this default to false
    constructor(stat: Stat, tier: number) {
        super();
        numStatSkills++;
        this.key = numStatSkills;
        this.stat = stat;
        this.tier = tier;
        const dir = stat.value > 0 ? "+" : "-";
        this.name = `${stat.name()} ${dir} ${stat.absolute_value()}`;
        this.tier = tier;
    }

    cytoscapeID = () => {
        return `${this.stat.name()}${this.key}`;
    }


}
