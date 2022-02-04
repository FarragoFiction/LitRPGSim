/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { Room } from './Room';
import { all_themes, keysToThemes, Theme } from '../../Modules/Theme';
import { BUGS, DECAY, FEELING, LOVE, SMELL, SOUND, TASTE, SPYING, LONELY, OCEAN, TECHNOLOGY, BURIED, FLESH, SCIENCE, FREEDOM, ADDICTION, KNOWING, MAGIC, DARKNESS, LIGHT, OBFUSCATION, FILTERS, TWISTING, filter_possibilities } from '../../Modules/ThemeStorage';
import styled from '@emotion/styled';
import SeededRandom from '../../Utils/SeededRandom';
import FlavorPopup from './FlavorPopup';
import { getParameterByName } from '../../Utils/URLUtils';
import { RenderedItem } from './canvas_shit';
import { Wanderer } from './Wanderer';
import { GuestBook } from "./GuestBook";
import { Quotidian } from "./Quotidian";
import { pickFrom, shuffle } from "../../Utils/NonSeededRandUtils";
import { HelpDesk } from "./Chat/HelpDesk";
import { TBDChat } from "./Chat/TBD";
import ChoicePopup from "./ChoicePopup";
import { fuckUpBG } from "../../CanvasFuckery/fuckery";
import { CeoChats } from "./Chat/HelpDesk/CEOChats";
import { css, jsx } from "@emotion/react";
import { addNumToArrayWithKey } from "../../Utils/LocalStorageUtils";
import { playCoffin } from "../..";
import { TapCode } from "./Chat/TapCode";

//a memory can NOT be in both places at once.
export const MEMORY_KEY = "WANDERER_MEMORY";
export const QUOTIDIAN_KEY = "QUOTIDIAN_HOARD";


export const WalkAround = () => {


    const GuestBookButton = styled.button`
    position: fixed;
    bottom: 15px;
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
        width: 500px;
        height: 500px;
    `;

    const DarkBG = styled(RoomContainer)`
        background-color: black;
        z-index: -1;
    `;

    const LightBG = styled(RoomContainer)`
    background-color: white;
    z-index: -1;
`;


    //warning, the post coffin uses the styled component still, so don't be surprised if editing this doenst edit htat
    const base_room_stylings = `padding: 10px;
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
  width: 500px;
  height: 500px;`



    //number of themes/2 is how many doors to have.
    const url_themes = getParameterByName("themes", null);
    const url_seed = getParameterByName("seed", null);
    const [themeKeys, setThemeKeys] = useState<string[]>(url_themes ? [...url_themes.split(","), SPYING] : [all_themes[SPYING].key, all_themes[ADDICTION].key, all_themes[KNOWING].key]);
    const [seededRandom] = useState(new SeededRandom(url_seed ? parseInt(url_seed, 10) : 216));
    const [flavorText, setFlavorText] = useState<string | undefined>()
    const [coffinTime, setCoffinTime] = useState(new Date().getDay() === 5);
    const [displayCoffinOption, setDisplayCoffinOption] = useState(false);
    const [trappedInCoffin, setTrappedInCoffin] = useState(false);
    const [roomStyle, setRoomStyle] = useState(base_room_stylings);
    const [wandererLoc, setWandererLoc] = useState({ x: '250px', y: '450px' });


    useEffect(() => {
        const picked_filters: string[] = [];
        const themes: Theme[] = keysToThemes(themeKeys);
        const amount = seededRandom.getRandomNumberBetween(0, 3);
        for (let i = 0; i < amount; i++) {
            const filter = seededRandom.pickFrom(themes).pickPossibilityFor(seededRandom, FILTERS);
            if (filter && !filter.includes("ERROR")) {
                picked_filters.push(filter);
            }
        }
        filters.current = picked_filters;
    }, [themeKeys])


    useEffect(() => {
        const dark_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, black 0%,  10%, rgba(0, 0, 0, 0.15) 25%);`;
        const light_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, white 0%,  50%, rgba(0, 0, 0, 0.15) 75%);`;
        const lonely_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, black 0%,  25%, rgba(0, 0, 0, 0.15) 50%);`;
        //extremely subtle
        const twisting_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, black 0%,  65%, rgba(0, 0, 0, 0.65) 75%);`;


        let mask = '';
        if (themeKeys.includes(DARKNESS)) {
            mask = dark_mask;
        } else if (themeKeys.includes(LIGHT)) {
            mask = light_mask
        } else if (themeKeys.includes(LONELY) || themeKeys.includes(OBFUSCATION)) {
            mask = lonely_mask;
        } else if (themeKeys.includes(TWISTING)) {
            mask = twisting_mask
        }

        let filter = ``;
        if (filters.current && filters.current.length) {
            filter = 'filter: '
            for (let f of filters.current) {
                filter += `${f} `;
            }
            if (themeKeys.includes(TWISTING)) {
                const twisting_styles = [`hue-rotate(10deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(-5deg)`];
                filter += ` ${pickFrom(twisting_styles)}`;
            }
            filter += ";"
        } else if (themeKeys.includes(TWISTING)) {
            filter = 'filter: '
            const twisting_styles = [`hue-rotate(-2deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(-5deg)`];
            filter += pickFrom(twisting_styles);
            filter += ";"

        }
        const theme_style = `${mask}${base_room_stylings}${filter !== '' ? filter : ''}`;
        setRoomStyle(theme_style);

    }, [themeKeys, wandererLoc])


    const validKeys = () => {
        for (let themeKey of themeKeys) {
            if (!Object.keys(all_themes).includes(themeKey)) {
                return false;
            }
        }
        return true;
    }


    //room needs to tell me what items it found.
    const itemsRef = useRef<RenderedItem[]>([]);
    //an array of theme keys used to populate quotidians
    const quotidiansRef = useRef<string[][]>([]);
    const wandaTakeMemoryRef = useRef<Function>();
    const filters = useRef<string[]>([]);

    /*
        NOTE:

        seeded random here should be based on current 'global' seed plus whether you went north, south or east
        
        new rooms should have all the same rooms as the previous but
         remove one theme and replace it with another

        this creates "neighborhoods" of aesthetics, i'm betting
    */

    const childRoomThemes = (rand: SeededRandom) => {
        addNumToArrayWithKey("lp_route", 1);
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




    const makeChild = (tmpRand: SeededRandom) => {
        setFlavorText(undefined);
        //ubiquitous floating eyes plz
        let child_themes = childRoomThemes(tmpRand)
        if (!child_themes.includes(SPYING)) {
            child_themes = [...child_themes, SPYING]
        }
        setThemeKeys(child_themes);
    }

    //spawn quotidians
    useEffect(() => {
        //extra chance of it being 0
        if (!coffinTime) {
            const quotidians: string[][] = [];
            if (seededRandom.nextDouble() > 0.25) {
                const number = seededRandom.getRandomNumberBetween(0, 4);
                for (let i = 0; i < number; i++) {
                    const tmp = shuffle(themeKeys);
                    quotidians.push(tmp.slice(0, 2) as string[]);
                }
            }
            quotidiansRef.current = quotidians;
        }
    }, [themeKeys]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const baseCanvasRef = useRef<HTMLCanvasElement>(null);



    //what's this? have I found a Waste?
    if (!validKeys()) {
        return (
            <GuestBook />
        )
    }

    const beginingOfTheEnd = () => {
        console.log("JR NOTE: The Wanderer is no more. The End is Never The End.")
        setTrappedInCoffin(true)
        playCoffin();
        fuckUpBG();
        const body = document.querySelector("body");
        if (body) {
            body.style.background = "#000000";
        }
        var pageUrl = '?' + `seed=13&themes=${[MAGIC, KNOWING, KNOWING, SPYING, TECHNOLOGY, ADDICTION].join(',')}&apocalypse=canon`;
        window.history.pushState('', '', pageUrl);

    }



    return (
        <Fragment>
            {!trappedInCoffin ? (
                <Fragment>
                    <div css={css`${roomStyle}`}>
                        <Room coffinTime={coffinTime} canvasRef={canvasRef} bgCanvasRef={bgCanvasRef} baseCanvasRef={baseCanvasRef} itemsRef={itemsRef} themeKeys={themeKeys} numberDoors={numberDoors} seed={seededRandom.getRandomNumberBetween(0, 8888888888)} />
                        {flavorText ? <FlavorPopup text={flavorText} left={0} top={0} /> : null}
                        {displayCoffinOption ? <ChoicePopup yesFunction={() => beginingOfTheEnd()} noOption="I am NOT getting in a coffin." yesOption="I am ready. Show me the final story." text={
                            `You know if you lowered yourself into its smooth wooden confines and gently closed the lid, you and it would sink down and down and down for almost forever.
                    <br><Br>You know that even if the end could never be the end, there IS a bottom, and AT its bottom you could finally know enough at last. The coffin would sing you its story and you would be full.
                    `
                        } left={0} top={0} /> : null}

                        {quotidiansRef.current?.map((qq, index) => <Quotidian key={`birb${index}`} themeKeys={qq} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>)}
                        <Wanderer setWandererLoc={setWandererLoc} setDisplayCoffinOption={setDisplayCoffinOption} wandaTakeMemoryRef={wandaTakeMemoryRef} canvasRef={canvasRef} numberDoors={numberDoors} itemsRef={itemsRef} seededRandom={seededRandom} makeChild={makeChild}></Wanderer>
                    </div>
                    {themeKeys.includes(DARKNESS) || themeKeys.includes(TWISTING) ? <DarkBG /> : null}
                    {themeKeys.includes(LIGHT) ? <LightBG /> : null}

                </Fragment>)
                : null}
            {trappedInCoffin ? <RoomContainer>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
            </RoomContainer> : null}
            {trappedInCoffin ? <CeoChats /> : null}
            {trappedInCoffin ? <TapCode /> : null}

            <TBDChat trappedInCoffin={trappedInCoffin} setCoffinTime={setCoffinTime} />
            <HelpDesk />

            <div style={{ display: "none" }}>TODO:
                <li>post coffin trial of killer plus live blogging of a tgifradys</li>
            </div>
        </Fragment>

    )
}