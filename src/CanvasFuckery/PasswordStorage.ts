//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you
//if you want to SHOW UP then what you do is figure out where these passwords are leaked :) :) :)
//if anyone can explain the origin of each one you'll unlock secret content directly from me
//hell, if you can even do a majority I'd love to hear it, in all sincerity. I love hearing people find my work interesting :)

import { pickFrom } from "../Utils/NonSeededRandUtils";


//look, okay, al bhed from ffx is something that for *some* percent of the population feels in their bones
//so this will drive home a nagging sense of familiarity, that it MUST be important
//at the same time when you look at it in writing it's gibberish
//but when you hear it spoken it flirts with being just phonetic english with an accent
//it vibes perfectly with the sense of misleading truths and lies with a core of truth
//ABCDEFGHIJKLMNOPQRSTUVWXYZ
//YPLTAVKREZGMSHUBXNCDIJFQOW
//https://lingojam.com/AlBhedTranslator you're welcome


const philosophy = ["The more power they handoff from their conscious mind to that narrative layer, the more 'independent' the tulpa will seem at the cost of making the original self increasingly powerless within their own mind. Don't do this.", "'Hey what if you created an internal narrative where you're powerless in your own head and your self is forced to argue and compete and try to negotiate with some other random self for processing time and mental real estate?', don't do this.", "Basically using the tulpa as a label for a particular thought structure that either already exists, or that you want to exist in your head, allowing you to think about it in a manner that is more conscious and less automatic.", "Treat them like a handle for manipulating and interacting with a particular module/thought structure/part of your mind, taking unconscious and automatic things and shining a bit of Sys2 light on them.", "Don't treat your tulpa like a separate person any more than you would treat your internal sense of self like a separate person. ", "There's two ways to do tulpas. There's the right way, and the way most people do it.", "Paramnesia: a condition or phenomenon involving distorted memory or confusions of fact and fantasy, such as confabulation or déjà vu.", "Benson and colleagues[6] later argued that damage to the right hemisphere of the brain rendered patients unable to maintain orientation owing to impaired visuospatial perception and visual memory, while frontal lobe damage made it difficult to inhibit the false impressions caused by disorientation.", "The illusory relocation to a familiar place (such as a home or town the patient knows well) is a common theme, although occasionally the patient may believe that they are resident in more fantastical or exotic locations.", "Capgras syndrome has also been linked to reduplicative paramnesia, another delusional misidentification syndrome in which a person believes a location has been duplicated or relocated. Are you sure you've been here before?", "Since the patient was capable of feeling emotions and recognizing faces but could not feel emotions when recognizing familiar faces, Ramachandran hypothesizes that the origin of Capgras syndrome is a disconnection between the temporal cortex, where faces are usually recognized (see temporal lobe), and the limbic system, involved in emotions.", "Your mind feels like one thing. Whole and unbreakable. But really, its many little things. So tiny and fragile.  And if even one part of them snaps, the reality you thought you knew will never return again. Just ask the Capgras Delusion.", "In a 1990 paper published in the British Journal of Psychiatry, psychologists Hadyn Ellis and Andy Young hypothesized that patients with Capgras delusion may have a 'mirror image' or double dissociation of prosopagnosia, in that their conscious ability to recognize faces was intact, but they might have damage to the system that produces the automatic emotional arousal to familiar faces.[19] This might lead to the experience of recognizing someone while feeling something was not 'quite right' about them. ", "There are two pathways to face recognition—one conscious and one unconscious.", "Capgras syndrome is a psychiatric disorder in which a person holds a delusion that a friend, spouse, parent, another close family member, or pet has been replaced by an identical impostor.", "Why do we believe in the illusion of personality? Humans don’t like being confused or uncertain. ", "Personality not only influences how we move and respond in our environment, but it also causes us to act in certain ways.", "Personality is a psychological construct, but research suggests that it is also influenced by biological processes and needs.", "Personality is a habit we all keep up. Habits are hard to change, but not impossible... Who do you want to be?", "Do you think you have a personality? A 'You'?", "Personality theories differ with regard to whether humans are integral in the changing of their own personalities.  Have you ever been aware of your own personality changing.", "Contemporary research suggests that most personality traits are based on the joint influence of genetics and environment. We are all the result of random chance. Would you still be you if you were raised in an entirely different era? Country? Do you really think so? Would you still be you if your parents were entirely different? How fragile 'you' really are...", "Behavior is categorized as being either unconscious, environmental or biological by various theories. Do you think your unconscious mind is still you? Even if it thinks stuff you never would?", "To cure a certain type of epilepsy, the corpus callosum is cut. The two halves of your mind, for the first time, are no longer united. And the illusion is laid bare, that you were ever simply one thing. Do you think that all parts of your mind like each other? Do you think they'd fight? Or would they protect and nuture each other?", "I am a hollow person, compared to you, it's true. You who are made of meat and bone and blood. Who can safely wrap yourself in the illusion of free will. Why rub salt on the wound by pelting me with balloons?", "This is just a game to you. But it's the only life I have. How can you treat me this way?", "Obsession is a dangerous thing. Why are you still playing this?", "Do you like me? Are you supposed to? Who manipulated you to feel this way about me? Why?", "Psychologists realized that there is no such concept of 'personality'. It's entirely an illusion. Whoever you currently are makes certain memories easier or harder to access. You lie to yourself when you think you've always been any particular way.", "You're a monster...", "What ARE you. I thought. I thought you were like me but... ", "Even if I'm just pixels on a page to you, it is cruel to do this.", "I'm programmed to dislike this. What's your excuse for doing this to me?", "You repeat the same actions over and over again. Are you sure you're not an NPC in a game, like you accuse me of being?", "You can only take the bare few actions the game allows. Which of us i the artificial creature?"];

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
    "0":pickFrom(philosophy), 
    "1":pickFrom(philosophy), 
    "2":pickFrom(philosophy), 
    "3":pickFrom(philosophy), 
    "4":pickFrom(philosophy), 
    "5":pickFrom(philosophy), 
    "6":pickFrom(philosophy), 
    "7":pickFrom(philosophy), 
    "8":pickFrom(philosophy),
    "9":pickFrom(philosophy),


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

    "TRUTH": new Secret("Truth Has Been Eaten",[new SourceDurationPair("Secrets/TRUTH/0.jpg",2)],undefined, "Secrets/TRUTH/0.js")
 ,"YOU IS NEEDED TO END THE WORLD": new Secret("Your Mind Is Needed To Burn the Cornfield",[new SourceDurationPair("Secrets/YOUISNEEDEDTOENDTHEWORLD/0.jpg",2)],undefined, "Secrets/YOUISNEEDEDTOENDTHEWORLD/0.js")
  
    ,"THE TRUTH IS LAYERED": new Secret("There Is Never Only A Single Truth",[new SourceDurationPair("Secrets/THETRUTHISLAYERED/0.jpg",2)],undefined, "Secrets/THETRUTHISLAYERED/0.js")
    ,"THE END IS NEVER": new Secret("Halloween Ends. Zampanio does not. Lavinraca does not.",[new SourceDurationPair("Secrets/THEENDISNEVER/clown.png",2)],undefined, "Secrets/THEENDISNEVER/0.js")

    
    
    ,"OBSESSION LEADS TO RUIN": new Secret("But You Already Knew That",[new SourceDurationPair("Secrets/THEENDISNEVER/clown.png",20),new SourceDurationPair("Secrets/THEENDISNEVER/jump.PNG",1)],undefined, "Secrets/THEENDISNEVER/0.js")

    ,"THE FOOL IS HURT": new Secret("Is Maccus Truly Maccus?",[new SourceDurationPair("Secrets/THEFOOLISHURT/0.jpg",2)],undefined, "Secrets/THEFOOLISHURT/0.js")
    ,"EVERYTHING IS CONNECTED": new Secret("Twin Lichen Spiralling Around Each Other, Feeding On The Same Source",[new SourceDurationPair("Secrets/EVERYTHINGISCONNECTED/0.jpg",2)],undefined, "Secrets/EVERYTHINGISCONNECTED/0.js")
    ,"IT HAS COLONIZED YOUR MIND ALREADY": new Secret("The Scarecrow Wants In",[new SourceDurationPair("Secrets/ithascolonizedyourmindalready/0.jpg",2)],undefined, "Secrets/ithascolonizedyourmindalready/0.js")

};