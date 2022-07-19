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
    "z": "W",
    "0":"http://gigglesnort.info/PressReleases/", //kr's branch
    "1":"http://knucklessux.com/HydrationSim/", //a lure for the unwary, but not for you. you're already caught
    "2":"http://knucklessux.com/PuzzleBox/Secrets/", //it was irrelevant but now the quotidians are colonizing
    "3":"http://farragofiction.com/CodexOfRuin/", //so many paths here, is this your first time seeing it?
    "4":"SBURBSim/index2.html?seed=owowhatsthis ", //i never noticed if anyone ever found this
    "5":"http://farragofiction.com/ATranscript/", //perhaps you've never seen this before? if not, where have you seen it?
    "6":"http://farragofiction.com/ZampanioHotlink/", //when is a door not a door?
    "7":"http://farragofiction.com/LOMAT/", //do you see how it connects?
    "8":"https://farragnarok.com/DoYouSeeHowItConnects",//how it all connects
    "9":"https://archiveofourown.org/works/34187848",//9 artifacts


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
export const passwords :PasswordMap = {
    //quest rewards, both real and game mode drop these. you can't get ALL of them without going into game mode  "MallMusicMuzakMallOf1974/"
    
    "ALT": new Secret("A Series of IDS: 1",[new SourceDurationPair("Secrets/ALT/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 01 Mall Open.mp3", "Secrets/ALT/0.js")
    ,"APOCALYPSE CHICK": new Secret("A Series of IDS: 2",[new SourceDurationPair("Secrets/APOCALYPSECHICK/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 02 Sale Of The Seventies.mp3", "Secrets/APOCALYPSECHICK/0.js")
    ,"THE CLOSER": new Secret("A Series of IDS: 3",[new SourceDurationPair("Secrets/CLOSER/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 03 Third Floor Spending Spree.mp3", "Secrets/CLOSER/0.js")
    ,"THE DEVIL OF SPIRALS": new Secret("A Series of IDS: 4",[new SourceDurationPair("Secrets/DEVILOFSPIRALS/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 04 Food Court Calling.mp3", "Secrets/DEVILOFSPIRALS/0.js")
    ,"THE END": new Secret("A Series of IDS: 5",[new SourceDurationPair("Secrets/END/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 05 Grocery Grabbing.mp3", "Secrets/END/0.js")
    ,"THE EYE KILLER": new Secret("A Series of IDS: 6",[new SourceDurationPair("Secrets/EYEKILLER/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 06 The Fountain Of Life.mp3", "Secrets/EYEKILLER/0.js")
    ,"FLOWER CHICK": new Secret("A Series of IDS: 7",[new SourceDurationPair("Secrets/FLOWERCHICK/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 07 Phonebooth Call To Home.mp3", "Secrets/FLOWERCHICK/0.js")
    ,"HIMBO": new Secret("A Series of IDS: 8",[new SourceDurationPair("Secrets/HIMBO/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 08 Restroom Retreat.mp3", "Secrets/HIMBO/0.js")
    ,"HOSTAGE": new Secret("A Series of IDS: 9",[new SourceDurationPair("Secrets/HOSTAGE/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 09 Impulse Purchase (Part 1).mp3", "Secrets/HOSTAGE/0.js")
    ,"THE INTERN": new Secret("A Series of IDS: 10",[new SourceDurationPair("Secrets/INTERN/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 10 Cash Or Cheque.mp3", "Secrets/INTERN/0.js")
    ,"INVERTED CENTAUR": new Secret("A Series of IDS: 11",[new SourceDurationPair("Secrets/MATCH/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 11 Checkout 2 Now Open.mp3", "Secrets/INVERTEDCENTAUR/0.js")
    ,"THE MATCH": new Secret("A Series of IDS: 12",[new SourceDurationPair("Secrets/MATCH/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 12 Impulse Purchase (Part 2).mp3", "Secrets/MATCH/0.js")
    ,"MINOTAUR": new Secret("A Series of IDS: 13",[new SourceDurationPair("Secrets/MINOTAUR/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 13 Parking Lot Lost.mp3", "Secrets/MINOTAUR/0.js")
    ,"NOT A MINOTAUR": new Secret("A Series of IDS: 14",[new SourceDurationPair("Secrets/NAM/0.jpg",2)],"MallMusicMuzakMallOf1974/Mall Music Muzak - Mall Of 1974 - 14 Mall Closed.mp3", "Secrets/NAM/0.js")
    ,"THE NEIGHBOR": new Secret("A Series of IDS: 15",[new SourceDurationPair("Secrets/NEIGHBOR/0.jpg",2)],undefined, "Secrets/NEIGHBOR/0.js")
    
    ,"TYRFING": new Secret("Thoughts.",[new SourceDurationPair("Secrets/TYRFING/0.jpg",2)],undefined, "Secrets/TYRFING/0.js")


    ,"TRUTH": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/TRUTH/0.jpg",2)],undefined, "Secrets/TRUTH/0.js")
    ,"RONIN": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/RONIN/0.jpg",2)],undefined, "Secrets/RONIN/0.js")
    ,"THE WIGGLER EATER": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/THEWIGGLEREATER/0.jpg",2)],undefined, "Secrets/THEWIGGLEREATER/0.js")
    ,"THE WANDERER": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/WANDERER/0.jpg",2)],undefined, "Secrets/WANDERER/0.js")
    ,"THE TWINS": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/TWINS/0.jpg",2)],undefined, "Secrets/TWINS/0.js")
    ,"THE SOLEMN": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/SOLEMN/0.jpg",2)],undefined, "Secrets/SOLEMN/0.js")
    ,"THE END IS NEVER THE END": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/THEENDISNEVERTHEEND/clown.png",2)],undefined, "Secrets/THEENDISNEVERTHEEND/0.js")
    ,"YOU IS NEEDED TO END THE WORLD": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/YOUISNEEDEDTOENDTHEWORLD/0.jpg",2)],undefined, "Secrets/YOUISNEEDEDTOENDTHEWORLD/0.js")
    ,"https://www.youtube.com/watch?v=WOrF94annCY": new Secret("Quorum Quantified",[new SourceDurationPair("Secrets/YOUTUBE/0.jpg",2)],undefined, "Secrets/YOUTUBE/0.js")

    ,"THE TRUTH IS LAYERED": new Secret("L-O-R4 Daily Logs: 1",[new SourceDurationPair("Secrets/THETRUTHISLAYERED/0.jpg",2)],undefined, "Secrets/THETRUTHISLAYERED/0.js")
    ,"THE END IS NEVER": new Secret("Clown Diary",[new SourceDurationPair("Secrets/THEENDISNEVER/clown.png",2)],undefined, "Secrets/THEENDISNEVER/0.js")

    ,"7342": new Secret("L-O-R4 Daily Logs: 2",[new SourceDurationPair("Secrets/7342/0.jpg",2)],undefined, "Secrets/7342/0.js")
    
    
    ,"OBSESSION LEADS TO RUIN": new Secret("Clown Diary",[new SourceDurationPair("Secrets/THEENDISNEVER/clown.png",2)],undefined, "Secrets/THEENDISNEVER/0.js")

    ,"1365": new Secret("L-O-R4 Daily Logs: 3",[new SourceDurationPair("Secrets/1365/0.jpg",2)],undefined, "Secrets/1365/0.js")
    ,"217": new Secret("L-O-R4 Daily Logs: 4",[new SourceDurationPair("Secrets/217/0.jpg",2)],undefined, "Secrets/217/0.js")
    ,"THE FOOL IS HURT": new Secret("L-O-R4 Daily Logs: 5",[new SourceDurationPair("Secrets/THEFOOLISHURT/0.jpg",2)],undefined, "Secrets/THEFOOLISHURT/0.js")
    ,"EVERYTHING IS CONNECTED": new Secret("L-O-R4 Daily Logs: 6",[new SourceDurationPair("Secrets/EVERYTHINGISCONNECTED/0.jpg",2)],undefined, "Secrets/EVERYTHINGISCONNECTED/0.js")
    ,"IT HAS COLONIZED YOUR MIND ALREADY": new Secret("A(n Un)Sent Letter.",[new SourceDurationPair("Secrets/ithascolonizedyourmindalready/0.jpg",2)],undefined, "Secrets/ithascolonizedyourmindalready/0.js")

};//omg easter egg lolol!!!!!!111!!1

//ithascolonizedyourmindalready from itch.io