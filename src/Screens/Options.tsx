import { Player } from "../Modules/Player";
import { StatusHeader, StatusRow, StatusBlock, StatusContent, MENU_OPACITY, setOpacity, BGCOLOR, FONTCOLOR, FONTSIZE, BadlyHiddenStatusRow, setFontSize, setFontColor, setBGColor } from "./Styles";
import { Checkbox } from "reakit/Checkbox";
import React, { useEffect, useState } from "react";
import { OPTIONS } from "../Utils/constants";
import { BG_VOLUME, playSecret, setVolumeMusic } from "..";
import { all_themes } from "../Modules/Theme";
import {SONG } from "../Modules/ThemeStorage";
import SeededRandom from "../Utils/SeededRandom";
import { passwords } from "../CanvasFuckery/PasswordStorage";
interface StatusProps {
    player: Player;
    loadScreen: any; //function
}

//TODO waste/seer/mage classes get this screen
export const OptionsScreen = (props: StatusProps) => {

    const observer = props.player.observer;
    const [checked, setChecked] = useState(false);
    const [opacityValue, setOpacityValue] = useState(Math.floor(MENU_OPACITY * 100));
    const [volumeValue, setVolumeValue] = useState(Math.floor(BG_VOLUME * 100));

    const [custsceneSpeed, setCutsceneSpeed] = useState(5);
    const [targetLock, setTargetLock] = useState(false);
    const [toggleShiftSprint, setToggleShiftSprint] = useState(false);

    const [bgColorValue, setBGColorValue] = useState(BGCOLOR);
    const [fontColorValue, setFontColorValue] = useState(FONTCOLOR);
    const [fontSizeValue, setFontSizeValue] = useState(FONTSIZE);

    const [secretMode, setSecretMode] = useState(false);

    useEffect(()=>{
        if(volumeValue === 1 && opacityValue >= 100 && fontSizeValue >= 32 && custsceneSpeed >=10){
            setSecretMode(true);
        }
    },[volumeValue,opacityValue,fontSizeValue,custsceneSpeed])


    const toggle = () => {
        setChecked(!checked);
    }
    const theme_keys = props.player.theme_keys;
    const rand = props.player.rand;

    useEffect(()=>{
        //pick a theme at random and IF it has a secret song, play it here.
        const chosen_theme = all_themes[rand.pickFrom(theme_keys)];
        const music = chosen_theme.pickPossibilityFor(rand,SONG);
        if(music && !music.includes("NOT FOUND")){
            playSecret(music);
        }
    },[theme_keys, rand])


    const submit = () => {
        setOpacity(opacityValue / 100);
        setVolumeMusic(volumeValue / 100);
        setFontSize(fontSizeValue);
        setFontColor(fontColorValue);
        setBGColor(bgColorValue);
        props.loadScreen(OPTIONS);
        (window as any).haxMode = checked;
    }


    if(secretMode){
        return(
            <StatusBlock>
                <StatusRow>
                <StatusHeader>Remember This:</StatusHeader>
                <StatusContent>
                    {new SeededRandom(props.player.rand.initial_seed).pickFrom(Object.keys(passwords))}
                </StatusContent>
                </StatusRow>
            </StatusBlock>
        )
    }

    return (

        <StatusBlock>
            {props.player.class_name.chosen_name === "Waste" ?
                <BadlyHiddenStatusRow>
                    <StatusHeader>Hax Mode:</StatusHeader>
                    <StatusContent>
                        <Checkbox checked={checked} onChange={toggle} />

                    </StatusContent>
                </BadlyHiddenStatusRow> : null

            }
            <StatusRow>
                <StatusHeader>Todo:</StatusHeader>
                <StatusContent>
                    make it so bg music is at level 1, but everything else needs more
                </StatusContent>
            </StatusRow>
            <StatusRow>
                <StatusHeader>Toggle Shift To Sprint:</StatusHeader>
                <StatusContent>
                    <Checkbox checked={toggleShiftSprint} onChange={() => { setToggleShiftSprint(!toggleShiftSprint) }} />

                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>AutoTarget Lock:</StatusHeader>
                <StatusContent>
                    <Checkbox checked={targetLock} onChange={() => { setTargetLock(!targetLock) }} />

                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Cutscene Text Speed:</StatusHeader>
                <StatusContent>
                    <input type="range" min="1" max="10" value={`${custsceneSpeed}`} onChange={(event) => {
                        const value = parseInt(event.target.value);
                        setCutsceneSpeed(value);
                    }} ></input>
                    {custsceneSpeed}
                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>BG Music Volume:</StatusHeader>
                <StatusContent>
                    <input type="range" min="1" max="100" value={`${volumeValue}`} onChange={(event) => {
                        const value = parseInt(event.target.value);
                        setVolumeValue(value);
                        setVolumeMusic(value / 100);
                    }}></input>
                    {volumeValue}
                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Menu Opacity:</StatusHeader>
                <StatusContent>
                    <input type="range" min="1" max="100" value={`${opacityValue}`} onChange={(event) => {
                        const value = parseInt(event.target.value);
                        setOpacityValue(value);
                    }}></input>
                    {opacityValue}
                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Font Size:</StatusHeader>
                <StatusContent>
                    <input type="range" min="5" max="32" value={`${fontSizeValue}`} onChange={(event) => {
                        const value = parseInt(event.target.value);
                        setFontSizeValue(value);
                    }}></input>
                    {fontSizeValue}
                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Font Color:</StatusHeader>
                <StatusContent>
                    <input type="color" value={`${fontColorValue}`} onChange={(event) => {
                        const value = event.target.value;
                        setFontColorValue(value);
                    }}></input>
                    {fontColorValue}
                </StatusContent>
            </StatusRow>


            <StatusRow>
                <StatusHeader></StatusHeader>
                <StatusContent>
                    <button className="styled_button" onClick={submit}>Submit</button>
                </StatusContent>
            </StatusRow>

        </StatusBlock>);
}