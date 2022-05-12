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
import { getHydrationImages, hydrationUrl } from "./Utils/FileIndexUtils";
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
    window.alert("TODO POEM MODE");
  }

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
        }
      }
      quest.theme_keys = themes.map((item) => {
        return item.key;
      });
      quest.rand = rand;

      setText(quest.replaceTags(quest.flavorText, props.player));
      numberDrinksRef.current = numberDrinksRef.current + 1;
    }

  }, [seed, seedRef, images, numberDrinksRef])


  useEffect(() => {
    const async_func = async () => {
      const images = await getHydrationImages();
      setImages(images);
    }
    async_func();
  }, [])

  const handleUserKeyPress = (event: KeyboardEvent) => {
    if(event.key === "ArrowLeft"){
      down();
    }else if(event.key === "ArrowRight"){
      up();
    }else if(event.key === "ArrowUp"){
      right();
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

  return (
    <div>
      <p>JR NOTE: STAY HYDRATED, muzak,piano, if number more than 1000 muzak from arc 3 with the poem printed out and timed to the words.


      </p>
      <HydrationContainer>

        <Hydration className="hydration" src={`${hydrationUrl}${imgSrc}`} />
        <TextContainer>{text}</TextContainer>
        <SeedContainer autoFocus={true} onChange={(e) => setSeed(isNumeric(e.target.value) ? parseInt(e.target.value) : stringtoseed(e.target.value))} defaultValue={`${seed}`}></SeedContainer>
        <UpContainer onClick={down}>V</UpContainer>
        <RightContainer onClick={up}>V</RightContainer>
        <DownContainer onClick={right}>V</DownContainer>
      </HydrationContainer>

    </div>
  )
}