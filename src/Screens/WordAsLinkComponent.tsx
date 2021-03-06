import styled from "@emotion/styled"
import { callbackify } from "node:util"

interface LinkifyProps {
    text: string;
    target_word: string;
    callback: Function;
    className: string;
    style: any;

}

const LinkContainer = styled.span`
    cursor: pointer;
    text-decoration: underline;  
`

//todo might be useful to export this
export const LinkifyWordsComponent = (props: LinkifyProps) => {

    return (
        <div className={props.className} style={props.style}>
            {props.text.split(" ").map((word,index) => {
                return (word.toUpperCase().includes(props.target_word.toUpperCase()) ?
                    (<LinkContainer key={`${word}${index}`} onClick={()=>props.callback()}>{word} </LinkContainer>)
                    :
                    (<span key={`${word}${index}`}>{word} </span>))
            })}
        </div>
    )

}