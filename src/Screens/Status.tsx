import React, { Fragment, useEffect } from "react";
import {Player} from "../Modules/Player";
import { Stat, StatMap } from "../Modules/Stat";
import { all_themes } from "../Modules/Theme";
import { ADJ, MENU } from "../Modules/ThemeStorage";
import { uniq } from "../Utils/ArrayUtils";
import { BACKSTORY, INVENTORY } from "../Utils/constants";
import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import {StatusHeader,StatusRow, StatusBlock,StatusContent,Skill, SkillBox, BORDERRADIUS, BORDERRADIUSROUND, FONTCOLOR} from "./Styles";
interface StatusProps{
    player: Player;
    loadScreen: any; //function
}

interface StatsProps{
    stats: StatMap;
}

interface StatProps{
    stat: Stat;
}
/*
    TODO: just what is displayed here will change based on player stats on gnosis.
    whether you can get to this screen or not is controlled by skills
*/
export const  StatusScreen = (props: StatusProps)=> {

    const {player} = props;
    const inventoryMenuLevel = player.observer.inventoryMenuLevel;
    const backstoryMenuLevel = player.observer.backstoryMenuLevel;

    const StatsSection = (props: StatsProps)=> {
        return(
            <Fragment>
                {Object.keys(props.stats).map((key)=>{return <StatSection key={key} stat={props.stats[key]}/>})}
            </Fragment>
        )
    }

    const StatSection = (props: StatProps)=> {
        return(
            <div key={props.stat.name()}>{props.stat.name()}: {props.stat.absolute_value().toFixed(1)} </div>
        )
    }

    const calculateMenuOptions = () =>{
        let ret:string[] = [];
        for(let key of player.theme_keys){
            ret = ret.concat(all_themes[key].getPossibilitiesFor(MENU));
        }
        return uniq(ret).join(', ');
    }

    useEffect(()=>{
        if(inventoryMenuLevel > 0){
            (window as any).menuClick(INVENTORY);
        }
        if(backstoryMenuLevel){

            (window as any).menuClick(BACKSTORY);
        }

    },[inventoryMenuLevel,backstoryMenuLevel])


    return (
    <StatusBlock>
        <span>
            <StatusRow>
                <StatusHeader>Name:</StatusHeader>
                <StatusContent>Player</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Title:</StatusHeader>
                <StatusContent>{player.title}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Seed:</StatusHeader>
                <StatusContent><a href = {`./?seed=${player.rand.initial_seed}`}>{player.rand.initial_seed}</a></StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Sub Titles:(TODO have these unlock later)</StatusHeader>
                <StatusContent> {player.interests.map((interest)=>{
                    let seed = 0; //todo sum all chars
                    for(let i = 0; i<interest.chosen_name.length; i++){
                        seed += interest.chosen_name.charCodeAt(i);
                    }
                    const rand = new SeededRandom(seed); //want it to be stable per interest but changing
                    const theme = all_themes[rand.pickFrom(player.theme_keys)];
                    console.log("JR NOTE: theme selected is", theme)
                return `${titleCase(theme.pickPossibilityFor(rand,ADJ))} ${interest.chosen_name}`;
                }).join(", ")}</StatusContent>
            </StatusRow>

            {player.observer.backstoryMenuLevel>0 || player.chaos || player.order?<StatusRow>
                <StatusHeader>Backstory:</StatusHeader>
                <StatusContent>{player.backstory}</StatusContent>
            </StatusRow>:null}

            {player.observer.inventoryMenuLevel>0 || player.chaos || player.order?<StatusRow>
                <StatusHeader>Inventory:</StatusHeader>
                <StatusContent>{player.inventory.join(", ")}</StatusContent>
            </StatusRow>:null}

            <StatusRow>
                <StatusHeader>Species:</StatusHeader>
                <StatusContent>Unknown TODO</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Possible Menu Options (debug):</StatusHeader>
                <StatusContent>{calculateMenuOptions()}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Stats:</StatusHeader>
                <StatusContent><StatsSection stats={player.stats}/></StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Skill Points:</StatusHeader>
                <StatusContent>{player.skillPoints}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Locked Skills:</StatusHeader>
                <StatusContent>{player.locked_skills().length}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Unlocked Skills:</StatusHeader>
                <StatusContent>  
                    <SkillBox fontColor={FONTCOLOR} mildRadius={BORDERRADIUS}>{player.unlocked_skills_no_stats().map((skill,i) => {return ( <Skill fontColor={FONTCOLOR} mediumRadius={BORDERRADIUSROUND} key={skill.name + i}>{i}: {skill.name} </Skill>  )})}</SkillBox>
                </StatusContent>
            </StatusRow>
    </span>



  </StatusBlock>);
  }