import {initAspects} from "./Modules/Aspect";
import {initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player, randomPlayer} from "./Modules/Player";
import {StatusScreen} from "./Screens/Status";
import {LoadingScreen} from "./Screens/Loading";
import {SkillGraphScreen} from "./Screens/SkillsGraph";
import {initInterests } from "./Modules/Interest";
import React, {useEffect, useState,Fragment} from 'react';
import {STATUS, LOADING, SKILLGRAPH, ACHIEVEMENTS, STATISTICS} from "./Utils/constants";
import { initStats } from "./Modules/Stat";
import { getRandomSeed, numbertoseed } from "./Utils/NonSeededRandUtils";
import { getParameterByName } from "./Utils/URLUtils";
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";
import { MenuBox } from "./Screens/Styles";
import { StatisticsScreen } from "./Screens/Statisics";
import { AchivementsScreen } from "./Screens/Achivements";


interface MenuProps{
  player: Player;
}

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

function Menu(props: MenuProps) {
  //order matters, themes are needed for aspects, etc;
  const [currentScreen, setCurrentScreen] = useState(LOADING);
  const [nextScreen, setNextScreen] = useState(STATUS);
  const {player} = props;


  const tab = useTabState();

  //screen and tab should stay in sync plz
  useEffect(()=>{
    tab.setSelectedId(currentScreen);
  }, [currentScreen])

  const handleLoading = (screen:string) =>{
    setNextScreen(screen);
    setCurrentScreen(LOADING);
  }
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
      <div>
        <div>TODO design this better</div>
        <a className="link" onClick={() => {
          //warning: since these are async this might not be the best idea.
          setNextScreen(STATUS);
          setCurrentScreen(LOADING)}
          }>STATUS</a> | 
        <a className="link" onClick={() =>{
          setNextScreen(SKILLGRAPH);
      setCurrentScreen(LOADING)}
      }>SKILLS</a>

      <MenuBox>
        {
          currentScreen === LOADING?
            <LoadingScreen loadScreen={setCurrentScreen} nextScreen={nextScreen}></LoadingScreen>
          :
          <Fragment>
            <TabList style={{borderBottom:"1px solid black"}} {...tab} aria-label="My tabs">
              <Tab style={tab.selectedId == STATUS?selectedTab:unSelectedTab} id={STATUS} {...tab}  onClick={() => {
          //warning: since these are async this might not be the best idea.
          setNextScreen(STATUS);
          setCurrentScreen(LOADING)}
          }>Status</Tab>
              <Tab style={tab.selectedId == SKILLGRAPH?selectedTab:unSelectedTab} id={SKILLGRAPH} onClick={() =>
                {
                  setNextScreen(SKILLGRAPH);
                  setCurrentScreen(LOADING)}
                } {...tab}>
                Skills
              </Tab>

              <Tab style={tab.selectedId == STATISTICS?selectedTab:unSelectedTab} id={STATISTICS} onClick={() =>
                {
                  setNextScreen(STATISTICS);
                  setCurrentScreen(LOADING)}
                } {...tab}>
                Statistics
              </Tab>

              <Tab style={tab.selectedId == ACHIEVEMENTS?selectedTab:unSelectedTab} id={ACHIEVEMENTS} onClick={() =>
                {
                  setNextScreen(ACHIEVEMENTS);
                  setCurrentScreen(LOADING)}
                } {...tab}>
                Achivements
              </Tab>
            </TabList>
            <TabPanel {...tab}>
              {currentScreen === STATUS?<StatusScreen loadScreen={handleLoading} player={player}></StatusScreen>:null}
            </TabPanel>
            <TabPanel {...tab}>
              {currentScreen === SKILLGRAPH?<SkillGraphScreen  loadScreen={handleLoading} player={player}></SkillGraphScreen>:null}

            </TabPanel>

            <TabPanel {...tab}>
              {currentScreen === STATISTICS?<StatisticsScreen  loadScreen={handleLoading} player={player}></StatisticsScreen>:null}

            </TabPanel>

            <TabPanel {...tab}>
              {currentScreen === ACHIEVEMENTS?<AchivementsScreen  loadScreen={handleLoading} player={player}></AchivementsScreen>:null}

            </TabPanel>
          </Fragment>
        }
      </MenuBox>
      </div>
    );
  }
} 

export default Menu;