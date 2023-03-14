import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import generic_menu_music from './Music/generic_menu_music.mp3';
import helen_kin_song from './Music/helen_kin_song.mp3';
import seeking_help from './Music/seeking_help.mp3';
import answerer from './Music/answerer.mp3';
import {pickFrom} from './Utils/NonSeededRandUtils';
import subtle_heart from './Music/subtle_heart.mp3';
import heart from './Music/heart.mp3';
import heartbeat from './Music/heartbeat.mp3';
import tap from './Music/tap.mp3';
import feet1 from './Music/feet1.mp3';
import feet2 from './Music/feet2.mp3';
import feet3 from './Music/feet3.mp3';
import  announcement from './Music/249523__pearcewilsonking__announcement-sound.mp3';

import there from './Music/THERE.mp3';
import train from './Music/432373__fedor-ogon__suburban-train-2.mp3';

import voice from './Voice/truthtake3.mp3';
import true_jr from './Voice/true_final_jr.mp3';
import chompSrc from './Voice/543386__nillyplays__nom-noise.mp3'
import game_jr from './Voice/game_final_jr.mp3';
import main_jr from './Voice/main_final_jr.mp3';

import blame from './SecretMusic/youbrokeit.mp3';

import funky_voice from './Voice/truth_but_funky.mp3';

import doorSound from "./Music/close_door_1.mp3";

import clickSound from "./Music/web_SoundFX_254286__jagadamba__mechanical-switch.mp3";
import beepSound from "./Music/264828__cmdrobot__text-message-or-videogame-jump.mp3";
import ghost from "./Voice/507451__horroraudio__ghost-kid-sigh-less-verb.mp3";

import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';


const audio = new Audio(generic_menu_music);
export const voiceAudio = new Audio(voice);//exported so the closer can use this
const clickAudio = new Audio(clickSound);
const beepAudio = new Audio(beepSound);
const feetAudio = new Audio(feet1);
const announcementAudio = new Audio(announcement);

const soundEffectAudio = new Audio(doorSound);

export let BG_VOLUME = 1.0;
audio.volume = BG_VOLUME;

export function setVolumeMusic(percent){
  audio.volume = percent;
  BG_VOLUME = percent;
}

export function playSecret(location){
  audio.src = require(`./SecretMusic/${location}`).default
  audio.play();
}

export function playSecretScratch(location){
  audio.src = require(`./SecretMusic/${location}`).default
  audio.loop = false;
  audio.play();
}

export function playSecretCloser(player,location){
  player.src = require(`./Voice/TheCloser/${location}`).default
  player.play();
}

export function playVoice(location){
  const v = new Audio(voice);//exported so the closer can use this

  v.src = require(`./Voice/${location}`).default
  v.play();
  return v;
}

export function loadSecretImage(location){
  return require(`./images/${location}`).default
}

//the text should be a javascript file exporting const text.
export function loadSecretText(location){
  return require(`./images/${location}`).text
}

//the text should be a javascript file exporting const text.
export function loadCloserText(location){
  return require(`./Voice/${location}`).text
}

 export function rageModeSong(){
  audio.src = heart;
  audio.play();
}

export function playCoffin(){
  //audio.src = tap;
  audio.pause();
}

export function playCredits(){
  if(audio.src !== there){
    audio.src = there;
    audio.loop = true;
    audio.play();
  }
}

export function playTrain(){
  if(audio.src !== train){
    audio.src = train;
    audio.loop = true;
    audio.play();
  }
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

export function chomp(){
  voiceAudio.src = chompSrc;
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

export function playAmbientMazeMusicMadness(){
  audio.src = answerer;
  audio.loop = true;

  audio.play();
}

export function playHelpDeskMusic(){
  audio.src = seeking_help;
  audio.loop = true;
  audio.play();
}

export const click = () =>{
  console.log("first click!");
  playAmbientMazeMusicMadness();
  window.removeEventListener('click', click);
}
export const beepEffect = () =>{
  beepAudio.play();
}

export const clickEffect = () =>{
  clickAudio.play();
}

export const doorEffect = () =>{
  soundEffectAudio.src = doorSound;
  soundEffectAudio.play();
}

export const announcementEffect = () =>{
  announcementAudio.play();
}

export const feetEffect = () =>{
  if(feetAudio.paused){
    feetAudio.src = pickFrom([feet1, feet2, feet3]);
    feetAudio.play();
  }
}

window.localStorage["zampanio"]=true;


document.getElementById('ThisIsNotAGame')


ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('ThisIsNotAGame')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
