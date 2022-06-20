import {initAspects} from "./Modules/Aspect";
import {initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player, randomPlayer} from "./Modules/Player";
import {initInterests } from "./Modules/Interest";
import {useEffect, useState,Fragment, useCallback, useRef} from 'react';
import { initStats } from "./Modules/Stat";
import Menu from "./Menu";
import {JustTruth} from "./Screens/Secrets/JustTruth";
import RageMode from "./RageMode";
import { fuckUpBGButSoftly } from "./CanvasFuckery/fuckery";
import { click, clickEffect, speakButFunky } from ".";
import ActualGame from "./Screens/Secrets/ActualGame";
import spiral from './images/approved.gif';
import real_eye from './images/real_eye.png';
import eye1 from './images/eye1.png';
import eye2 from './images/eye2.png';
import help_icon from './images/Walkabout/icons8-chat-64.png';

import { domWordMeaningFuckery } from "./Utils/StringUtils";
import { fuckShitUpButOnlyALittle } from "./Screens/Styles";
import { getParameterByName } from "./Utils/URLUtils";
import { CreditsScreen } from "./Screens/Credits";
import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";
import { WalkAround } from "./Screens/WalkAround";
import styled from "@emotion/styled";

interface AppProps{
  seed: number;
}

function App(props: AppProps) {
  const [player, setPlayer] = useState<Player>();
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(angle);
  angleRef.current = angle;

  const [rageMode, setRageMode] = useState(false);
  const [megaGasLight, setMegaGaslight] = useState(false);

  const [actualGameMode, setActualGameMode] = useState(false);
  const [walkMode, setWalkMode] = useState(true);

  const [justTruthMode, setJustTruthMode] = useState(false);

  const [creditsMode, setCreditsMode] = useState(false);

  const warpAngles = ()=>{
    setAngle(getRandomNumberBetween(0,360));
    setTimeout(()=>{
      warpAngles();
   }, 1000)
  }


  useEffect(()=>{
    if(player && player.chaos){
      warpAngles();
    }
  }, [player])

  useEffect(()=>{
    if(!(window as any).setRageMode){
      // :) :) :)
      (window as any).setRageMode = (value:boolean)=>{
        setRageMode(value);
        (window as any).rageMode = value;
      }
    }

    if(!(window as any).setMegaGaslight){
      // :) :) :)
      (window as any).setMegaGaslight = (value:boolean)=>{
        setMegaGaslight(value);
        (window as any).megaGasLight = value;
      }
    }

    if(!(window as any).setJustTruthMode){
      // :) :) :)
      (window as any).setJustTruthMode = (value:boolean)=>{
        setJustTruthMode(value);
        (window as any).justTruthMode = value;
      };
    }

    if(!(window as any).setWalkMode){
      // :) :) :)
      (window as any).setWalkMode = (value:boolean)=>{
        setWalkMode(value);
        (window as any).walkMode = value;
      };
    }

    if(!(window as any).setCreditsMode){
      // :) :) :)
      (window as any).setCreditsMode = (value:boolean)=>{
        setCreditsMode(value);
        (window as any).creditsMode = value;
      };
    }
  },[])

  const fuckupstuffforspiral = useCallback(()=>{
    if(megaGasLight){
      domWordMeaningFuckery();
      fuckShitUpButOnlyALittle();
      setTimeout(()=>{
          window.requestAnimationFrame(()=>{fuckupstuffforspiral()})}, 3000)
      };
  },[megaGasLight]);

  useEffect(()=>{
    fuckupstuffforspiral();
  }, [megaGasLight,fuckupstuffforspiral])

  const detectDivStatus = useCallback((id: string)=> {
    const targetNode = document.getElementById(id);
    if (targetNode) {
      const config = {
        attributes: true,
        attributeFilter: ['id'],
        attributeOldValue: true
      };
      const callback = function (mutationsList: any, observer: any) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.',mutation);
            if(mutation.target.id.toLowerCase() === "ThisIsAGame".toLowerCase()){
              setActualGameMode(true);
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotAGame".toLowerCase()){
              //JR NOTE: Fun fact, I wasn't aware of the "This Is Not A Game" trope in ARGs when I created this! I am being quite literal here: this is not a game. There is no gameplay. It is however, quite explicitly a work of fiction at every single layer.  Zampanio is a creepy pasta JRAFewLayersDown found, NOT a real game JRAFewLayersDown found.  It's fiction even within the fiction.  But it's fun to pretend, isn't it? At every layer. :) :) :)  Boy was JRAFewLayersDown confused (but happy) to find people who were either VERY committed to the bit or lying for, I don't even know, clout? 
              setActualGameMode(false);
            }else if(mutation.target.id.toLowerCase() === "ThisIsASpiral".toLowerCase()){
              var img = new Image();
              img.src = spiral;
              mutation.target.append(img);
              (window as any).setMegaGaslight(true); //whoops, now you've done it
              fuckupstuffforspiral();
            }else if(mutation.target.id.toLowerCase() === "ThisIsANotSpiral".toLowerCase()){
              const img = document.querySelector("#ThisIsANotSpiral img");
              img?.remove();
              (window as any).setMegaGaslight(false); //okay thats fine
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotAnEye1".toLowerCase()){
              mutation.target.src = eye1;
              (window as any).real_eyes = true;

              (window as any).real_eyes = false;
            }else if(mutation.target.id.toLowerCase() === "ThisIsAnEye1".toLowerCase()){
              mutation.target.src = real_eye;
              howCanEyesBeRealIfMirrorsArentReal();
              eyesAreTooRealButDoNotSpeakTheTruth();
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotAnEye2".toLowerCase()){
              mutation.target.src = eye2;
              (window as any).real_eyes = false;
            }else if(mutation.target.id.toLowerCase() === "ThisIsAnEye2".toLowerCase()){
              mutation.target.src = real_eye;
              (window as any).real_eyes = true;

              howCanEyesBeRealIfMirrorsArentReal();
              eyesAreTooRealButDoNotSpeakTheTruth();
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotAMenu".toLowerCase()){
              (window as any).setRageMode(true); //whoops, looks like the jig is up :) :) :)
            }else{
              console.log("JR NOTE: nope! ",mutation.target.id);
            }
          }
        }
      }
      const ob = new MutationObserver(callback);
      ob.observe(targetNode, config);
    }
  }, [fuckupstuffforspiral]);

  const eyesAreTooRealButDoNotSpeakTheTruth=()=>{
    (window as any).real_eyes = true;
    let eye2 = document.getElementById('ThisIsAnEye2');
    let eye1 = document.getElementById('ThisIsAnEye1');

    if(eye1){
      eye1.onclick = ()=>{
        speakButFunky();
      }
    }
    if(eye2){
      eye2.onclick = ()=>{
        speakButFunky();
      }
    }

  }

  /*
  JR NOTE: how it sounds to debug this: 

  "so eyes are real so mirrors should be real and i KNOW the bodies have hit the floor
  so everyhthing should flip turnways, keep up"
  */
  const howCanEyesBeRealIfMirrorsArentReal=()=>{
    console.log("JR Says: howCanEyesBeRealIfMirrorsArentReal?  Checkmate atheists.");
    let theBodiesHitTheFloor = document.getElementById('ThisIsNotAGame')
    if(theBodiesHitTheFloor){
      theBodiesHitTheFloor.style.transform = "scaleX(-1)";
    }else{
      theBodiesHitTheFloor = document.getElementById('ThisIsAGame')
      if(theBodiesHitTheFloor){
        theBodiesHitTheFloor.style.transform = "scaleX(-1)";
      }
    }
  }

  const seed = props.seed;

  const updateURLParams=(player: Player)=>{
    var pageUrl = '?' + `seed=${seed}&themes=${player.theme_keys}`;
    window.history.pushState('', '', pageUrl);
  }

  useEffect(()=>{
    if(getParameterByName("credits", null)){
      setCreditsMode(true);
    }
    if(!player){
      window.addEventListener('click', click);
      window.addEventListener('click', clickEffect);
      (window as any).seed = seed;
      const rand = new SeededRandom(seed);  
      //which goal are you forced to?
      if(rand.nextDouble()>0.5){
        (window as any).chaos = true;
      }else{
        (window as any).chaos = false;
      }
      //order matters, themes are needed for aspects, etc;
      initStats();
      initThemes();
      initAspects(rand);
      initClasses(rand);
      initInterests(rand);
      const player = randomPlayer(rand);
      if(player.chaos){
        setMegaGaslight(true);
        fuckupstuffforspiral();
      }
      setPlayer(player ); 
      detectDivStatus("ThisIsNotAGame");
      detectDivStatus("ThisIsNotAnEye1");
      detectDivStatus("ThisIsNotAnEye2");
      detectDivStatus("ThisIsNotASpiral");
      detectDivStatus("ThisIsAMenu"); //JR NOTE: TODO this can't work here, because this div isn't on page load
      if(!getParameterByName("themes", null)){
        updateURLParams(player);
      }


      fuckUpBGButSoftly(player.order, player.chaos);
  }
  },[player,seed,detectDivStatus])
/*
  The Layers:

* A normal RPG :) :) :)
* okay so you can't close the menu but you CAN unlock skills and new menus and that's kind of fun. Hey look, you got the credits for finishing your skill tree!
* uh. What's this glitchy looking thing?  (on first playthrough if you proc waste it instead picks something else, subsequent playthroughs  you can access it) (can call skills from window directly as a waste or when unlocking them they fire for non wastes)
* OH GOD WHY IS IT ANGRY.
*  hack react to be broken (put the screens or something into window so they can be deleted/fucked up?), allows some force that likes you to contact you, when instead they were being drowned out by the achivement system that hates you.
  */


  if(!player){
    return <div>LOADING FOR REALSIES</div>
  }else{
    //there is nothing wrong here. is fine
    const displayMenu = !justTruthMode && !actualGameMode  && !creditsMode && !walkMode;
    return (
      <Fragment>
        {rageMode && displayMenu ? <RageMode/>:null}
        {rageMode && displayMenu?  <Menu player={player} angle={30}/>:null}
        {rageMode && displayMenu?  <Menu player={player} angle={130}/>:null}
        {displayMenu?  <Menu player={player} angle={angle}/>:null}      
        {justTruthMode && !actualGameMode?  <JustTruth player={player}/>:null}      
        {actualGameMode?  <ActualGame player={player}/>:null}
        {walkMode?  <WalkAround/>:null}      
      
        {creditsMode ?  <CreditsScreen player={player}/>:null}      

      

      Fast TODO (yeah)
      <ul >
        TODO: 
        peewee is the protag, not the wanderer
        its the illusion of West made real, all the blorbos are AI pantomimes of their formers selves
        spawn the end, she kills anything she touches.
        give complex ai to each blorbo.
        make sure to redo the rabbit hole like you did to NorthNorth, make passwords leak easier (which char leaks them? flower chick?)
      </ul>

      </Fragment>
    );
  }
} 

export default App;

