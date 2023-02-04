import styled from '@emotion/styled';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { all_classes } from '../../Modules/RPGClass';
import { pickFrom } from '../../Utils/NonSeededRandUtils';
import book_graphic from './../../images/bookbg.jpg';

export const GuestBook = () => {
    const Container = styled.div`
        position: relative;
    `
    const Signatures = styled.div`
        position: absolute;
        top: 41px;
        left: 55px;
        width: 345px;
        height: 500px;
        overflow: auto;
    `

    const SigningArea = styled.div`
    position: absolute;
    top: 41px;
    left: 455px;
    width: 345px;
    height: 500px;
    overflow: auto;
`

    const Quip = styled.div`
        font-weight: bolder;
    `

    const StyledLabel = styled.label`
        width: 155px;
        display: block;
        vertical-align: top;
        margin-bottom: 5px;
        margin-top: 10px;
    `

    const StyledButton = styled.button`
        margin-top: 25px;
    `

    const OminousBullshit = styled.div`
        font-weight: bolder;
        margin-bottom: 15px;
        margin-top: 15px;
    `

    const Title = styled.div`
        font-weight: 100;
        margin-bottom: 15px;
    `

    const BG = styled.img`
        position: absolute;
    `

    const dialog = useDialogState();
    const [initialShowing, setInitialShowing] = useState(true);

    const getPossibleTitles = () => {
        //JR NOTE: TODO collate all titles from classes, use these to replace their names.
        let ret = ["Tester"];
        const all_classes_values = Object.values(all_classes)
        //console.log("JR NOTE: all classes values is", all_classes_values)
        for (let c of all_classes_values) {
            ret = ret.concat(c.name_possibilities);
        }
        //console.log("JR NOTE: ret is",ret)
        return ret;
    }

    const inititialSignatures = [
        { quip: "zampaniosim more like bullying my wiki history sim", title: "Herald of Beef" },
        { quip: "lucky the leprechaun is op as fuck, plz nerf", title: "Weaver of Eyes" },
        { quip: "swiss cheese code", title: "Taxonomist" },
        { quip: "quip", title: "Catalyst" },
        { quip: "Please give me a quip to post here.", title: "Pioneer" },
        { quip: "Please give me a quip to post here.", title: "Scribe" },
        { quip: "Please give me a quip to post here.", title: "Chronicler" },
        { quip: "Please give me a quip to post here.", title: "Speaker" },
        { quip: "Please give me a quip to post here.", title: "Forsaken" },
        { quip: "Easy to know where to start. Impossible to know when to stop.", title: "Theorist" },
        { quip: "Okay!", title: "Wwatt Mann" },//i wonder what makes the below different than the above???
        { quip: "...", title: "Piper Rusting" },
        { quip: "I'm sure you'll understand if I want to make sure everything is in order before I sign.", title: "Jasna" },
        { quip: "Jeeeeeez, fine, its not like I was doing anything with it anyways! Can I have Skyrim now?", title: "Amelie Blightheart" },
        { quip: "Uh. Sure. I can sign that...", title: "Todd Brian Davidson" }

    ];
    const [signatures, setSignatures] = useState(inititialSignatures);
    const quipRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (initialShowing) {
            dialog.setVisible(true);
            setInitialShowing(false);
        }
    }, [initialShowing])

    const onMyWayToStealYourName = () => {
        const title = pickFrom(getPossibleTitles());
        window.alert("Thank you for the gift of your name :) :) :)")
        if (quipRef.current) {
            setSignatures([{ quip: quipRef.current.value, title: title }, ...signatures]);
        }

    }

    return (
        <Fragment key={'guestbook'}>
            <DialogDisclosure style={{ display: "none" }}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
            <Dialog {...dialog} tabIndex={0} style={{ border: "none", outline: "none", position: "fixed", top: "0%", left: "25%", width: "600px" }}>
                <Container>
                    <img src={book_graphic} />
                    <Signatures>
                        <ul>
                            {signatures.map((item, index) => (
                                <li key={item.title + index}>
                                    <Quip>{item.quip}</Quip>
                                    <hr></hr>
                                    <Title>-{item.title}</Title>
                                </li>
                            ))}
                        </ul>
                    </Signatures>
                    <SigningArea>
                        <OminousBullshit>Sign my guest book??? :) :) :)</OminousBullshit>
                        <form>
                            <div><StyledLabel> Quip: </StyledLabel><textarea ref={quipRef}></textarea></div>
                            <div><StyledLabel>Name:</StyledLabel> <input></input></div>
                            <StyledButton onClick={onMyWayToStealYourName}>Sign Your Name?</StyledButton>
                        </form>
                    </SigningArea>
                </Container>
            </Dialog>
        </Fragment>
    )

}