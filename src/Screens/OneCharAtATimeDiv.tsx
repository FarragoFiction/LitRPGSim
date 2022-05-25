import { useCallback, useEffect, useState } from "react";
import { clickEffect } from "..";

interface RoomProps {
    text: string;
  }
export const OneCharAtATimeDiv = (props: RoomProps) => {
    const {text} = props;
    const [index, setIndex] = useState(0);
    const [skip, setSkip] = useState(false);
    

    const incrementIndex = useCallback(()=>{
        if(!skip && index < text.length){
            setTimeout(()=>{
                clickEffect();
                window.requestAnimationFrame(()=>{setIndex(index +1)})}, 50)
        }

    },[index, text, setIndex]);

    useEffect(()=>{
        incrementIndex();
    },[index,incrementIndex]);

    useEffect(()=>{
        console.log("JR NOTE: OneCharAtATime got text", text);
        setSkip(false);
        setIndex(0);
    },[text]);

    return(
        <div onClick={()=>{setSkip(true)}}>
            {skip? text:text.substr(0, index)}
        </div>
    )


}