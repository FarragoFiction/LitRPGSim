import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { Room } from './Room';
import { all_themes, Theme } from '../../Modules/Theme';
import { BUGS, DECAY, FEELING, LOVE, SMELL, SOUND, TASTE, TWISTING } from '../../Modules/ThemeStorage';
import styled from '@emotion/styled';
import help_icon from './../..//images/Walkabout/icons8-chat-64.png';
import x_icon from './../..//images/Walkabout/icons8-x-50.png';

import { HelpChatBox } from './HelpChatBox';
import { playHelpDeskMusic, playAmbientMazeMusicMadness, doorEffect } from '../..';
import SeededRandom from '../../Utils/SeededRandom';
import FlavorPopup from './FlavorPopup';
import { getParameterByName } from '../../Utils/URLUtils';
import { RenderedItems } from './canvas_shit';
import { removeItemOnce } from '../../Utils/ArrayUtils';
import { addStringToArrayWithKey, isStringInArrayWithKey, removeStringFromArrayWithKey } from '../../Utils/LocalStorageUtils';
import { Wanderer } from './Wanderer';

//a memory can NOT be in both places at once.
export const MEMORY_KEY = "WANDERER_MEMORY";
export const QUOTIDIAN_KEY = "QUOTIDIAN_HOARD";


export const WalkAround = () => {

    const HelpIcon = styled.button`
    position: fixed;
    top: 15px;
    right: 15px;
    color: white;
    text-decoration: none;
    background-color: #1f3f87;
    border-radius: 25px;
    font-size: 28px;
    line-height: 33px;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
`

    const RoomContainer = styled.div`
        padding: 10px;
        margin: 10px;
        font-weight: 500;
        box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
        box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
        margin-left: auto;
        margin-right: auto;
        position: fixed;
        overflow: auto;
        top: 5%;
        left: 25%;
    `;

    const IconImage = styled.img`
    height: 33px;
    width: 33px;
    `


    //number of themes/2 is how many doors to have.
    const url_themes = getParameterByName("themes", null);
    const url_seed = getParameterByName("seed", null);
    const [themeKeys, setThemeKeys] = useState<string[]>(url_themes ? url_themes.split(",") : [all_themes[BUGS].key, all_themes[DECAY].key, all_themes[LOVE].key]);
    const [seededRandom] = useState(new SeededRandom(url_seed ? parseInt(url_seed, 10) : 216));
    const [flavorText, setFlavorText] = useState<string | undefined>()
    const [chatHelp, setChatHelp] = useState(false);


    //room needs to tell me what items it found.
    const itemsRef = useRef<RenderedItems[]>([]);

    /*
        NOTE:

        seeded random here should be based on current 'global' seed plus whether you went north, south or east
        
        new rooms should have all the same rooms as the previous but
         remove one theme and replace it with another

        this creates "neighborhoods" of aesthetics, i'm betting
    */

    const childRoomThemes = (rand: SeededRandom) => {
        const roll = seededRandom.nextDouble();
        if (roll > 0.6) {
            //add a theme, but don't go over 6
            if (themeKeys.length < 6) {
                return [...themeKeys, rand.pickFrom(Object.values(all_themes)).key];

            } else {
                return [...themeKeys.slice(1), rand.pickFrom(Object.values(all_themes)).key];
            }

        } else if (roll > 0.3) {
            //remove a theme, but don't go under one
            if (themeKeys.length > 1) {
                return [...themeKeys.slice(1)];

            } else {
                return [...themeKeys.slice(1), rand.pickFrom(Object.values(all_themes)).key];
            }
        } else {
            //same amount just one different
            return [...themeKeys.slice(1), rand.pickFrom(Object.values(all_themes)).key];
        }
    }

    useEffect(() => {
        const flavorChance = 0.2;
        if (seededRandom.nextDouble() < flavorChance) {
            const chosen_theme = all_themes[seededRandom.pickFrom(themeKeys)];
            const senses = [SMELL, SOUND, SMELL, SOUND, SMELL, SOUND, FEELING, FEELING, FEELING, FEELING, TASTE];
            const sense = seededRandom.pickFrom(senses);
            let phrase = "";
            const input = chosen_theme.pickPossibilityFor(seededRandom, sense);
            if (sense === SMELL) {
                const options = [`You breathe through your mouth to avoid the overwhelming smell of ${input}.`, `Why do you suddenly smell ${input}?`, `You catch a faint whiff of ${input}. `, `The smell of ${input} floods your nose.`];
                phrase = seededRandom.pickFrom(options);
            } else if (sense === SOUND) {
                const options = [`Your ears strain to pick up the sound of ${input}.`, `You can barely think against the cacophony of ${input}.`, `The sound of ${input} is in the air.`, `Your head is splitting with the sound of ${input}.`, `You hear the faint sound of ${input} in the distance.`];
                phrase = seededRandom.pickFrom(options);
            } else if (sense === FEELING) {
                const options = [`Everything feels like ${input}.`, `Your skin tingles with the sensation of ${input}.`];
                phrase = seededRandom.pickFrom(options);
            } else if (sense === TASTE) {
                const options = [`You can't get the taste of ${input} out of your mouth.`, `Oh god why can you taste ${input}?`];
                phrase = seededRandom.pickFrom(options);
            }
            setFlavorText(phrase);
        }
    }, [themeKeys])

    const numberDoors = useMemo(() => {
        return Math.ceil(themeKeys.length + 1) / 2;
    }, [themeKeys]);


    useEffect(() => {
        if (chatHelp) {
            playHelpDeskMusic();
        } else {
            playAmbientMazeMusicMadness();
        }
    }, [chatHelp])

    const makeChild = (tmpRand: SeededRandom) => {
        setThemeKeys(childRoomThemes(tmpRand));
    }

    return (
        <Fragment>
            <RoomContainer>
                <Room itemsRef={itemsRef} themeKeys={themeKeys} numberDoors={numberDoors} seededRandom={seededRandom} />
                {flavorText ? <FlavorPopup text={flavorText} left={0} top={0} /> : null}
                <Wanderer numberDoors={numberDoors} itemsRef={itemsRef} seededRandom={seededRandom} makeChild={makeChild}></Wanderer>
            </RoomContainer>
            <div>TODO:

                FIVE MINUTE TODO.
                <li>take away flavor text state from this file, give it to child in the hope we don't rerender room</li>
                <li>why is it so hard to position flavor text???</li>
                <li>optional weight for items (some need to be rarer)</li>
                <li>record how many unique flavor texts you've seen (out of how many) store flavor text in local storage</li>
                <li>warn player if the ai eats a memory you have in addition to the item, various ai factions that eats novel items and fight each other (shouts new, moves towards it, else wanders). PERMANENT for each item, store flavor text in local storage</li>
                <li>spawn wall and floor vents rarely, with text</li>
                <li>spawn hydration stations</li>
                <li>spawn tape players (secret music)</li>
                <li>add audio logs to secret music</li>
                <li>pick a  effect for the room rarely (tint for many of them (red for fire, blue for ocean for example), completely opaque black for dark and obfuscations, spiral has weirdness, ocean and lonely has fog, stranger, dark etc, corruption has bugs overlaid)</li>
                <li>secret hax coffin to the left,endless dream, credits</li>
                <li>post coffin the ai brings all the items its eaten and gives it to you, link to infotoken hoard with memories</li>


                <li>ai characters spawn? simulation? (of what?)(quotidians?)(i want them to be heavily rule based)(and ominous)</li>
                <li>their ai responds to words in the flavor text (its not just for you) (drawn to some (you dont have yet), repulsed by others (you do have yet)? can destroy objects?) (the forever present is corrupted)</li>
                <li>the ai eats items if they encounter it and you haven't yet</li>
                <li>endless dream inside the coffin</li>
                <li>EXTREMELY IMPORTANT: should use seeded random for generating new rooms so it can be mapped.</li>
                <li>leads to infinite spiralling help desk that leverages attic code, plot is Wanda trying to accuse Eyedol of having a serial killer in their staff</li>
                <li>after ten minutes you reach the closer who actually listens to what you say, is in a new chat window entirely and wants to know what they need to do to make you go away.</li>
                <li>how should i detect i'm near a door so i can go into a new room?</li>
                <li>the room you are currently in generates child rooms that share at least one theme</li>
                <li>press enter to interact</li>
                <li>spawnable tape players (add more secret music, including things that are just audio logs from the closer)</li>

                <li>new theme hash in ThemeStorage (can't just make new one cuz want senses and objects etc) has WalkObject. WalkObject has wall graphic, floor graphic, wall scattered graphics and floor scattered graphics objects with source and text. if any source is null, glitchy placeholder</li>
                <li>render floor, walls, and a few objects from themes</li>
                <li>when you interact with an object you get its flavor text (even if its glitchy) </li>
                <li>add glitch effect to WalkObject themes.</li>
                <li>Friends can show up. You can talk to them. You can use them to open doors. </li>
                <li>when all friends are dead NAM and ShamblingHorror show up</li>
                <li>rooms can rarely spawn music boxes or SCRIBBLED NOTEBOOKS which engage with random thematic content</li>
                <li>have way to get to credits in mod</li>
                <li>find your coffin and go down and down and down</li>
                <li>put this on LItRpgsim never tell anyone (also itch.io and steam) (diff base themes corruption steam)</li>
            </div>
            <HelpIcon onClick={() => setChatHelp(!chatHelp)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}>Help</div>{chatHelp ? <IconImage src={x_icon}></IconImage> : <IconImage src={help_icon}></IconImage>}</HelpIcon>
            {chatHelp ? <HelpChatBox /> : null}
        </Fragment>

    )
}