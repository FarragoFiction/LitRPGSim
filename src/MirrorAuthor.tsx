import styled from "@emotion/styled";
import {MutableRefObject, useEffect, useRef, useState } from "react";
import { feetEffect } from ".";
import { pointWithinBoundingBox } from "./Author";
import { achieveGnosis3, achieveGnosis4, achieveGnosisNegative1 } from "./gnosis";
import { Item, ItemMap } from "./Truth";


(window as any).achieveGnosis4 = achieveGnosis4;

(window as any).achieveGnosis3 = achieveGnosis3;
(window as any).achieveGnosisNegative1 = achieveGnosisNegative1;


export type MirrorAuthorParams = {
  items: ItemMap;
  playerLocation:{top:number, left: number};
  src: {loc: string, flip: boolean};
  rotRef: MutableRefObject<number>;
}

const MirrorAuthor: React.FC<MirrorAuthorParams> = ({rotRef, playerLocation,src}) => {
  const left = "http://farragofiction.com/ZampanioHotlink/JRmoveleft.gif";
  const down = "http://farragofiction.com/ZampanioHotlink/jrwalkforward.gif";
  const up = "http://farragofiction.com/ZampanioHotlink/jrwalkgoup.gif";

  const offset = 400;
  const playerWidth = 100;
  const playerHeight = 100;
  //because a ref is MORE accessible to static things like window events than a state would be rip
  //terrible and disgusting (east didn't need this cuz it rerendered from the top)
  const playerRef = useRef(playerLocation);

  useEffect(() => {
    playerRef.current = playerLocation;
  }, [playerLocation])



  return (
    <img style={{filter:rotRef.current> 1000?"brightness(25%)":"", zIndex: rotRef.current>1000?1000:-1,transform: src.flip?"scaleX(-1)":"scaleX(1)", width: "100px", imageRendering: "pixelated", position: "absolute", left: `${playerLocation.left}px`, top: `${playerLocation.top}px` }} src={src.loc} />
  );
}

export default MirrorAuthor;
