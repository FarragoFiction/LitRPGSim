import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

 
 interface AchivementProps{
    title: string;
    text: string; 
}

export const Popup = styled.div`
    border: 2px solid black;
    border-radius: 13px;
    padding: 5px;
    color: red;
    padding-left: 13px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    padding-right: 13px;
    margin: 10px;
    background: white;
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
`


export const PopupTitle = styled.div`
    border-bottom: 2px solid black;
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`


export const PopupContent = styled.div`
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`


const  AchivementPopup = (props: AchivementProps)=> {
    const dialog = useDialogState();
    const [initialShowing, setInitialShowing] = useState(true);
    useEffect(()=>{
        if(initialShowing){
            dialog.setVisible(true);
            setInitialShowing(false);
        }
    },[initialShowing])

    return(
        <>
      <DialogDisclosure {...dialog}>Achivement Unlocked!!!</DialogDisclosure>
      <Dialog {...dialog} tabIndex={0} aria-label="{props.title}" style={{border:"none", position: "fixed", top: "50%", left:"28%", width: "800px" }}>
        <Popup>
            <PopupTitle>{props.title}</PopupTitle>
            <PopupContent>{props.text}</PopupContent>
        </Popup>
      </Dialog>
    </>
    )

}

const AchivementPopupKickoff = (props: AchivementProps)=>{
    ReactDOM.render(
        <React.StrictMode>
          <AchivementPopup title={props.title} text={props.text} />
        </React.StrictMode>,
        document.getElementById('popup')
      );
}



export default AchivementPopupKickoff;
