import styled from "@emotion/styled";
import { Fragment, useState } from "react";
import AchivementPopupKickoff from "../Modules/ObserverBot/AchivementPopup";
import { Player } from "../Modules/Player";
import { QuestObject } from "../Modules/Quests/QuestObject";

import { StatusBlock } from "./Styles";

interface StatusProps {
    player: Player;
    loadScreen: any; //function
}

interface StoryItemProps {
    storyItem: QuestObject;
}

interface BackStoryItemProps {
    text: string;
}

export const PlotRecap = (props: StatusProps) => {
    const storySoFar = props.player.storySoFar;

    return (

        <StatusBlock>
            {props.player.observer.backstoryMenuLevel > 0 ? (<BackStoryItem text={`${props.player.backstory}`}/>) : null}
            {
                storySoFar.map((item, index) => {
                    return (<StoryItem key={`quest${index}`} storyItem={item}></StoryItem>)
                })
            }

            {storySoFar.length === 0 ? <div>NO PLOT FOUND</div> : null}

        </StatusBlock>);
}

const BackStoryItem: React.FC<BackStoryItemProps> = ({ text }) => {
    const QuestLine = styled.div`
    padding: 20px;
    font-size: 15px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid black;
`
    const QuestHeader = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 775px;
        font-weight: bolder;
        font-size: 18px;
        margin-bottom: 20px;

    `

    const QuestSection = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 800px;
        margin-top: 20px;
    `
    return (
        <QuestLine>
            <QuestHeader>
                Backstory
            </QuestHeader>
            <QuestSection>
                {text}
            </QuestSection>
        </QuestLine>
    )
}

const StoryItem: React.FC<StoryItemProps> = ({ storyItem }) => {

    const QuestLine = styled.div`
    padding: 20px;
    font-size: 15px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid black;
`
    const QuestHeader = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 775px;
        font-weight: bolder;
        font-size: 18px;
        margin-bottom: 20px;

    `

    const QuestSection = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 800px;
        margin-top: 20px;
    `
    return (
        <QuestLine>
            <QuestHeader>
                {storyItem.replaceTags(storyItem.title)}
            </QuestHeader>
            <QuestSection>
                {storyItem.replaceTags(storyItem.flavorText)}
            </QuestSection>

            <QuestSection>
                ~~~~~~~~~~~~
            </QuestSection>

            <QuestSection>
                {storyItem.replaceTags(storyItem.completionText)}
            </QuestSection>
            <QuestSection>
                {storyItem.replaceTags(storyItem.rewardText)}
            </QuestSection>
        </QuestLine>
    )

}