import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react"
import { click, clickEffect } from ".";
import { initAspects } from "./Modules/Aspect";
import { initInterests } from "./Modules/Interest";
import { Player, randomPlayer } from "./Modules/Player";
import { GodDescription, QuestObject } from "./Modules/Quests/QuestObject";
import { initClasses } from "./Modules/RPGClass";
import { initStats } from "./Modules/Stat";
import { all_themes } from "./Modules/Theme";
import { genericEndingQuests, genericMiddleQuests, genericStartingQuests, initThemes } from "./Modules/ThemeStorage";
import { QUESTS } from "./Utils/constants";
import { getHydrationImages, getHydrationMusic, hydrationMusicUrl, hydrationUrl } from "./Utils/FileIndexUtils";
import { getRandomNumberBetween, getRandomSeed } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
import { isNumeric, stringtoseed } from "./Utils/StringUtils";
import { getParameterByName } from "./Utils/URLUtils";



interface StatusProps {
  player: Player;
}
export const Hydration = (props: StatusProps) => {

  const [imgSrc, setImageSrc] = useState<string>();
  const [images, setImages] = useState<string[]>();
  const  audioFilesRef = useRef(["http://farragofiction.com/CodexOfRuin/MallMusicMuzakMallOf1974/Mall%20Music%20Muzak%20-%20Mall%20Of%201974%20-%2013%20Parking%20Lot%20Lost.mp3"]);

  const urlSeed = getParameterByName("seed", null);

  const [seed, setSeed] = useState(urlSeed ? parseInt(urlSeed) : getRandomSeed());

  const numberDrinksRef = useRef(0);

  const seedRef = useRef(urlSeed ? new SeededRandom(parseInt(urlSeed)) : new SeededRandom(getRandomSeed()));

  const [text, setText] = useState("You seem thirsty. Why not have a drink?");

  const poem = `
  
  DO YOU REMEMBER THE MALL OF YOUR CHILDHOOD?
THE SMELL OF ORANGE JULIUS THAT LINGERS IN YOUR NOSTRILS
OR OF BUTTERED POPCORN WHEN YOU WENT TO THE MOVIES
ALWAYS GONE BEFORE IT STARTED

DO YOU REMEMBER THE CHATTER OF PASSERBY?
SEEING ALL THOSE GROUPS OF FRIENDS JUST LOOKING FOR FUN
OR PEOPLE THAT TIME AND DISTANCE HAD MADE
NOTHING MORE THAN BORN-AGAIN STRANGERS

IT IS ALL SO VIVID IN YOUR HEAD
WHO COULD YOU BLAME? YOU WERE BUT A CHILD
BUT ALAS WE ARE HERE AND THE PAST IS GONE
WHAT’S LEFT IS YOUR MIND BUT THERE’S NO ONE THERE

SO I’LL SEE YOU AGAIN WHEN I WEAR NEW SKIN
A NEW SUIT AND TIE AND A COLOR OF PAINT
BECAUSE EVEN THOUGH YOU’LL COME TO FORGET
I DREAM IN MY THROES OF BEING LOVED AGAIN`;

  const Hydration = styled.img`
  position: absolute;
  display: block;
  width: 1000px;
  object-fit: cover;
  height: 600px;
  border: 5px solid #eeeeee;
  border-radius: 13px;
`

  const HydrationContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: 600px;
  width: 1000px;
  display: block;
  position: relative;
`

  const TextContainer = styled.div`
  position: absolute; 
  padding: 25px;
  margin: 25px;
  background: rgba(255,255,255,0.75);
  font-weight: bolder;
  border-radius: 13px;
`


  const SeedContainer = styled.input`
  position: absolute; 
  right: 25px;
  bottom: 25px;
  background: rgba(255,255,255,0.75);
  font-weight: bolder;
  border-radius: 13px;
  padding: 10px;
  border: none;
`

const DrinkButton = styled.div`
  position: absolute; 
  right: 424px;
  bottom: 253px;
  font-size: 48px;
  cursor: pointer;
  background: rgba(255,255,255,0.75);
  font-weight: bolder;
  height: 75px;
  line-height: 62px;

  border-radius: 13px;
  padding: 12px;
  border: none;
  :hover{
    background: rgba(255,255,255,0.95);
  }
  :active{
    transform: translateY(5px);
  }
`

  const UpContainer = styled.div`
  position: absolute; 
  left: 25px;
  bottom: 275px;
  font-size: 32px;
  background: rgba(255,255,255,0.75);
  font-weight: bolder;
  border-radius: 13px;
  cursor: pointer;
  padding: 10px;
  border: none;
  transform: rotate(90deg);
  :hover{
    background: rgba(255,255,255,0.95);
  }
  :active{
    transform: translateY(5px);
  }
`

  const RightContainer = styled.div`
  position: absolute; 
  right: 25px;
  bottom: 275px;
  font-size: 32px;
  cursor: pointer;
  background: rgba(255,255,255,0.75);
  font-weight: bolder;
  transform: rotate(-90deg);

  border-radius: 13px;
  padding: 10px;
  border: none;
  :hover{
    background: rgba(255,255,255,0.95);
  }
  :active{
    transform: translateY(5px);
  }
`

  const DownContainer = styled.div`
  position: absolute; 
  right: 515px;
  font-size: 32px;
  cursor: pointer;
  bottom: 5px;
  background: rgba(255,255,255,0.75);
  font-weight: bolder;
  border-radius: 13px;
  padding: 10px;
  border: none;
  :hover{
    background: rgba(255,255,255,0.95);
  }
  :active{
    transform: translateY(5px);
  }


`

  const fancyLog = (title: string, text: string) => {
    console.log(`%c${title}%c  ${text}`, "width: 1000px;background: black; padding: 10px;font-weight: bold;font-family: norwester, monospace;color:#e39447; font-size:25px;text-decoration:underline;", "background: black; padding: 10px;font-weight: bold;font-family: norwester, monospace;color:#e39447; font-size:25px;");
  }

  //why yes i did in fact make all of these mislabled specifically to trap myself in a labyrinth of my own making
  //thanks for asking

  const right = () => {
    fancyLog("JR NOTE:", "To the East is raw chaos.");
    numberDrinksRef.current = getRandomNumberBetween(1,113);

    setSeed(getRandomSeed())
  }

  const up = () => {
    fancyLog("JR NOTE:", "To the North is more of the same.");
    setSeed(seed + 1)
  }

  const down = () => {
    fancyLog("JR NOTE:", "To the North is more of the same.");
    setSeed(seed - 1)
  }

  const left = () => {
    fancyLog("JR NOTE:", "To the South is the destruction of illusions.");
    numberDrinksRef.current = numberDrinksRef.current + 100;

    setSeed(seed * 1000)

  }

  const startPoemMode = () => {
    const ele = document.querySelector("#muzak");
      if(ele){
        (ele as any).src ="http://farragofiction.com/TwoGayJokes/Stories/normal_muzak_2.mp3";
      }
      fancyLog("JR NOTE: ","I'm impressed. You've started to drink. What else might you find if you search the depths? Or is this enough? Is your thirst for secrets quenched? Are you satisfied calling this an ending? Some of you will be. Even more won't even get this far. But what interests me is those who go further, who dig deeper and deeper. What drives those for whom an ending is not an ending? Tell me? Tell the world. If you dig deep enough you'll find a way.");
  }

  //its not shitty code that should be refactored and cleand up its PERFORMANCE art
  /*
  srsly tho its thereaputic to make a shitty labyrinth of code that only serves to confuse my future self
  makes jorb feel less of a mess
  */
  useEffect(() => {
    if (images && (seedRef.current.initial_seed !== seed || !imgSrc)) {
      seedRef.current.internal_seed = seed;
      window.history.pushState('', '', `?seed=${seed}`);
      const rand = seedRef.current;
      if(seed < images.length){ //to help debug
          setImageSrc(images[seed]);
      }else{
        setImageSrc(rand.pickFrom(images));
      }

      const ele = document.querySelector("#muzak");
      if(ele){
        (ele as any).src = hydrationMusicUrl  + rand.pickFrom(audioFilesRef.current);
      }
      let themes = [];
      let number = rand.getRandomNumberBetween(1, 3);
      for (let i = 0; i < number; i++) {
        themes.push(rand.pickFrom(Object.values(all_themes)));
      }
      let core_theme = rand.pickFrom(themes)
      let quest = rand.pickFrom(core_theme.quests); //use an actual theme quest only if you've been here a bit, don't start with one
      if (!quest || numberDrinksRef.current < 10) {
        if (numberDrinksRef.current < 50) {
          quest = rand.pickFrom(genericStartingQuests());
        } else if (numberDrinksRef.current < 100) {
          quest = rand.pickFrom(genericMiddleQuests());
        } else  {
          quest = rand.pickFrom(genericEndingQuests());
        }
        if (numberDrinksRef.current > 600) {
          quest.flavorText = poem;
          startPoemMode();
        }
      }
      quest.theme_keys = themes.map((item) => {
        return item.key;
      });
      quest.god = rand.pickFrom(props.player.gods);
      quest.companion = rand.pickFrom(props.player.companions);
      quest.rand = rand;


      setText(quest.replaceTags(quest.flavorText, props.player));
      numberDrinksRef.current = numberDrinksRef.current + 1;
    }

  }, [seed, seedRef, images, numberDrinksRef])


  useEffect(() => {
    const async_func = async () => {
      const images = await getHydrationImages();
      const audio_files = await getHydrationMusic();
      audioFilesRef.current = audio_files;
      setImages(images);
    }
    async_func();
  }, [])

  const handleUserKeyPress = (event: KeyboardEvent) => {
    if(event.key === "ArrowLeft"){
      down();
      const ele = document.querySelector("#down");
      if(ele){
        ele.classList.add("active");
      }
    }else if(event.key === "ArrowRight"){
      up();
      const ele = document.querySelector("#up");
      if(ele){
        ele.classList.add("active");
      }
    }else if(event.key === "ArrowUp"){
      right();
      const ele = document.querySelector("#right");
      if(ele){
        ele.classList.add("active");
      }
    }else if(event.key === "ArrowDown"){
      left();
    }
}

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
        window.removeEventListener('keydown', handleUserKeyPress);
    };
});

/*
here's how the hydration puzzle works
one: it has all the shit zampanio has in its dom, including links to the knucklessux blog and the puzzle box
two: the images are all coming from zampaniohotlink which is full of mysteries
three: the audio is all coming from CodexofRuin
and four, the muzak with the poem is coming from TwoGayJokes, specially where all IC's blorbo stories are kept 
so anyone who tries to look in the network tab will have a rabbit hole and a half to go through
*/

  return (
    <div>
      <HydrationContainer>

        <Hydration className="hydration" src={`${hydrationUrl}${imgSrc}`} />
        <TextContainer>{text}</TextContainer>
        <SeedContainer autoFocus={true} onChange={(e) => setSeed(isNumeric(e.target.value) ? parseInt(e.target.value) : stringtoseed(e.target.value))} defaultValue={`${seed}`}></SeedContainer>
        <UpContainer id="down" onClick={down}>V</UpContainer>
        <RightContainer id="up" onClick={up}>V</RightContainer>
        <DownContainer id="right" onClick={right}>V</DownContainer>
        <DrinkButton onClick={()=>{fancyLog("JR NOTE: ","Do you REALLY think you drink by pressing a button? How fascinating.")}}>DRINK</DrinkButton>
      </HydrationContainer>

    </div>
  )
}