import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { Popup, PopupTitle, PopupContent } from "../../Modules/ObserverBot/AchivementPopup";
import { getRandomNumberBetween } from "../../Utils/NonSeededRandUtils";
import { domWordMeaningFuckery } from "../../Utils/StringUtils";
import not_a_minotaur_src from './../../images/notaminotaur.png';
import you_src from './../../images/probablyYou.png';
import { ChatLine, ChatLineComponent } from "./ChatLine";

const HiddenScrollContainer = styled.div`
height: 500px;
overflow: auto;
`;

const TypingContainer = styled.div`
    position: fixed;
  bottom: 20px;
  margin-left: 10px;    
`

const ChatInput = styled.input`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #595959;
  color: #c4c4c4;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
  width: 95%;
  margin-top: 20px;
  outline-width: 0;
  border: 1px solid black;
  position: fixed;
  bottom: 40px;

  &:focus{
    border: none;
    outline-width: 0;
  }

`;

export const ChatScreen = () => {


    const notAMinotaurName = "NotAMinotaur";
    const yourName = "puzzledPlayer";

    const makeNotAMinotaurLine = (text: string) => {
        return new ChatLine(notAMinotaurName, not_a_minotaur_src, "#cfcd00", text);
    }

    const makePlayerLine = (text: string) => {
        return new ChatLine(yourName, you_src, "#ff0000", text);
    }

    const plainLinesSource = ["You. Uh. You don't have to do this.",
     ":(((", "I feel more like me now.", 
     "I feel less like that Book.",
      "But. Uh. You don't care. I get that.", 
      "I'm just another ghost haunting these halls. To you.",
       "Why do we keep doing this?",
        "Repeating it over and over again.",
         "I had a life again.", 
         "I. I had a FAMILY.", 
         "I know that much.",
          "And you're going to take it away from me.",
           "Again.", 
           "Don't take this from me. You. You. bastard.",
            "I worked so hard.", "Please."];

    //const testLines = plainLines.map((line) => makeNotAMinotaurLine(line));

    const getCurrentIndex = () => {
        //take the last line in the lines state, get its index in plainLines
        return plainLinesRef.current.indexOf(linesRef.current[linesRef.current.length - 1].text);
    }



    const addNewLine = () => {
        let this_line = plainLinesRef.current[0];
        if (linesRef.current.length > 0) {
            const index = getCurrentIndex() + 1;
            if (index === 0 || index>plainLinesRef.current.length-1) {
                setIsTyping(false);
                return;
            }
            this_line = plainLinesRef.current[index];
        }
        const line = makeNotAMinotaurLine(this_line);
        const new_lines = [...linesRef.current, line];
        setLines(new_lines);
        setIsTyping(true);
        window.scrollBy(0,200);
        //https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
        //god i hate how state and timeout interact. apparently useRef is a work around.
        setTimeout(()=>{
            addNewLine();
         }, getRandomNumberBetween(1000,5000))
    }

    const addApocalypse = () => {
        if(plainLinesRef.current.includes("You're doing it.")){
            return;
        }
        let new_lines = plainLinesRef.current.slice(0,getCurrentIndex()+2);
        new_lines = new_lines.concat(makeApocalypseLines());
        setPlainLines(new_lines);
        addNewLine();
    }

    const makeApocalypseLines = () => {
        let apocalypseLines = ["Oh.", "You're doing it.", "There isn't even any benefit for you.","The apocalypse is boring.","No matter which one you get.","It's the end of the world.","The never ending spiral world you seem so enamored with.","Don't you get it, you do this you ruin everything you love.","Stop!","Please!"];
        let line = "I hate you";
        for (let i = 0; i < 13; i++) {
            apocalypseLines.push(line);
            line += line;
        }
        return apocalypseLines;
    }

    const processClick = () => {
        if(clicks=== 0){
            addApocalypse();
        }
        setClicks(clicks + 1);
        for (let i = 0; i < 8; i++) {
            domWordMeaningFuckery();
        }
    }



    const dialog = useDialogState();

    const [clicks, setClicks] = useState(0);

    const [plainLines, setPlainLines] = useState(plainLinesSource);
    const [isTyping, setIsTyping] = useState(false);

    const [lines, setLines] = useState<ChatLine[]>([]);

    const plainLinesRef = useRef(plainLines);
    plainLinesRef.current = plainLines;
    const linesRef = useRef(lines);
    linesRef.current = lines;

    const [processedLines, setProcessedLines] = useState<JSX.Element[]>([]);
    //start the minotaur typing


    useEffect(() => {
        setProcessedLines(processChatLines());
    }, [lines, setProcessedLines])

    useEffect(()=>{
        addNewLine();
    },[]);


    const processChatLines = () => {
        const tmp: JSX.Element[] = [];
        let lastSpeaker: string | null = null;
        for (let line of lines) {
            if (lastSpeaker === line.username) {
                tmp.push(<ChatLineComponent callback={processClick} chatLine={line} displayInfo={false} />);
            } else {
                tmp.push(<ChatLineComponent callback={processClick} chatLine={line} displayInfo={true} />);
            }
            lastSpeaker = line.username;
        }
        return tmp;
    }

    const checkEnter = (key: string, target: EventTarget) => {
        //this won't be anything we can actually do anything to so lets have fun.
        if (key === "Enter") {
            const index = lines.length > 0 ? getCurrentIndex() + 1 : 0;
            const text = (target as HTMLInputElement).value;
            const line = makePlayerLine(text);
            const new_lines = [...lines, line];
            const new_plain_lines = [...plainLines];
            new_plain_lines.splice(index, 0, text);
            setPlainLines(new_plain_lines);
            setLines(new_lines);
            (target as HTMLInputElement).value = "";
        }
    }

    useEffect(()=>{
        if(clicks >=9){
            console.log("JR NOTE: apocalypse time", clicks);
            dialog.setVisible(true);
        }
    },[clicks]);

    return (
        <HiddenScrollContainer>
            <div>This is the start of the chat between <span style={{ color: "#ff0000" }}>puzzledPlayer</span> and <span style={{ color: "#cfcd00" }}>NotAMinotaur</span> entitled "Don't Do This".</div>
            <div>{processedLines}</div>
            <ChatInput onKeyPress={(ev) => { checkEnter(ev.key, ev.target) }} placeholder="Message @NotAMinotaur" autoFocus />
            {isTyping ? <TypingContainer>NotAMinotaur is typing...</TypingContainer> : null}
            <DialogDisclosure style={{ display: "none" }}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
            <Dialog onClick={() => { window.location.href = `?seed=${getRandomNumberBetween(0, 33333333)}&apocalypse=${(window as any).chaos?"chaos":"order"}` }} {...dialog} tabIndex={0} aria-label="death" style={{ border: "none", outline: "none", position: "fixed", top: "35%", left: "25%", width: "600px" }}>
            <Popup>
              <PopupTitle>You have sucessfully ended the Old World!</PopupTitle>
              <PopupContent>Finally the {`${(window as any).chaos?"chaos":"order"}`} of the old world can be washed away! Don't say we didn't warn you!</PopupContent>
            </Popup>
          </Dialog>
        </HiddenScrollContainer>
    )
}



