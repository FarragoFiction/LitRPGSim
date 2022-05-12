import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react"
import { click, clickEffect } from ".";
import { initAspects } from "./Modules/Aspect";
import { initInterests } from "./Modules/Interest";
import { Player, randomPlayer } from "./Modules/Player";
import { initClasses } from "./Modules/RPGClass";
import { initStats } from "./Modules/Stat";
import { initThemes } from "./Modules/ThemeStorage";
import { getHydrationImages, hydrationUrl } from "./Utils/FileIndexUtils";
import { getRandomSeed } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
import { isNumeric, stringtoseed } from "./Utils/StringUtils";
import { getParameterByName } from "./Utils/URLUtils";

export const Hydration = (props:any) => {

  const [imgSrc, setImageSrc] = useState<string>();
  const [images, setImages] = useState<string[]>();
  const urlSeed = getParameterByName("seed", null);

  const [seed, setSeed] = useState(urlSeed? parseInt(urlSeed):getRandomSeed());

  const seedRef = useRef(urlSeed? new SeededRandom(parseInt(urlSeed)):new SeededRandom(getRandomSeed()) );

  const [text, setText] = useState("Loading...");

  props.player;

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

useEffect(()=>{
  if(images && seedRef.current.initial_seed !== seed){
    seedRef.current.internal_seed = seed;
    window.history.pushState('', '', `?seed=${seed}`);

    setImageSrc(seedRef.current.pickFrom(images));
  }

},[seed, seedRef,images])


  useEffect(() => {
    const async_func = async () => {
      const images = await getHydrationImages();
      setImages(images);
    }
    async_func();
  }, [])

  useEffect(() => {
    if (images && !imgSrc) {
      setImageSrc(seedRef.current.pickFrom(images));
    }
  }, [imgSrc, images, seedRef])

  return (
    <div>
      <p>JR NOTE: STAY HYDRATED, muzak, text description of glass, up and right and down arrows to pick new image, if you go south 13 times in a row and nothing else you get the muzak from arc 3 with the poem printed out and timed to the words.


      </p>
      <HydrationContainer>

      <Hydration className="hydration" src={`${hydrationUrl}${imgSrc}`} />
      <TextContainer>{text}</TextContainer>
      <SeedContainer autoFocus={true} onChange={(e)=>setSeed(isNumeric(e.target.value)?parseInt(e.target.value):stringtoseed(e.target.value))} defaultValue={`${seed}`}></SeedContainer>
      </HydrationContainer>
      </div>
  )
}