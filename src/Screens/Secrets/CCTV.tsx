import React, { FormEvent, useEffect, useState } from "react";
import { cctv_ghost_loop } from "../../CanvasFuckery/ghosts";
import cctv from '../.././images/murderbasement.jpeg';
import cctv2 from '../.././images/murderbasement2.jpeg';
import monster1 from '../.././images/monsters/doll/1.png';
import monster2 from '../.././images/monsters/doll/1left.png';

import { justTruthSong } from "../..";
import { addImageProcess } from "../../Utils/URLUtils";
import ReactDOM from "react-dom";
import { Input } from "reakit/Input";
import { albhed_map, passwords } from "../../CanvasFuckery/PasswordStorage";
import { right_password, wrong_password } from "../../CanvasFuckery/password_result";
import styled from "@emotion/styled";
import SeededRandom from "../../Utils/SeededRandom";
import { CCTV } from "../../CanvasFuckery/cctv_object";
import { reportKey, valueAsArray } from "../../Utils/LocalStorageUtils";
interface StatusProps {
    ghosts: boolean;
}

interface PWProps {
    canvas: HTMLCanvasElement;
    rand: SeededRandom;
}

export const PWContainer = styled.div`
    padding: 10px;
    margin: 10px;
    margin-top: 0%;
    font-weight: 500;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    background: rgba(0,0,0,0.5);
    color: red;
`

export const Content = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 25px;
    width: 1000px;
    border-radius: 13px;
`

export const StyledButton = styled.button`
    display: block;
    margin-left: 60px;
    margin-top: 10px;
`

export const StyledInput = styled(Input)`
    margin-left: 60px;
`

//real ghost hours
const startGhostCCTV = async (canvas: HTMLCanvasElement) => {
    const bg1 = await addImageProcess(cctv) as HTMLImageElement;
    const bg2 = await addImageProcess(cctv2) as HTMLImageElement;
    //TODO pick a different monster out depending on your themes
    //obvs we won't have a monster for EVERY scene, but enough.
    //enough to build the vibe of gaslighting and *why* and difficulty communicating
    const mon1 = await addImageProcess(monster1) as HTMLImageElement;
    const mon2 = await addImageProcess(monster2) as HTMLImageElement;
    cctv_ghost_loop(canvas, bg1, bg2, mon1, mon2);

}

export const CCTVScreen = (props: StatusProps) => {
    const { ghosts } = props;

    (window as any).dontrotatemusic = true;
    const [burnMode, setBurnMode] = useState(false);

    useEffect(()=>{
        //why would someone as cowardly as Devona hide something so important in a spooky haunted basement security office?
        //scooby doo rules.
        //she never meant for you to find this.
        //http://farragofiction.com/TwoGayJokes/Stories/in_which_devona_has_the_fear_of_god_inserted_into_her
        let blorbo_array = valueAsArray(reportKey)
        const twins = `N4IgdghgtgpiBcIAqALGACJB1AkgOQGUQAaEAExgGcBLAc0gBdqB7MBEAGQFoAGLgJQBMAgCwkQAJ2qUA1uyQBRJAAlxDNLErsOOAOLKkxdAEZjAZiMA1API4AIkdMX0+AnoOPzR1+8MmjAGLW-Eg4SACqdgqezkEhYZHR-uh2OADCytZI1gCyAJoxRsrheH5ORgBCAIL8dgTE5RU4tfVO4pQMEAxaiAoAGor8eFUcDV4AClWhCqXEPMT2CiM4BKFpYxZp4fw41uH18xzWeSMbxDMK-LpK6RviMAAeEADGDAA2AJ4A+uoSMDA-agABx6nF4AmE-BE6AgQKBMAgEnQDGY6AARhgIOggRBqEjmAAzdDMCRkaiQCQfdAoACuUAgYEoADpvETWBhYFAMfiidw+EJROhpEKwAArGl-MjItDE9QwJEAd2obzeyIkDMoBJJUCZ6D1Rj5EPQSpV6GeEDeUE+2IllBpGDlxLAGAVKFRKERsClhqh6C1iv+Mko6BpYCYqoJ5It1q6nWeMnJtF1PuhJtVQNt9ulGHZxrd1M9MG94KEfpJ6EoMAAbvKLdTmLazRAaTQwLQzR7mMGGVKKB0JDTXiwwDDg5QZbRmFQmeJyR1ya92JZ5VSOMwFcQ0swoFBWJvt7uwPud3vl5T0Mo6ChZ4yrwwlyv0GuN1uT0fX4fj5+z1TL7Rr6QsYvCgsBhuwf4oMQEFQVeMH-nBAGSDAQJ-JQNCsNo67EM+2FYThz7tJ0aLKtQDDfG81YwG87DGOIkpfBQBIwIycCIMYTI8OIrqkQCjHMZWNEceIaJvC8MgMTATEsewghCaQOIURJUkCYgTIAOyzlAtBfJQEjPOwKAMAwQLwAA9KZBKIuqk6RkOrBMs826mQAWtAOJgCwyjMO85IyKZDBKoyTJAm2hEkt8FCdMqoKGcZZkWVZEA2dQdlgA5TlIAqzC6BAHwAFLMDIVCmQAOmAZWxSZ5mWRI1mEilTD2Y5UCmZl2W5QVRWUKZ5JfNxzwoF8zpVsqim0DA3RfOuzpkF8PYSVWrAQF89JdV8pFfJRlJoswZDfFRlaUF8KHMCJMBQGVajArRiA+pC0KwvCiLIqiGIwtiuI8sSpJRuetL0kFV1AoI7AuGyzroJy3LEryJb3UKwbkuKkrZrKaCKqNaoav6Op6ugQNmKDd3Gpj5qWtaGYSHaDoyrmrruoWxb8tC-rGoGwahuGfpRiqVJAfGibJiWqaY5T1Oo3T+YehIXpPnDZZIpWNbqqqbqNuaLaJh2EBdjCYC9lQDADqlo4VhOU7MiAAC+QA`;
        const end = `N4IgdghgtgpiBcIAqALGACAomAJiANCDjAM4CWA5pAC5kD2YCIAMgLQAMrAjAOwEgAnMiQDWTABKZ+1NLBJMAIgHklAWXxcuAZnyYAcgoCSegOIBlDdvwBpPYZPik+ABzt8AJUwAFT2bOGlPUsdZkDMZgBNfAAmEMwAQQVMd3wAVlT8MwBhcSVmeJTY-CS7eOZg-hJqCGp5REwADSRkvTL8AE4dL3ikQ30nTR1DJLLDM16sjp0sgFV3AJmLdPxQiLbO3T1kk0wJ-FYNkz0lfwto-hgADwgAY2oAGwBPAH0ZARgYV7IABzqQAHU0GB0BB0CQAK4AIwAVjA7uhqHRwTc0CQEWh0Dc6AAzbFkYHomCPEHvdDYpG4dAAdzIMkJZAE6DQEBwYPuZBuMFZN3uMAgwJx2IAdPhDNj0GxOLx0DAwBQIBRSOh8eh4tRqijYGBqNS6AIRITiRBSeTwZSaXSZDAGUy+aySOzOdzefz0IKRZLuDxlWicAIIFTgYiZeyoPiaviKJiYAJqirqgJFbUQTrXRAAG4xhUYf3UDA4t1gDDfGPoKAMGRC-j4qr4u5MLJ0KDlsD4RvNhhtpstrsd1vtlvVsDkCgoagN7udgdTyf92e9weEGoalBa8eIABqMeJ4koKHwu9HC87zDoVPwW4ExNPVP472+7xI5AYTBvKzPx7nfYPe8q1UhZDstQLy8pm9xMNod5cs8xDYrKJBwIgXBCuchBUigtKfLB8GISA7BCs4-CQvctwiDBMBwcOuH4ak-DfBAvLkZRCEQUKtGEGQUAUM8JACDcTBjtQ3zwAA9CJ2LGv6FA4hytAMEKWJQCJABa0D0WA9DiHQDz4iIImyjgQrfHKf56i8xBxvcfyGNSgH3OgRaZoy5KJjA1DwEy6rCWJEkCFJMl3PQYAKU2IlIFSdAmBAjwAFJ0CIpAifyzxmgh2rPLy6oxtIPxcEwgKyiCYJQrC8KIsiqKEpigoqoaJIYKa5q0ig9KMsy9qOlymIugKuJVoQtDfOciBihKHBejKcrZmiKpqiua66vqdXGg1FKshaLVWja7VshyXU8nyvXCjl3xaK+43SsI6B+gGQZ0CGnHhrQcrRrGEDxsaSZojUILAhmWaKugub5uKDDFqWLaViAAC+QA`;
        const solemn = `N4IgdghgtgpiBcIAqALGACAygeQDIFEBZAORABoQATGAZwEsBzSAFzoHswERcBaABh4AlAIzkQAJzo0A1l3QAtAIIBNAJKkKzNLBpdFSJIoDCACUL5iSMumHCAzNczLcABRPXbD9Cewv8H+2t8ZX8bQKx8I0F8JExrADZ460ViAHF8XDj0AA5s6xN8RVx1VOtc6yNsYgAxfExMVSrrABZm6wApAFUAEXTzSw8xGmYIZl1EfAANJHxBYiKyHkSyF31VCytl1W7C4swkVSMyPjIjTsFGzrjsgFYyXGxlBZ5PMgtZ9IOjnjs7MRgAB4QADGzAANgBPAD6WnEMBgMLoAAdxtx+EJhOhgRAwOgAEYwABmkhgYEo6BxEPQI3EDBgzAAdNZeAIROgAO50MFg9BgNjMdB0gWjEbAtCUJnobpsXn89Bg+noFkY9B0MDMGDiEECzlaJU8ADq-D4dgZYjVwzVoK4RjYUCgHAqdodYFOzsduDY7PuXvNYHoDBQzC4JkYKCd9sd6FtkddSq9zN9FBFIJQsHVIbD+Sz3hzocD2cDYjhSLhNHoHC4nu98Zr1cTdaTIGGEDxXLozGhCoAbjAwVxPMWYJQodRCaSaHBEMIGXwxOyUB2EWOJ1OQDO5xQ8WCQdJR0TVwPZ2IkRAFfvx-61xvzVAGFCaOJgVwg8wkfAAPQfwkQcRahhsISdCguwYAMsCdofvI0CnmA7AmPyYJqtIH40GwCpQGBSJgAwQzMGw4jQtQIxcqiJgwAA5DQ6AAFYAK7DBSgp0RCDIADpgBxr7vl+P5-hAAFASBHDgZBSDsmwqQQBC7RsNItAfhxXHMG+n7fr+-6AcBrAiRBUAfuJknSbJ8k0B+Wiagiv4IswElQgw0lQjRcm0FCaowouNAPvhhFKZwmjIqIiDKmy2K4gSxJ0KS5KUtSv5CmaAVIgATHIIWYpy3KygKQoUipqbDolICsEifyIFKMp8gKCoCulqrqpq2och2KD6kafAmmaAC+QA`;
        const match = `N4IgdghgtgpiBcIAqALGACAsgQSQYQAkQAaEAExgGcBLAc0gBdqB7MBEAGQFoAGLgJQCsJEACdqlANbskAUSRFSDNLErsAyrNn9i6AEx7d-bAHFZug7oDqASXwFdANke6CAeQAK59M+uyAQroAjEEAzLoAYjb83iHh6G7+murqNm4AcsFhugox2AAi6lnxXrJWWsU5-ACqCsUilAwQDGqIsgAacvzp2BzEccQeuDay6UjEXAAcgsQ2+bK9NupINnj92XjV-GnVRdPEHG4Amr0TACxnxKPaZitrFyIwAB4QAMYMADYAngD6yqIwGB-agAB1anF4AkE6EoIJgYDIlHQaFE6CYsHQECREGRAFcoBAwMxqGR0ADKDAIKJXij0OhqGAAG5UJi0ZoM2hotDoRi4gHoZgAMzJlI+1AYXwAdLobMLuHwhDzmOgPqxaDBURSqMjmHD0ILmKjlBhcWBqMzRBSuRh1E0AEbUMUS9AcGDMj7ofIwV4ArFUaXyqHoADujo9dr5YGtIcNH1JhJgwclIgZjQZ73YeGYUCgrF0WZzeYLubAxGLRezJZTYBotBQDHYBDoKFczdbdfbLfQTbrImaTRpsDADcQ5dL6DHZcrFcLpbHIgBIPJNFYjbb3fXPa7W87DXtjvFvw+bpgH3YoQXMDIPwogvhFPYPElwlIwZQ4qBt-vcEQT4A7CIdofG8kg3jAd41j+IBBJKPAiCCEDHmBEEPogMEviA1BQLQPyUNS7D1gwILwAA9CRgpUqIEC0EK1DvCwYCSq82YkQAWtACFmswBDMJ8DKSCRBIMDSkogmAtB7oavwUE0jrgoRxFkRRohUTRgp0UwrBMSxSDBswJgQF8ABSzCSFQJGEj8poUsOPzHgwDAaqJZCCgAOmA7kKaR5GUdRtH0VpzFQGxHGEiwPF8WAAncNUvA8HwS4MgwzmCiITAgkE7CBoqsLwoiyIamiWEYFimJ4gSRIkiKFJUjShX0kyLJ0Oy4nRry-JCiKiGHsmSigno7DoLKLqQoqRIqmqhVakiKC6hgBpGtyprmhqVrGugtoQA6TpfC6J4el6PqUhSlC9SA6UXog2XQqGHzhpG0Z6aIcaYmAibJgAvkAA`;

        if(!blorbo_array.includes(twins)){
            blorbo_array.push(solemn);
            blorbo_array.push(twins);
            blorbo_array.push(match);
            blorbo_array.push(end);
        }
        localStorage[reportKey]  = JSON.stringify(blorbo_array);
    },[])

    //the inherent irony of using react to nuke the dom
    // from orbit and then switch to vanilla javascript is not lost on me.
    //consider this performance art
    //really im just lazy and want to make sure theres as little
    // competition for my cctv loop as possible
    //also, sure, why not, you're trapped in the murder basement
    // now and thers no way out. have fun!
    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            justTruthSong();
            //just fucking remove everything else. inner peace for all.
            body.innerHTML = "";
            body.style.background = "#000000";
            const div = document.createElement("div");
            div.id = "pwfuckery";

            body.append(div);
            const canvas = document.createElement("canvas");
            canvas.width = 480;
            canvas.height = 480;
            canvas.style.marginLeft = "auto";
            canvas.style.marginRight = "auto";
            canvas.style.display = "block";
            canvas.style.padding = "20px";
            body.append(canvas);
            if (ghosts) {
                div.style.color = "white";
                if(burnMode){
                    div.innerText = "You arrive in the BASEMENT TUNNELS.  You do not want to be here. There is a single CCTV monitor and a button. Everything is scorched ash and the sting of a recent fire fills your nostrils.";
                }else{
                    div.innerText = "You arrive in the BASEMENT TUNNELS.  You do not want to be here. There is a single CCTV monitor and a button. You feel like you are being watched. You...huh. Is that an entire person sized pile of McDonald's receipts? Is...is  that a bundle of REPORTS nestled in the center? The feeling of watching fades and you hear rapid footsteps growing distant.";
                }
                startGhostCCTV(canvas);
            } else {
                PasswordFuckeryKickoff(canvas, new SeededRandom((window as any).seed));
            }
        }

    }, [ghosts, startGhostCCTV]);

    return (

        <PWContainer>
        </PWContainer>
    );
}



/*
    Rabbits came before gophers. 

    But if you like gophers better, port 70 is your man.

    And if you like what you find, a03 may have more.
*/
const PasswordFuckery = (props: PWProps) => {
    const [pw, setPW] = useState("");
    const [feed, setFeed] = useState<CCTV>();


    const translate = (word: string) => {
        let ret = word.toLowerCase();
        let done = "";
        for (let i = 0; i < word.length; i++) {
            if ((albhed_map as any)[ret[i]] && !done.includes(ret[i])) {
                done += ret[i];
                ret = ret.replaceAll(ret[i], (albhed_map as any)[ret[i]]);
            }
        }
        return ret;
    }

    useEffect(() => {
        feed?.play();
    }, [feed]);

    const setFeedWithSideEffects = async (new_feed: CCTV) => {
        if (feed) {
            feed.stop();
        }
        setFeed(new_feed);
    }

    //wanted to play around with actually doing input correctly with a sumbmit after seeing a candidate do it
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        for (let key of Object.keys(passwords)) {
            if (key.toUpperCase() === pw.toUpperCase()) {
                setFeedWithSideEffects(await right_password(props.canvas, passwords[pw]));
                return true;
            }

        }
        const troll_pw = translate(pw);
        setFeedWithSideEffects(await wrong_password(props.canvas, troll_pw, props.rand));
        //use effect will play it.
        return false;
    }
    return (
        <PWContainer>
            <Content>
                <p>You are down the rabbit hole. It does not end. If you know important words, you may enter them here.</p>
            </Content>
            <form action="" method="post" onSubmit={onSubmit}>
                <StyledInput onChange={(event) => { setPW(event.target.value.toUpperCase()) }} placeholder="Type Important Words Here"></StyledInput>
                <StyledButton>Submit</StyledButton>
            </form>
        </PWContainer>
    )

}

const PasswordFuckeryKickoff = (canvas: HTMLCanvasElement, rand: SeededRandom) => {
    const ele = document.getElementById('pwfuckery');
    if (!ele) {
        return;
    }

    ReactDOM.render(
        <React.StrictMode>
            <PasswordFuckery canvas={canvas} rand={rand} />
        </React.StrictMode>,
        ele
    );
}