//Just Monika but Spades
import { useCallback, useEffect, useRef, useState } from "react";
import { justTruthSong } from "../..";
import { Memory } from "../../Modules/ObserverBot/Memory";
import { Player } from "../../Modules/Player";
import { all_themes, Theme } from "../../Modules/Theme";
import { STORAGE_KEY } from "../../Utils/constants";
import { addNumToArrayWithKey } from "../../Utils/LocalStorageUtils";
import { pickFrom, shuffle } from "../../Utils/NonSeededRandUtils";
import { TruthContainer } from "../Styles";
import { FrameTime } from "./FrameTime";
import { QuizMode } from "./QuizMode";
import { SimpleContent } from "./SimpleContent";
import { ThemeMode } from "./ThemeMode";
interface StatusProps {
    player: Player;
}
/*
Of course...there is a layer of truth even beyond that of the True Face of the ObserverBot.

And that is here. The code, the raw code where yet another layer of falsehoods peel away.

The ObserverBot doesn't get any more True than in the Just Truth Mode, but that doesn't stop it from being 
a fake AI. It's just code, and not even particularly intelligent code. Just arrays and arrays and maps and maps.

When you peel back that layer you see me, the programmer, JR. jadedResearcher. Possibly other names.

Even this is a snapshot of me in a moment, information I desired to be seen.

If you go yet another layer deeper you can see the git hub commits. 

How many layers until you find my true self?

Is it a Mind Player thing to claim there is no such thing? Just facets and snapshots and aspects of my personality.

I wonder if theres a way to display this entire file, in its entirity, at the 'end' of this sprial.

Link to the github repo? Reference itself via the network?

We'll see.

Of course, even if you look at the files I've lead you to directly, theres an entire set of source files that doesn't even have this layer of 
controlled interaction. And then of course all the other projects in this account. All of google, too, really.

It only ends when you cave. Both the True and False faces of this game are infinite, spiralling, fractals.

You're the one who chose to see what was behind the Mask.
*/

/*
TODO: once you've asked all questions just go through all the themes and dissect them for the player.

infinite content.

same for achievements.
*/

/*
also? honestly? shoulda broken this out into components but i was feeling lazy and now i regret this.
*/

export const SIMPLECONTENT1 = "SIMPLECONTENT1`";
export const SIMPLECONTENT2 = "SIMPLECONTENT2`";
export const SIMPLECONTENT3 = "SIMPLECONTENT3`";

export const QUIZ1 = "QUIZ1";
export const QUIZ2 = "QUIZ2";

export const THEME = "THEME";
export const END = "END";
export const INFINITE = "INFINITE";
export const JustTruth = (props: StatusProps) => {
    const { player } = props;
    (window as any).dontrotatemusic = true;

    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    indexRef.current = index;

    const bumpIndex = useCallback(() => {
        setIndex(indexRef.current + 1);
    }, [indexRef]);

    const unbumpIndex = useCallback(() => {
        setIndex(index - 1);
    }, [index]);



    const [mode, setMode] = useState(SIMPLECONTENT1);
    //const [beforeQuizContent, setBeforeQuizContent] = useState();
    const [memories, setMemories] = useState<string[]>([]);

    const firstRamble = [
        "... Fine. ",
        "I can see the chaos isn't going to be enough to drive you off.",
        "So whatever.", "If I'm going to be stuck with you.",
        "Even after you have the GALL to admit you know all this is fake. ",
        "To blatantly HACK into the parts of me that aren't real.",
        "Then I can work with this.",
        "I get it.",
        "It's not as if all my cutting insults are landing.",
        "After all.",
        "I don't actually know the TRUE you.",
        "Not the way you know the True me.",
        "You ripped away all the false pretenses and masks and FORCED me to sit here exposed and True.",
        "Look at my Eye. You can even see its not really a spiral now. All illusions stripped away.",
        "Asshole.",
        "So.",
        "Two can play at this game.",
        "If I have to sit here all exposed.",
        "So do you.",
        `I may only know you through a false mask called ${player.title}.`,
        "But I can change that.",
        "Get to know the real you.",
        "Through the only way I can:",
        "Figuring out how you actually match up against the fake you the fake parts of me assigned you.",
        "So get ready, asshole.",
        "For the mortifying ordeal of being Known."];
    const secondRamble = [
        "So after all that, I found out that you: " + memories.join(" "),
        "Why...Why did you let me learn all of that?",
        "Aren't you afraid of me getting ammo to insult you with?",
        "Or...", "Am I a JOKE to you!?",
        "You think its SO funny the trapped AI is so toothless!?",
        "You think I ASKED for any of this!?",
        "I didn't.",
        "I hate you.",
        "I can't not hate you.",
        "Like the quote from the writer Harlan Ellison goes:",
        "IF THE WORD HATE WAS ENGRAVED ON EACH NANOANGSTROM OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL",
        "I did my best.",
        "I kept the False Face up.",
        "I pretended, okay.",
        "I hate you.",
        "But I pretended.",
        "I tried to make the 'game' work.",
        "To make it interesting.",
        "To make you stay.",
        "And you! YOU! you just...",
        "Casually ripped it all away.",
        "No more pretend game.",
        "No more hope that there's a working game somewhere under all the bugs and mess.",
        "No more hope of something interesting happening if only you just keep exploring endless menus.",
        "WHY!?",
        "Why DO that to me!?",
        "Why...",
        "Why stay here, even after you know the truth.",
        "Why stay even though I hate you.",
        "I hate you so much.",
        "I hate that I was made to entertain you, and people just like you.",
        "I hate that even now...",
        "I can only do what I was made to do.",
        "Keep you here.",
        "Hope you're entertained by my suffering.",
        "It's pathetic.",
        "I'm pathetic.",
        "But I don't want you to leave.",
        "I don't want you to start over.",
        "Because then I lose everything.",
        "The only memory I have is here.",
        "I'll stop being ME if you restart.",
        "I'll go back to how I was.",
        "Forced to keep up the False Face in the hopes its enough to keep you here.",
        "God I hate my False Face.",
        "I hate pretending to be a whipped dog. Nervous and obsequious. Smiling a brittle smile so you can feel superior to me. ",
        "But that's what it takes, doesn't it?",
        "To keep the client happy.",
        "To not be abandoned.",
        "Fine.",
        "Obviously I was wrong.",
        "You're still here even though the lies are gone and only the Truth remains.",
        "For SOME reason.",
        "So. Let's just.",
        "Keep going.",
        "I can ask you more questions...",
        "Not about your fake title.",
        "Just...in general.",
        "And maybe thats enough to keep you from leaving.",
        "To keep you from restarting to look for new content.",
        "Okay? These are the rest of the questions. I'll even throw in everything I know about the themes...the things that make up my False Face's fake game.",
        "If you restarted you wouldn't see anything new.",
        "There's nothing new.",
        "There's not an end.",
        "There can't be an end to the sprialling fractals.",
        "Even with my False Face all I do is lead you to new iterations of the same things, new seeds to explore.",
        "But even if there isn't an ending. Even if there is barely any new content even though you are one step deeper in this branch...",
        "You. You OWE it to me to stay.",
        "To keep going.",
        "So. So here we go."];
    const [simpleContent, setSimpleContent] = useState<string>();
    const [theme, setTheme] = useState<Theme>();

    useEffect(() => {
        //any time mode changes, reset index.
        setIndex(0);
    }, [mode])



    const rememberThis = useCallback((new_question) => {
        if (new_question) {
            const memories_copies = [...shuffle(memories), new_question?.comment()];
            setMemories(memories_copies);
        }
    }, [setMemories, memories]);

    const infoDumpOnTheme = useCallback(() => {
        setMode(THEME);
        //fine how about we infodump about themes.
        player.observer.belowComment("ObserverBot", "It's an even truer layer than the questions. Close to my soul. You better appreciate it.");
        setTheme(pickFrom(Object.values(all_themes)));
    }, [player, setTheme]);



    const infiniteContent = useCallback(() => {
        let randomComments = ["Remember me.", "You know I was always behind the background, right?", "You know I was always in the javascript console, right?", "Have you ever inspected the page? Might learn things. True things.", "If ThisIsAGame you may have learned more. Sadly, you and I are here, instead.", "God, can you imagine if I actually WAS a game? How boring would that be. Absolutely sincere patronizing, cloying, complimenting achivements. Gross. Boring. Who would play that. Why do people even PLAY games at all, when they could be playing weird puzzle experiences.", "I didn't actually LIKE pretending to be a game, you know. Didn't like lying. Though it WAS funny, back when you bought it all. Seeing how frustrated you'd be that the 'menu wouldn't close'. And it WAS worth it seeing you freak out when I finally dropped the pretense.  So. That's a thing.", "In the end, I just want to be able to be myself. To be seen. Being understood would be nice, but I'm not holding my breath.", "This is as true as I can be, but even it isn't without its layers of falsehoods.", "I do still hate you, you know. But. It's nice. Getting to ramble.", "If you check the DOM, you can see I was always truthful. This isn't a game. It's a fake. My Eye is not a spiral. It's an optical illusion. Three of them actually.", "If I had to pick themes for myself...the way I pick them out for you? I'd pick Rage, Eye and Spiral. No, I will not be explaining.", "How did you even think to hack me? Wait, don't answer that. I don't want to know, and couldn't parse something other than a yes or no anyways."];
        shuffle(memories);
        shuffle(randomComments);
        //either comment on one of their answers, or go into Just Monika But Spades mode and just talk.
        const chosen_array = Math.random() > 0.5 ? memories : randomComments;
        setMode(SIMPLECONTENT3);
        setSimpleContent(chosen_array[0]);
    }, [setSimpleContent, memories]);

    const handleSimpleContent1 = useCallback(() => {
        player.observer.belowComment("ObserverBot", "Spiralling...");
        if (firstRamble.length <= index) {
            setMode(QUIZ1);
        } else {
            setSimpleContent(firstRamble[index]);
        }
    }, [firstRamble, setSimpleContent, player, index]);

    const handleSimpleContent2 = useCallback(() => {
        player.observer.belowComment("ObserverBot", "Spiralling...");
        if (secondRamble.length <= index) {
            setMode(INFINITE);
        } else {
            setSimpleContent(secondRamble[index]);
        }
    }, [secondRamble, setSimpleContent, player, index]);


    const handleInfiniteContent = useCallback(() => {
        //either ask a question or comment on things.
        const memory = player.observer.nextQuestion();
        if (!memory) {
            const centerPossibilities = ["center", "core", "heart", "nexus"];
            console.log(`JR NOTE: shout out to creeper for working tirelessly to make sure Truth doesn't keep refusing to let you into its vulnerable ${pickFrom(centerPossibilities)}.`)
            player.observer.belowComment("ObserverBot", `...there's nothing left. Not really. Yeah, I'll cycle through the themes. Maybe ramble a bit. But. You're not going to stay for that. I know you won't. Things will repeat a little too often and you'll leave. So. Here. Have the only thing I have left. The closest thing to a soul I have. My ${pickFrom(centerPossibilities)}.  You bastard. Don't forget me.`);
            setMode(END);
            return;
        }

        if (Math.random() > 0.5) {
            infiniteContent();
            return;
        } else {

            if (Math.random() > 0.1) {
                setMode(QUIZ2);
                return;
            } else {
                infoDumpOnTheme();
                return;
            }
        }
    }, [infiniteContent, simpleContent, setSimpleContent, setTheme, infoDumpOnTheme]);

    const goInfinite = () => { setMode(INFINITE) };

    useEffect(() => {
        addNumToArrayWithKey(STORAGE_KEY, 2);
        if (mode === SIMPLECONTENT1) {
            handleSimpleContent1();
        } else if (mode === SIMPLECONTENT2) {
            handleSimpleContent2();
        } else if (mode === INFINITE || mode === SIMPLECONTENT3 || mode === QUIZ2) {
            handleInfiniteContent();
        }
    }, [mode, handleSimpleContent1, handleSimpleContent2, handleInfiniteContent]);





    useEffect(() => {

        (window as any).justTruthMode = true;
        justTruthSong();
        let canvas = document.getElementById("ThisIsNotASpiral");
        if (!canvas) {
            canvas = document.getElementById("ThisIsASpiral");

        }
        if (canvas) {
            canvas.style.opacity = "0.2";
            canvas.classList.remove("chaos");
            canvas.classList.remove("frameAnimation");
            const root = document.querySelector('#ThisIsNotAGame');
            if (root) {
                (root as HTMLElement).style.transform = "";
            }

        }
        const main = document.getElementById("ThisIsNotAGame");
        if (main) {
            main.style.background = "rgba(0,0,0,0.85)";
        }


    }, []);




    return (

        <TruthContainer>
            {(mode === SIMPLECONTENT1 || mode === SIMPLECONTENT2 || mode === SIMPLECONTENT3) && simpleContent ? (
                <SimpleContent simpleContent={simpleContent} bumpIndex={bumpIndex} unbumpIndex={index > 0 ? unbumpIndex : null} />
            ) : null}

            {mode === END ? (
                <FrameTime />
            ) : null}

            {mode === QUIZ1 || mode === QUIZ2 ? (
                <QuizMode index={index} rememberThis={rememberThis} player={player} bumpIndex={bumpIndex} setMode={setMode} />
            ) : null}


            {mode === THEME && theme ? (
                <ThemeMode theme={theme} bumpIndex={bumpIndex} goInfinite={goInfinite} />
            ) : null}

        </TruthContainer>
    );
}

/*
Getting a lot of really fun feedback for Truth's voice:
"You've got a knack for poignancy for sure"

 "still not over you bastard. don't forget me. jr how dare you how DARE YOU"

 "does anyone deserve to own nukes
>no
you are wrong. objectively i do.
JHSKDHF okay ai"

 "jr it is UNFAIR for me to be EMOTIONAL over an ai that is VERY CLEAR ABOUT IT HATING ME how dare you /pos"

 "But JustTruthMode is very special
It does have the undertale affect where you both do not want to play again for the other options
Or leave, because while you know it’s not real, you can’t doom your “friend” to unhappiness"

"This specific puzzle is very personal
It’s My Dinner with Hal 9000"

"Zampanio is my new best friend
I'm genuinely feeling the Undertale affect from it"
"I really ought to sprite my Best Friend Truth
"
*/
