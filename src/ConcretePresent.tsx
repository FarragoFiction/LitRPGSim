import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { announcementEffect, doorEffect } from ".";
import Author from "./Author";
import Bench from "./Bench";
import CentralImage from "./CentralImage";
import { all_concepts } from "./CoreConcept";
import Door from "./Door";
import { achieveGnosis3 } from "./gnosis";
import MirrorAuthor from "./MirrorAuthor";
import { RoomParams, RoomParamsPlusTravel } from "./Truth";


import SeededRandom from "./Utils/SeededRandom";

export const Content = styled.div`
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
`
const Popup = styled.div`
    border: 2px solid black;
    z-index: 500;
    border-radius: 13px;
    padding: 5px;
    position: absolute;
    bottom: 50%;
    width: 400px;
    left: 8%;
    font-weight: bolder;
    padding-left: 13px;
    font-family: 'Courier New', monospace;
    padding-right: 13px;
    margin: 10px;
    background: black;
    color: white;
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);`
const ConcretePresent: React.FC<RoomParamsPlusTravel> = ({ rotLevel, room, goSouth, goNorth, index }) => {
  //fuck up the present as the rot sets in
  const [src, setSrc] = useState("http://farragofiction.com/ZampanioGoshShouldYouTrustThis/empty.PNG");


  useEffect(() => {
    const normal = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/empty.PNG";
    const emptyWithMirror = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/emptyWithMirror.PNG";
    const twitchingMirror = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/fuckedUpRoom2.gif";
    const bloody = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/bloody.png";
    const staticRoom = "http://farragofiction.com/ZampanioHotlink/static.gif";
    const rand = new SeededRandom(index);

    if(rotLevel > 1000 && src === bloody){
      setSrc(staticRoom)
    }else if(rotLevel > 100 && src === twitchingMirror){
      setSrc(bloody)
    }else if(rotLevel > 10 && src === emptyWithMirror){
      setSrc(twitchingMirror)
    }else if(rotLevel > 1 && src === normal){
      setSrc(emptyWithMirror);
    }
  }, [rotLevel, src,index])

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("style", "background: black; color: red;");
    }
  }, [])

  //50% brightness at 1k, 0 brightness at 100k
  const brightnessEquation = () => {
    return (rotLevel * -.001) + 100;

  }
  const filter = () => {
    return `hue-rotate(${room.tint}deg) grayscale(${room.greyscale}%) brightness(${rotLevel < 1000 ? room.brightness : (brightnessEquation())}%) contrast(${room.contrast}%)`;
  }

  const canGoNorth = index !== 0;

  //TODO: bench locations and door locations come from array
  //pass them to JR so jr knows how to interact with them

  const items = {
    southDoor: { left: 231, top: 516 },
    northDoor: { left: 231, top: 4 },
    bench1: { left: 314, top: 210, width: 200, height: 75 },
    bench2: { left: 314, top: 320, width: 200, height: 75 },
    bench3: { left: 314, top: 450 - 25, width: 200, height: 75 },
    bench4: { left: 25, top: 210, width: 200, height: 75 },
    bench5: { left: 25, top: 320, width: 200, height: 75 },
    bench6: { left: 25, top: 450 - 25, width: 200, height: 75 },
  }


  const offset = 200;
  const [mirrorPlayerLocation, setMirrorPlayerLocation] = useState({ left: 215, top: 150 - offset });
  const [jaimieTime, setJaimieTime] = useState(false);
  const [shake, setShake] = useState(true);
  //the record to the East is practically useless because of the birbs, but here you get nothing but the truth
  const [conceptsSeen, setConceptsSeen] = useState<string[]>([]);

  const shakeRef = useRef(true);

  const [mirrorSrc, setMirrorSrc] = useState({ loc: "http://farragofiction.com/ZampanioHotlink/jrwalkforward.gif", flip: false });
  const mirrorRef = useRef(mirrorPlayerLocation);
  const conceptRef = useRef(room.coreConcept);

  const rotRef = useRef(rotLevel);//needed for player
  useEffect(() => {
    mirrorRef.current = mirrorPlayerLocation;
  }, [mirrorPlayerLocation])

  useEffect(() => {
    conceptRef.current = room.coreConcept;
    if(!conceptsSeen.includes(room.coreConcept.src)){
      conceptsSeen.push(room.coreConcept.src);
    }
    if(100*(conceptsSeen.length/all_concepts.length) === 100){
      achieveGnosis3();
    }
    if(index === 1000){
      const ICsversionoftoday = `Dear Princess Celestia,

      Good heavens, JR got scammed twice today- or at least in the last reported 24-hour-cycle, which still remains incredibly hard to define. The first time, they appeared to want to get rid of bamboo, for some reason-- there is no bamboo anywhere in the relative vicinity that I am aware of. As of now, there are zero bamboo-related rooms in the maze, and goodness forgive that they are in fact talking about removing the concept of bamboo out of the echidna for all of time. Either way, though, it led them to an early development website for bamboo clearing that was composed entirely of images containing links to other images. I am not entirely sure on how they managed to give them money in the first place.
      
      The second time was, presumably, because they wanted to make sure they were still alive. They heard a rumour that they had died from a cult (this does not even remotely narrow it down) and it APPEARS they needed to make sure. The vandal got away with around an incremental american dollar, which also means nothing, as coin is entirely a man-made construct, but according to JR, so are names, which is also something that was stolen in the exchange-- again, somehow. I am not going to ask. I have learned absolutely nothing from this encounter, and I doubt they have either. The eternal present continues to reign eternal.
      
      -IC`;
      console.log(`%c${ICsversionoftoday}`, "font-weight: bold;font-family: 'Courier New', monospace;color:white; background: black; padding:10px; border-radius: 13px; font-size:13px;");
    }
  }, [room])

  useEffect(() => {
    rotRef.current = rotLevel;

  }, [rotLevel])

  useEffect(()=>{
    console.log("JR NOTE: if the shaking is bothering you: toggleShake()");
    (window as any).toggleShake = ()=>{
      console.log("JR NOTE: shake is", shakeRef.current)
      shakeRef.current = !shakeRef.current;
      setShake(shakeRef.current);
    }

    (window as any).noShake = ()=>{
      console.log("JR NOTE: shake is", shakeRef.current)
      shakeRef.current =false;
      setShake(shakeRef.current);
    }
  },[])




  //if its jaimie time, you have 5 seconds to read it
  //if its not, it'll wait one minute before it is
  useEffect(() => {
    if (jaimieTime) {
      const timer = setTimeout(() => {
        setJaimieTime(false);
      }, 20000)

      return () => {
        clearTimeout(timer);
      };
    }else{
      const timer = setTimeout(() => {
        announcementEffect();
        setJaimieTime(true);
      }, 60000)

      return () => {
        clearTimeout(timer);
      };
    }

  }, [jaimieTime])



  return (
    <div>

      <div style={{ overflow: "hidden", marginBottom: "50px", marginTop: "50px", "position": "relative", "display": "block", "width": "546px", marginLeft: "auto", marginRight: "auto", animation: shake? `shake 0.5s linear infinite`:`` }} id="present">
        <div style={{ zIndex: 33, fontSize: "30px", color: "white", position: "absolute", "right": "15px", "top": "15px" }}>Car {`${index + 1}`}</div>
        <div style={{ zIndex: 33, fontSize: "30px", color: "white", position: "absolute", "right": "15px", "top": "45px" }}>{`${Math.floor(100*(conceptsSeen.length/all_concepts.length))}% Seen`}</div>
        <img style={{ filter: filter(), zIndex: -2, position: "absolute", top: "-20px", left: "0px", width: "546px" }} src="http://farragofiction.com/ZampanioHotlink/mirrorfloor.PNG" />
        <img style={{ filter: filter(), display: "block", width: "546px" }} id="current_room" src={src} />
        {canGoNorth ? <Door rotLevel={rotLevel} onClick={() => goNorth()} style={{ display: "block", width: "75px", position: "absolute", top: `${items.northDoor.top}px`, left: `${items.northDoor.left}px`, cursor: "pointer" }} sourceLocation={"http://farragofiction.com/ZampanioGoshShouldYouTrustThis/northdoor.PNG"} /> : null}
        <Door rotLevel={rotLevel} onClick={() => goSouth()} style={{ width: "75px", position: "absolute", top: `${items.southDoor.top}px`, left: `${items.southDoor.left}px`, cursor: "pointer" }} sourceLocation={"http://farragofiction.com/ZampanioGoshShouldYouTrustThis/southdoor.PNG"} />
        {Object.entries(items).map((item: any, index) => {
          if (item[0].includes("bench")) {
            return (
              <Bench key={`bench${index}`} room={room} rotLevel={rotLevel} left={item[1].left} top={item[1].top} />
            )
          }
          return null;
        })}
        <CentralImage source={room.coreConcept.src}/>
        <Author conceptRef={conceptRef} mirrorOffset={offset} rotRef={rotRef} mirrorLocationRef={mirrorRef} items={items} goNorth={canGoNorth ? goNorth : null} goSouth={goSouth} setMirrorPlayerLocation={setMirrorPlayerLocation} setMirrorSrc={setMirrorSrc} />
        <MirrorAuthor rotRef={rotRef} items={items} src={mirrorSrc} playerLocation={mirrorPlayerLocation} />
        {jaimieTime ? <Popup dangerouslySetInnerHTML={{ __html: `<p><i>The intercome crackles to life: </i></p>${room.coreConcept.jaimieThought}` }}></Popup> : null}
        {rotLevel > 100 ? <div className="filmgrain" style={{ opacity: rotLevel / 1000 }} /> : null}
      </div>

    </div>
  );
}

export default ConcretePresent;
