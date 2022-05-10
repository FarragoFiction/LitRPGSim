import { useEffect, useState } from "react"
import { getHydrationImages, hydrationUrl } from "./Utils/FileIndexUtils";
import { pickFrom } from "./Utils/NonSeededRandUtils";

export const Hydration = () => {

  const [imgSrc, setImageSrc] = useState<string>();
  const [images, setImages] = useState<string[]>();

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


  useEffect(() => {
    const async_func = async () => {
      const images = await getHydrationImages();
      setImages(images);
    }
    async_func();
  }, [])

  useEffect(() => {
    if (images) {
      setImageSrc(pickFrom(images));
    }
  }, [imgSrc, images])

  return (
    <div>
      <p>JR NOTE: STAY HYDRATED, TODO random full page image, muzak, text description of glass, up and right and down arrows to pick new image, if you go south 13 times in a row and nothing else you get the muzak from arc 3 with the poem printed out and timed to the words.


      </p>
      <img src={`${hydrationUrl}${imgSrc}`} />
    </div>
  )
}