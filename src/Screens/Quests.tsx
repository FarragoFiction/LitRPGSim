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

interface QuestItemProps {
    quest: QuestObject;
    player: Player;

}

export const QuestScreen = (props: StatusProps) => {
    const questObjects = props.player.quests;

    return (

        <StatusBlock>
            {
                questObjects.map((item, index) => {
                    if(!item.unlocked(props.player.observer) || item.completed){
                        return null;
                    }
                    return (<QuestItem key={`quest${index}`} quest={item} player={props.player}></QuestItem>)
                })
            }

        </StatusBlock>);
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, player }) => {

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

    const Conditions = styled.div`
        display: block;
        margin-right: 5px;
        margin-top: 20px;
        font-size: 85%;
        font-style: oblique;
    `
    const QuestSection = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 800px;
    `

    const giveReward = () => {
        quest.giveReward(player,"");
        setCompleted(true);
    }

    const [completed, setCompleted] = useState(quest.completed);

    return (
        <QuestLine>
            <QuestHeader>
                {quest.replaceTags(quest.title, player)}
            </QuestHeader>
            <QuestSection>
                {quest.replaceTags(quest.flavorText, player)}
                {completed ?

                    <Conditions> COMPLETED!</Conditions>
                    :
                    <Fragment>
                        <Conditions>Unlocked via: {quest.unlockTriggers.map((item)=>{return item.toString(quest)}).join(". ").toUpperCase() + "."}</Conditions>

                        <Conditions>To Turn In: {quest.turnInTriggers.map((item)=>{return item.toString(quest)}).join(". ").toUpperCase() + "."}</Conditions>
                        <button onClick={giveReward} disabled={!quest.canTurnIn(player.observer)} className="styled_button"> TURN IN!</button>
                    </Fragment>
                }
            </QuestSection>
        </QuestLine>
    )

}