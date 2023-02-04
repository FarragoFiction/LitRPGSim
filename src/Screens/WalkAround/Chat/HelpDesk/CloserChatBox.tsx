import styled from "@emotion/styled"
import { useEffect, useRef, useState } from "react"
import { getRandomNumberBetween } from "../../../../Utils/NonSeededRandUtils"
import { TheCloser } from "./BranchStorage"
import { CustomerSupportSpecialist } from "../../CustomerSupportSpecialist"
import { playSecretCloser, voiceAudio } from "../../../.."
/*
Yes, I voice the Closer. This does NOT mean the Closer is JR. 

I voice the Closer because of my incredible smug skills.
*/

interface CloserProps {
    close: Function
  }

export const CloserChatBox:React.FC<CloserProps> = ({close}) => {

    const ChatContainer = styled.div`
        position: fixed;
        right: 15%;
        top: 15px;
        margin-top: 65px;
        height: 515px;
        width: 1000px;
        color: white;
        text-decoration: none;
        border-radius: 2px;
        box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .4);
    `

    const ChatHeader = styled.div`
        height: 50px;
        color: white;
        background-color: #b72a21;
        font-size: 14px;
        padding: 20px;
        p{
            margin-left: 15px;
        }
    `

    const ChatBody = styled.div`
        color: #b72a21;
        background-color: #f8fafa;
        width: 100%;
        height: 100%;
        p{
            margin-left: 15px;
        }
    `

    const StyledButton = styled.button`
        color: #b72a21;
        background: whie;
    `

    const ChatLine = styled.div`
        padding: 5px;
    `


    const ChatIcon = styled.div`
        clip-path: circle(50% at 50% 50%);
        -webkit-clip-path: circle(43% at 50% 50%);
        display: inline-block;
        background-color: #b72a21;
        color: white;
        padding: 15px;
        font-size: 16px;
        line-height: 10px;
        vertical-align: top;
    `

    
    const ChatOption = styled.div`
        background: #b72a21;
        font-size; 14px;
        color: white;
        display: inline-block;
        width: 225px;
        margin-left: 10px;
        margin-bottom: 8px;
        border: 1px solid #c4c4c4;
        padding: 10px;
        border-radius: 8px;
    `

    const ChatText = styled.div`
        background: white;
        font-size; 14px;
        display: inline-block;
        width: 800px;
        margin-left: 10px;
        border: 1px solid #c4c4c4;
        padding: 10px;
        border-radius: 8px;
    `

    const CustomerServiceHell = styled.div`
        overflow: auto;
        height: 465px;

    `

    interface DirectoryMap {
        [extension: string]: CustomerSupportSpecialist;
    }

    //has initial values in it, but also as the labrynth expands new things get added
    const [currentSpecialist] = useState(new CustomerSupportSpecialist("The Closer", "0", TheCloser()));
    const [allowClose, setAllowClose] = useState(false);
    const [memory] = useState<string[][]>([]);
    const [currentLines, setCurrentLines] = useState<string[][]>([]);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const parts = currentSpecialist.ramble.text.split("\n");

        /*
            playSecretCloser/CustomerService/0.mp3  

            when it is done, display the next part of the text, and play the next audio.
        */
        const audio = new Audio();
        audio.loop = false;
        playSecretCloser(audio,`CustomerService/0.mp3`);


        const nextPart = (index: number, remaining_parts: string[], processedParts: string[][]) => {

            const audio = new Audio();
             audio.loop = false;
             if(!allowClose){
                playSecretCloser(audio,`CustomerService/${index}.mp3`);
             }
            if (remaining_parts.length === 0) {
                setAllowClose(true);
                return;
            }
            const part = remaining_parts[0];
            audio.onended = () => {
                if(part != ""){
                    processedParts = [...processedParts,[currentSpecialist.initials, part]];
                    setCurrentLines(processedParts);
                }
                nextPart(index+1,remaining_parts.slice(1), processedParts);
                if(chatRef.current){
                    chatRef.current.scrollTop = chatRef.current.scrollHeight;
                }            };
        }
        
        audio.onended = () => {
            nextPart(0,parts, []);
        }
    }, [currentSpecialist]);

    return (
        <ChatContainer>

            <ChatHeader>
                <p>The Closer will fulfill your Customer Support needs.</p>

            </ChatHeader>
            <ChatBody>
                <CustomerServiceHell ref={chatRef}>
                    {memory.map((m) => {
                        return (
                            <ChatLine key={"chatline"+m}>
                                {m[0] !== "" ? (<ChatIcon>{m[0]}</ChatIcon>) : null}
                                <ChatText>{m[1]}</ChatText>
                            </ChatLine>)
                    })}
                    {currentLines.map((m) => {
                        return (
                            <ChatLine>
                                {m[0] !== "" ? (<ChatIcon>{currentSpecialist.initials}</ChatIcon>) : null}
                                <ChatText>{m[1]}</ChatText>
                            </ChatLine>)
                    })}
                    {allowClose?<ChatOption onClick={()=>close()}>Close</ChatOption>:null}
                </CustomerServiceHell>
            </ChatBody>

        </ChatContainer>
    )

}