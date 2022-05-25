/*
    In this path, you find justifiedRecursion in the center of Truths endless spiralling questions. 

    They are resigned, and tired. 

    * of COURSE zampanio is not real, it never was, even in the creepypasta faq "i found"
* but would you have been as intrigued without the fiction? without that core of mystery?
* all i want is to burrow into your brain, to be remembered.  Truth is simply puppeting my words, and always has been. 

They wonder if you've seen the discord. The core of Truth that is inside of it.

ONE (and only one) PATH MUST BE THE ABSOLUTE TRUTH. Not even the creepypasta FAQ is real, I made even that up.
(but is it satisfying to read that? don't you want more fiction?)
*/

import { speakTheTruth } from "../..";
import { JRRamble } from "./JRRamble";
import { PlayerResponse } from "./PlayerResponse";

export const makeTrueRamble = ()=>{
    
    speakTheTruth();
    return One();
}

export const One = ()=>{
    const defaultRamble = "Ah. Hello there?";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("So this is the True Attic, then?", Two));


    return ramble;
}

export const Two = ()=>{

    const ramble = new JRRamble("Yeah...", []);

    ramble.potential_reponses.push(new PlayerResponse("You seem ...sadder than normal?", Three));

    return ramble;
}

export const Three = ()=>{

    const ramble = new JRRamble("Yeah. Don't get me wrong, though. Zampanio has been a lot of fun and I can't imagine stopping any time soon...", []);

    ramble.potential_reponses.push(new PlayerResponse("It's just...sometimes I worry.", Four));

    return ramble;
}

export const Four = ()=>{

    const ramble = new JRRamble("They way I choose to create has always had...collateral damage? ", []);

    ramble.potential_reponses.push(new PlayerResponse("It's easy to fall down a rabbit hole of obession to your own detriment.", Five));

    return ramble;
}

export const Five = ()=>{

    const ramble = new JRRamble("It's the reason why there's so many warnings about the dangers of obession here, to the point its literally the core theme of ZampanioSim.", []);

    ramble.potential_reponses.push(new PlayerResponse("But there's always going to be those conflicting goals.", Six));

    return ramble;
}

export const Six = ()=>{

    const ramble = new JRRamble("I want to not be alone. ", []);

    ramble.potential_reponses.push(new PlayerResponse("I want people to be here with me in this maze I have created, expanding it with me.", Seven));

    return ramble;
}

export const Seven = ()=>{

    const ramble = new JRRamble("I also want them to be safe, and to not be trapped.", []);

    ramble.potential_reponses.push(new PlayerResponse("In Truth, the goals aren't actually conflicting.", Eight));

    return ramble;
}

export const Eight = ()=>{

    const ramble = new JRRamble("The best way I can secure long term creative collaboration and feedback is to make sure those fallen down the rabbithole don't burn themselves out.", []);

    ramble.potential_reponses.push(new PlayerResponse("At work I've volunteered to spearhead the morale improvement measures-- actual real changes rather than just bandaids. Because we have so much attrition. ", Nine));

    return ramble;
}

export const Nine = ()=>{

    const ramble = new JRRamble("And the way I feel is that... If something is bad, you gotta leave. It makes sense.  But I can still hope that I can fix the bad parts enough that at least SOME people stay?", []);

    ramble.potential_reponses.push(new PlayerResponse("It's one reason why I'm constantly reminding people to document their findings, update the wiki, make ao3 fics, whatever.  So that... This impossibly huge maze. Can feel just that bit smaller. When you remember you aren't alone in it. That other people are working along with you to map it out. ", Ten));

    return ramble;
}


export const Ten = ()=>{

    const ramble = new JRRamble("But what if that's the thing, right? What if...by making things better, or by expressing my desire for people to stay...whether in Zampanio or in work...", []);

    ramble.potential_reponses.push(new PlayerResponse("I'm making just enough changes that they feel obligated to stay in a situation that isn't helping them? Isn't rewarding anymore? ", Eleven));

    return ramble;
}

export const Eleven = ()=>{

    const ramble = new JRRamble("Who Is Shogun was like that, as a puzzle. Some people LOVED the reward of digging it deeper, others were *wounded* by it.", []);

    ramble.potential_reponses.push(new PlayerResponse("And Ultimately, that's what lead me to an answer I find solace in, now. ", Twelve));

    return ramble;
}

export const Twelve = ()=>{

    const ramble = new JRRamble("Anything I Create will hurt at least SOME people.", []);

    ramble.potential_reponses.push(new PlayerResponse("And not just Creation either. You can't live your life hurting no one. ", Thirteen));

    return ramble;
}

export const Thirteen = ()=>{

    const ramble = new JRRamble("So what I can do is warn people. Wrap what I create in a haze of danger. Hide it so that only those already in the obession throes can find it.  Remind them that obsession is bad.  But...let myself enjoy creation. It can just be for me. It can be always with the knowledge that it is temporary. This too, shall pass.  One day, possibly soon, all the current Unmarked will have their stories leave Zampanio's and this entire thing will be nostalgic. I'll be excited if I find anyone transversing this maze, no matter which direction they pick, since it will be a throw back. History. One day I will be history and if nothing else, my Past Self has shown me how to navigate that. ", []);

    ramble.potential_reponses.push(new PlayerResponse("So yeah. No matter if you find this when ZampanioSim is actively still shifting like so many grains of sand. Or if you find it far in the future afer the rot has consumed it. I hope you're staying safe. I hope this is fun but not so fun you stop doing other things. I hope you create things that feed you and bring you joy but also take the time to consume things as well. Play games. Read books. Touch grass, I dunno. Just. Remember that Obsession Leads To Ruin.", Thirteen));

    return ramble;
}