import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import generic_menu_music from './Music/generic_menu_music.mp3';
import helen_kin_song from './Music/helen_kin_song.mp3';
import subtle_heart from './Music/subtle_heart.mp3';
import heart from './Music/heart.mp3';
import heartbeat from './Music/heartbeat.mp3';
import voice from './Voice/truthtake3.mp3';
import true_jr from './Voice/true_final_jr.mp3';
import game_jr from './Voice/game_final_jr.mp3';
import main_jr from './Voice/main_final_jr.mp3';
import { addNumToArrayWithKey } from "./Utils/LocalStorageUtils";
import { STORAGE_KEY } from "./Utils/constants";

import blame from './SecretMusic/youbrokeit.mp3';

import funky_voice from './Voice/truth_but_funky.mp3';

import clickSound from "./Music/web_SoundFX_254286__jagadamba__mechanical-switch.mp3";
import ghost from "./Voice/507451__horroraudio__ghost-kid-sigh-less-verb.mp3";

import {Hydration} from './Hydration';
import reportWebVitals from './reportWebVitals'; 


const audio = new Audio(generic_menu_music);
const voiceAudio = new Audio(voice);
const clickAudio = new Audio(clickSound);

export let BG_VOLUME = 0.1;
audio.volume = BG_VOLUME;

export function setVolumeMusic(percent){
  audio.volume = percent;
  BG_VOLUME = percent;
}

export function playSecret(location){
  audio.src = require(`./SecretMusic/${location}`).default
  audio.play();
}

export function loadSecretImage(location){
  return require(`./images/${location}`).default
}

//the text should be a javascript file exporting const text.
export function loadSecretText(location){
  return require(`./images/${location}`).text
}

 export function rageModeSong(){
  audio.src = heart;
  audio.play();
}

export function blameSong(){
  audio.src = blame;
  audio.play();
}

export function speakTheTruth(){
  voiceAudio.src = true_jr;
  const play = ()=>{
    voiceAudio.play();
    window.removeEventListener('click', play)
  }
  window.addEventListener('click', play);
}

export function speakTheLie(){
  voiceAudio.src = game_jr;
  const play = ()=>{
    voiceAudio.play();
    window.removeEventListener('click', play)
  }
  window.addEventListener('click', play);
}

export function speakTheDefault(){
  voiceAudio.src = main_jr;
  const play = ()=>{
    voiceAudio.play();
    window.removeEventListener('click', play)
  }
  window.addEventListener('click', play);  
}

export function speak(){
  voiceAudio.src = voice;
  voiceAudio.play();
}

export function ghost_sound(){
  voiceAudio.src = ghost;
  voiceAudio.play();
}

export function speakButFunky(){
  voiceAudio.src =funky_voice;
  audio.pause();
  voiceAudio.play();
}

export function justTruthSong(){
  audio.src = heartbeat;
  setVolumeMusic(0.8);
  audio.play();
}

 function playLightlyFuckedUpBGMusic(){
  audio.play();
  audio.onended = function() {
    if(!window.dontrotatemusic && !window.rageMode && !window.justTruthMode && !window.ghost && !window.pwMode){
      if (Math.random() > 0.5) {
        audio.src = helen_kin_song;
      } else {
        audio.src = subtle_heart;
      }
    }else if (window.justTruthMode || window.ghost || window.pwMode){
      audio.src = heartbeat;
    }else if(!window.dontrotatemusic){
      audio.src = heart;
    }else{
      audio.loop = true;
    }
    audio.play();
};
}

export const click = () =>{
  console.log("first click!");
  playLightlyFuckedUpBGMusic();
  window.removeEventListener('click', click);
}
export const beepEffect = () =>{
  clickAudio.play();
}

export const clickEffect = () =>{
  clickAudio.play();
}

window.localStorage["zampanio"]=true;


document.getElementById('ThisIsNotAGame')
window.addEventListener('beforeunload', function(e) {
  addNumToArrayWithKey(STORAGE_KEY, 13); //not a real direction
});

ReactDOM.render(
  <React.StrictMode>
    <Hydration />
  </React.StrictMode>,
  document.getElementById('ThisIsNotAGame')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
