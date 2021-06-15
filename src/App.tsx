import {initAspects} from "./Modules/Aspect";
import {initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player, randomPlayer} from "./Modules/Player";
import {initInterests } from "./Modules/Interest";
import React, {useEffect, useState,Fragment} from 'react';
import { initStats } from "./Modules/Stat";
import { getRandomSeed, numbertoseed } from "./Utils/NonSeededRandUtils";
import { getParameterByName } from "./Utils/URLUtils";
import Menu from "./Menu";
import RageMode from "./RageMode";



const selectedTab = {
  "border": "1px solid black",
  "fontSize":"24px",
  "background": "white",
  "borderBottom": "2px solid white",
  "borderRadius": "5px",
  "borderBottomLeftRadius": "0px",
  "borderBottomRightRadius": "0px",
}

const unSelectedTab = {
  "border": "none",
  "fontSize":"24px",
  "background": "white",
}

function App() {
  const [player, setPlayer] = useState<Player>();
  const [rageMode, setRageMode] = useState(false);

  useEffect(()=>{
    if(!(window as any).setRageMode){
      // :) :) :)
      (window as any).setRageMode = setRageMode;
    }
  },[])



  useEffect(()=>{
    if(!player){
      let urlseed:string|number|null = getParameterByName("seed",null);
      let initial_seed;
      if (urlseed){
        initial_seed = numbertoseed(urlseed);
      }

      if(!initial_seed){
        initial_seed= getRandomSeed();
      }
      const rand = new SeededRandom(initial_seed);  
      //order matters, themes are needed for aspects, etc;
      initStats();
      initThemes();
      initAspects(rand);
      initClasses(rand);
      initInterests(rand);

      setPlayer(randomPlayer(rand) ); 
  }
  },[player])
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

    return (
      <Fragment>
        <button onClick={()=> setRageMode(!rageMode)}>TEST RAGE MODE PLZ</button>
        {rageMode? <RageMode/>:null}
        <Menu player={player}/>
      

      

      Fast TODO (yeah)
      <ul style={{display: "none"}}>

        <li>options, things like volume, opacity/blurring, haxMode, etc.</li>
        <li>as waste class options always in skill tree, if unlock skill you get popup that says "im sorry, but hacking commands from the skill graph are currently disabled", and have a secret, but on screen way to enable them. maybe in the options menu. (obvs haxMode=on)</li>
        <li>waste class, all skills are the names of hack methods on window. choosing those skills calls the method.</li>
        <li>calling ANY hack method that implies you've played the game (such as combat time) or having enough errors activates RAGE MODE</li>
        <li>allow literal hacking of DOM too, if they edit statistics page, slorp it up.</li>
        <li>rename skills to have insults based on themes</li>
        <li>port in fractal sim to be the bg for RAGE MODE</li>
        <li>center skills tree on last unlocked skill, or root if none</li>
        <li>later, make it so if its your first playthrough (check local storage) and you get waste class it changes to something else.</li>
        <li>implement more achivment trigger types</li>
        <li>achivements award skill points (number of which is passed into achivement)</li>
        <li>sub titles unlock only when you unlock skills related to them. you have to discover them, essentially</li>
        <li>murder yellow text</li>
        <li>player has skill points, can only click on skill if you can afford it and ALL its parents are unlocked ("are you sure" popup)</li>
        <li>skills that unlock other menu screens/upgrade them (replace a stat with it)</li>
        <li>zero player game where you get little mini stories about what you 'did', like "used Medical Crown to heal a king" or whatever.  if the game were working PROPERLY it should praise you for whatever skill you've used the most, but obviously you've never used a single skill so it just picks one at random or glitches out. have console logs about ERORR NO FAVORIE SKILL FOUND etc.</li>
        <li>experiment with three themes mixed together (how would names work? be all grandiose, look at fraymotifs, maybe always add music or something at the end?)</li>

      </ul>
      </Fragment>
    );
  }
} 

export default App;
