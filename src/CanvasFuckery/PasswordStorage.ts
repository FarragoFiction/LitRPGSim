//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you
//if you want to SHOW UP then what you do is figure out where these passwords are leaked :) :) :)
//if anyone can explain the origin of each one you'll unlock secret content directly from me
//hell, if you can even do a majority I'd love to hear it, in all sincerity. I love hearing people find my work interesting :)


//look, okay, al bhed from ffx is something that for *some* percent of the population feels in their bones
//so this will drive home a nagging sense of familiarity, that it MUST be important
//at the same time when you look at it in writing it's gibberish
//but when you hear it spoken it flirts with being just phonetic english with an accent
//it vibes perfectly with the sense of misleading truths and lies with a core of truth
//ABCDEFGHIJKLMNOPQRSTUVWXYZ
//YPLTAVKREZGMSHUBXNCDIJFQOW
//https://lingojam.com/AlBhedTranslator you're welcome
export const albhed_map = {
    "a":"Y",
    "b":"P",
    "c":"L",
    "d":"T",
    "e":"A",
    "f":"V",
    "g": "K",
    "h": "R",
    "i": "E",
    "j": "Z",
    "k": "G",
    "l": "M",
    "m": "S",
    "n": "H",
    "o": "U",
    "p": "B",
    "q": "X",
    "r": "N",
    "s": "C",
    "t": "D",
    "u": "I",
    "v": "J",
    "w": "F",
    "x": "Q",
    "y": "O",
    "z": "W"

}

export class Secret{
    frames: SourceDurationPair[];
    music_file_name: string|undefined;
    text: string;
    title: string;
    constructor(title: string, frames: SourceDurationPair[], music_file_name: string|undefined, text: string){
        this.frames = frames;
        this.music_file_name = music_file_name;
        this.text = text;
        this.title = title;

    }

}

export class SourceDurationPair{
    source: string;
    durationInFrames: number;
    constructor(source: string, durationInFrames: number){
        this.source = source;
        this.durationInFrames = durationInFrames;
    }

}


export interface PasswordMap {
    [details: string] : Secret;
}
/*
each password has a cctv feed (or at least a list of animation frames loaders (src and duration)?), an optional voice section, an optional text section (print out under cctv ffed)
*/
export const passwords:PasswordMap = {
    //quest rewards, both real and game mode drop these. you can't get ALL of them without going into game mode
    
    "ALT": new Secret("A Series of IDS: 1",[new SourceDurationPair("Secrets/ALT/0.jpg",2)],undefined, "Secrets/ALT/0.js")
    ,"APOCALYPSE CHICK": new Secret("A Series of IDS: 2",[new SourceDurationPair("Secrets/APOCALYPSECHICK/0.jpg",2)],undefined, "Secrets/APOCALYPSECHICK/0.js")
    ,"THE CLOSER": new Secret("A Series of IDS: 3",[new SourceDurationPair("Secrets/THECLOSER/0.jpg",2)],undefined, "Secrets/THECLOSER/0.js")
    ,"THE DEVIL OF SPIRALS": new Secret("A Series of IDS: 4",[new SourceDurationPair("Secrets/DEVILOFSPIRALS/0.jpg",2)],undefined, "Secrets/DEVILOFSPIRALS/0.js")
    ,"THE END": new Secret("A Series of IDS: 5",[new SourceDurationPair("Secrets/END/0.jpg",2)],undefined, "Secrets/END/0.js")
    ,"THE EYE KILLER": new Secret("A Series of IDS: 6",[new SourceDurationPair("Secrets/EYEKILLER/0.jpg",2)],undefined, "Secrets/EYEKILLER/0.js")
    ,"FLOWER CHICK": new Secret("A Series of IDS: 7",[new SourceDurationPair("Secrets/FLOWERCHICK/0.jpg",2)],undefined, "Secrets/FLOWERCHICK/0.js")
    ,"HIMBO": new Secret("A Series of IDS: 8",[new SourceDurationPair("Secrets/HIMBO/0.jpg",2)],undefined, "Secrets/HIMBO/0.js")
    ,"HOSTAGE": new Secret("A Series of IDS: 9",[new SourceDurationPair("Secrets/HOSTAGE/0.jpg",2)],undefined, "Secrets/HOSTAGE/0.js")
    ,"THE INTERN": new Secret("A Series of IDS: 10",[new SourceDurationPair("Secrets/INTERN/0.jpg",2)],undefined, "Secrets/INTERN/0.js")
    ,"INVERTED CENTAUR": new Secret("A Series of IDS: 11",[new SourceDurationPair("Secrets/MATCH/0.jpg",2)],undefined, "Secrets/INVERTEDCENTAUR/0.js")
    ,"THE MATCH": new Secret("A Series of IDS: 12",[new SourceDurationPair("Secrets/MATCH/0.jpg",2)],undefined, "Secrets/MATCH/0.js")
    ,"MINOTAUR": new Secret("A Series of IDS: 13",[new SourceDurationPair("Secrets/JR/0.jpg",2)],undefined, "Secrets/JR/0.js")
    ,"NOT A MINOTAUR": new Secret("A Series of IDS: 14",[new SourceDurationPair("Secrets/NAM/0.jpg",2)],undefined, "Secrets/NAM/0.js")
    ,"THE NEIGHBOR": new Secret("A Series of IDS: 15",[new SourceDurationPair("Secrets/NEIGHBOR/0.jpg",2)],undefined, "Secrets/NEIGHBOR/0.js")
    ,"TYRFING": new Secret("Thoughts.",[new SourceDurationPair("Secrets/TYRFING/0.jpg",2)],undefined, "Secrets/TYRFING/0.js")




    ,"TRUTH": new Secret("Unknown",[new SourceDurationPair("Secrets/TRUTH/0.jpg",2)],undefined, "Secrets/TRUTH/0.js")
    ,"RONIN": new Secret("Unknown",[new SourceDurationPair("Secrets/RONIN/0.jpg",2)],undefined, "Secrets/RONIN/0.js")
    ,"THE WIGGLER EATER": new Secret("Unknown",[new SourceDurationPair("Secrets/THEWIGGLEREATER/0.jpg",2)],undefined, "Secrets/THEWIGGLEREATER/0.js")
    ,"THE WANDERER": new Secret("Unknown",[new SourceDurationPair("Secrets/WANDERER/0.jpg",2)],undefined, "Secrets/WANDERER/0.js")
    ,"THE TWINS": new Secret("Unknown",[new SourceDurationPair("Secrets/TWINS/0.jpg",2)],undefined, "Secrets/TWINS/0.js")
    ,"THE SOLEMN": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"https://www.youtube.com/watch?v=WOrF94annCY": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"THE END IS NEVER THE END": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"YOU IS NEEDED TO END THE WORLD": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"THE TRUTH IS LAYERED": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"7342": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"1365": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"216": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"THE FOOL IS HURT": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"EVERYTHING IS CONNECTED": new Secret("Unknown",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
};//omg easter egg lolol!!!!!!111!!1