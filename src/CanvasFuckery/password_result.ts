import wrong_answer from '.././images/Secrets/no.jpg';


import { CameraFeed, AnimationFrame, GraffitiSpot } from "./camera_feed";
import { addImageProcess } from "../Utils/URLUtils";
import { CCTV } from "./cctv_object";
import SeededRandom from '../Utils/SeededRandom';
import { Secret } from './PasswordStorage';
import { loadSecretImage, loadSecretText, playSecret } from '..';

export const right_password = async (canvas:HTMLCanvasElement, secret:Secret) => {
    const frames:AnimationFrame[] = [];
    for(let frame of secret.frames){
        const image = await addImageProcess(loadSecretImage(frame.source)) as HTMLImageElement;
        frames.push(new AnimationFrame(image, frame.durationInFrames));
    }
    const feed = new CameraFeed(0,frames);
    if(secret.music_file_name){
        playSecret(secret.music_file_name);
    }
    if(secret.text){
        processText(secret.title, secret.text);
    }
    const cctv = new CCTV(feed, canvas);
    return cctv;
}

const storyConsole = (title: string, text: string)=>{
    const body = document.querySelector("body");
    if(body){
        const ele = document.createElement("div");
        ele.className="lore"
        ele.innerHTML = `<h1>${title}</h1><p>${text}</p>`;
        body.appendChild(ele);
    }
    console.log(`%c${title}:\n\n%c  ${text}`, "font-weight: bold;font-family: 'cabin', monospace;color:black; font-size:25px;text-decoration:underline;","font-weight: bold;font-family: 'cabin', monospace;color:black; font-size:13px;");
}

const processText = (title: string, location:string)=>{
    const test = loadSecretText(location);
    storyConsole(title,test);
}

export const wrong_password = async (canvas:HTMLCanvasElement, password: string,core_rand:SeededRandom) => {
    const wrong_room = await addImageProcess(wrong_answer) as HTMLImageElement;
    //some of these are downright illegible so here's hoping you don't have bad luck
    const rand = new SeededRandom(new Date().getUTCDate());
    const fonts = ["sister_spray","urban_heroes","the_jacatra","next_custom","mostwasted","marsneveneksk","graffiti_city"];
    rand.nextDouble();
    console.log("JR NOTE: Note: If you don't already know, I'd recommend finding the second Porcupine to make it easier to see the key image. http://www.farragofiction.com/AudioLogs/loras2.html?passPhrase=NotMinotaur")
    console.log("JR NOTE: http://www.farragofiction.com/AudioLogs/loras2.html?passPhrase=Minotaur")

    let font = rand.pickFrom(fonts);
    if(password.includes("http")){
        font = "Times New Roman";
    }
    const feed = new CameraFeed(0,[new AnimationFrame(wrong_room, 1)], [new GraffitiSpot(password,20,250,font,48)]);

    
    const cctv = new CCTV(feed, canvas);
    return cctv;
    
}
