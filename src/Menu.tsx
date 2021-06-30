import {Player} from "./Modules/Player";
import {StatusScreen} from "./Screens/Status";
import {LoadingScreen} from "./Screens/Loading";
import {SkillGraphScreen} from "./Screens/SkillsGraph";
import {useEffect, useState,Fragment} from 'react';
import {STATUS, LOADING, SKILLGRAPH, ACHIEVEMENTS, STATISTICS, OPTIONS} from "./Utils/constants";
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";
import { BGCOLOR, BORDERRADIUSROUND, FONTCOLOR, FONTSIZE, MenuBox, MENU_OPACITY } from "./Screens/Styles";
import { StatisticsScreen } from "./Screens/Statisics";
import { AchivementsScreen } from "./Screens/Achivements";
import { fuckery } from "./CanvasFuckery/fuckery";
import { OptionsScreen } from "./Screens/Options";

const selectedTab = {
  "border": `1px solid ${FONTCOLOR}`,
  "fontSize":"24px",
  "font-weight": "bold",
  "background": `${BGCOLOR}`,
  "borderBottom": `2px solid ${BGCOLOR}`,
  "borderRadius": "5px",
  "borderBottomLeftRadius": "0px",
  "borderBottomRightRadius": "0px",
  "-webkit-text-stroke": "black",
  "-webkit-text-fill-color": `#ccb472`,
  '-webkit-text-stroke-width': "1px"
}

const unSelectedTab = {
  "border": `1px solid #ba973a`,
  "font-weight": "bold",
  "fontSize":"24px",
  "borderRadius": "5px",
  "borderBottomLeftRadius": "0px",
  "borderBottomRightRadius": "0px",
  "background": "#d1b056",
  "-webkit-text-stroke": "black",
  "-webkit-text-fill-color": `#ba973a`,
  '-webkit-text-stroke-width': "1px"
  
}
interface MenuProps{
  player: Player;
}
interface TabProps{
  tab: any;
  setNextScreen: any;
  setCurrentScreen: any;
}


function StatusTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === STATUS?selectedTab:unSelectedTab} id={STATUS} {...tab}  onClick={() => {
      //warning: since these are async this might not be the best idea.
      setNextScreen(STATUS);
      setCurrentScreen(LOADING)}
      }>Status</Tab>
  )
}
function AchievementsTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === ACHIEVEMENTS?selectedTab:unSelectedTab} id={ACHIEVEMENTS} onClick={() =>
      {
        setNextScreen(ACHIEVEMENTS);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Achivements
    </Tab>
  )
}

function SkillsTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === SKILLGRAPH?selectedTab:unSelectedTab} id={SKILLGRAPH} onClick={() =>
      {
        setNextScreen(SKILLGRAPH);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Skills
    </Tab>
  )
}

function OptionsTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === OPTIONS?selectedTab:unSelectedTab} id={OPTIONS} onClick={() =>
      {
        setNextScreen(OPTIONS);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Options
    </Tab>
  )
}

function StatisticsTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === STATISTICS?selectedTab:unSelectedTab} id={STATISTICS} onClick={() =>
      {
        setNextScreen(STATISTICS);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Statistics
    </Tab>
  )
}

function Menu(props: MenuProps) {
  //order matters, themes are needed for aspects, etc;
  const [currentScreen, setCurrentScreen] = useState(LOADING);
  const [refresh, setRefresh] = useState(true);
  const [nextScreen, setNextScreen] = useState(STATUS);
  const {player} = props;

 


  const tab = useTabState();

  useEffect(()=>{
      fuckery();
  },[])

  //screen and tab should stay in sync plz
  useEffect(()=>{
    tab.setSelectedId(currentScreen);
  }, [currentScreen,tab])

  const handleLoading = (screen:string) =>{
    setRefresh(true);
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
      <MenuBox opacity={MENU_OPACITY} mediumRadius={BORDERRADIUSROUND} fontColor={FONTCOLOR} bgColor={BGCOLOR} fontSize={FONTSIZE}>
        {
          currentScreen === LOADING?
            <LoadingScreen loadScreen={setCurrentScreen} nextScreen={nextScreen} refresh={refresh}></LoadingScreen>
          :
          <Fragment>
            <TabList  {...tab} aria-label="My tabs">
             
              <StatusTab tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>
              
              <SkillsTab tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>

              <StatisticsTab tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>

              <AchievementsTab tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>


              <OptionsTab tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>

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

            <TabPanel {...tab}>
              {currentScreen === OPTIONS?<OptionsScreen  loadScreen={handleLoading} player={player}></OptionsScreen>:null}

            </TabPanel>
          </Fragment>
        }
      </MenuBox>
      </div>
    );
  }
} 

export default Menu;
