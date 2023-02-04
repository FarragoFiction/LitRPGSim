import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { CloserChatBox } from "./CloserChatBox";
import { HelpChatBox } from './HelpChatBox';
import help_icon from './../../../../images/Walkabout/icons8-chat-64.png';
import x_icon from './../../../../images/Walkabout/icons8-x-50.png';
import { playAmbientMazeMusicMadness, playHelpDeskMusic } from "../../../..";

export const HelpDesk = () => {
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

const IconImage = styled.img`
height: 33px;
width: 33px;
`

const RememberTheRememberingEye = styled.div`
height: 200px;
cursor: pointer;
width: 100px;
position: absolute;
top: 0px;
left: 0px;
border: 1px solid black;
`

const [chatHelp, setChatHelp] = useState(false);
const [closerHelp, setCloserHelp] = useState(false);

useEffect(() => {
    if (chatHelp) {
        playHelpDeskMusic();
    } else {
        playAmbientMazeMusicMadness();
    }
}, [chatHelp])

useEffect(() => {
    if(chatHelp === true){
        const deployTheCloser = ()=>{
            console.log("JR NOTE: deploying The Closer");
            setCloserHelp(true);
        }
        const timeoutId = setTimeout(deployTheCloser, 10*1000*60);
        return () => {
          clearTimeout(timeoutId);
        };
    }

  },[chatHelp]);

  return(
      <Fragment>
        <RememberTheRememberingEye onClick={()=>setCloserHelp(true)} id="remember_the_remembering_eye"/>
    <HelpIcon onClick={() => setChatHelp(!chatHelp)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}>Help</div>{chatHelp ? <IconImage src={x_icon}></IconImage> : <IconImage src={help_icon}></IconImage>}</HelpIcon>

    {chatHelp ? <HelpChatBox /> : null}
    {closerHelp ? <CloserChatBox close={()=>{setCloserHelp(false)}} /> : null}
    </Fragment>
  )
}