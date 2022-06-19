import styled from "@emotion/styled";
import { useState } from "react";
import { BIRTHDAY } from "./AppWrapper";
import { LinkButton } from "./Screens/Styles";
import jr from "./images/jr.png";
import fakejr from "./images/falseJR.png";

interface AppProps {
  setMode: any; //lazy don't wanna remember setstate type
}

interface PostProps {
  post: Newspost;
  face: boolean;
}

export const DevLog = styled.table`
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 25px;
    padding-bottom: 25px;    width: 1000px;
    background-color: #edd287;
    border-radius: 13px;
`

export const Gigglesnort = styled.div`
margin-top: 10px;
margin-left: auto;
margin-right: auto;
padding-left: 50px;
padding-right: 50px;
padding-top: 25px;
padding-bottom: 25px;

width: 900px;
background-color: #edd287;
border-radius: 13px;
`

export const AboutDom = styled.div`
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 25px;
    padding-bottom: 25px;

    width: 900px;
    background-color: #edd287;
    border-radius: 13px;
`

export const Post = styled.tr`
  padding: 10px;
  border: 1px solid black;
  background-color: #ffefc4;
  a{
    pointer-events: none;
  }
`

export const Date = styled.span`
  text-decoration: underline;
  display: inline-block;
  font-weight: bolder;
  vertical-align: top;
`
export const Content = styled.td`
  vertical-align: top;
  padding: 5px;
  border-radius: 13px;
`
function NewspostDom(props: PostProps) {
  const [showSecret, setShowSecret] = useState(false);
  const [showSecretFace, setShowSecretFace] = useState(props.face);

  return (
    <Post onMouseOver={() => {
      if (props.post.secret) {
        setShowSecret(!showSecret);
        setShowSecretFace(!showSecret);

      }
    }}>
      <Content>{showSecretFace ? <img width="75" alt="jr" src={jr}></img> : <img width="75" alt="jr" src={fakejr}></img>}</Content>
      <Content>     <Date>{props.post.date}: </Date> <div dangerouslySetInnerHTML={{__html:`${showSecret ? props.post.secret : props.post.post}`}}></div></Content>
    </Post>
  )
}
function About(props: AppProps) {
  const newsposts = [
   new Newspost("06/19/22","i could work on quests forever but i think this is a good start","i want to go east again")
    , new Newspost("06/08/2022","lol i keep forgetting to update this. i added a buncha quests, changed the vibes of the game and also the stuff you can find in the various basements.  and the attic? i think? probably the attic. BlorboBio has been replaced, btw. Don't worry about it.","Don't forget to <a href = 'http://knucklessux.com/HydrationSim/?seed=8270279'>Hydrate</a> :) :) :)")
    ,new Newspost("04/23/2022", "I made a <a href ='http://farragofiction.com/BlorboBio/?data=N4IgdghgtgpiBcIAqALGACAomAJiANCDjAM4CWA5pAC5kD2YCIAMgLQAMrAjAOwEgAnMiQDWTABKZ+1NLBJMAIgHklAWXxcuAZnyYAcgoCSegOIBlDdvwBpPYZPik+ABzt8AJUwAFT2bOGlPUsdZkDMZgBNfAAmEMwAQQVMd3wAVlT8MwBhcSVmeJTY-hJqCGp5REwADSRkvXjmfABOHS94pEN9J00dQySGwzMOrOadLIBVdwDxi3T8UIiG0d09ZJNMYfxWFvwTPSV-C2j+GAAPCABjagAbAE8AfRkBGBhHsgAHCpAAdTQwdAg6BIAFcAEYAKxgV3Q1DowIuaBIMLQ6AudAAZuiyP9kTBbgDnuh0XDcOgAO5kGS4sgCdBoCA4IHXMgXGCMi7XGAQf4Y9EAOnwhnR6DYnF46BgYAoEAopHQ2PQ8WopQRsDA1HJdAEIlx+IghOJwNJFKpMhgNLpXMZJGZrPZnO56F5AtF3B48qROAEEDJ-1hEuZUGxZWxFFRMAEpQVpQEsvKAI1jogADcIzKMN7qBgMU6wBh3hH0FAGDI+fxsSVsVcmFk6FBi2B8LX6wwm3WG22W43mw3y2ByBQUNQa+3Wz2x6Pu5PO73CGUVSg1cPEAA1CP48SUFD4TeDmet5h0Mn4NcCfGHsn8Z7vZ4kcgMJgX+ZH-dTrs7rfFUqgsjM6gPTlU2uJhtCvNl7mIdFJRIOBEC4PljkIMkUEpV5IOg2CQHYPlnH4UFrkuEQIJgKD+0w7DUn4d4IE5YjSJgkC+UowgyCgCh7hIAQLiYIdqHeeAAHoBPRfVvQoDEWVoBg+TRKABIALWgaiwHocQ6BubERAEs17klHBoj5d4pS-LUHmIKNri+d4CNZFA6GuYgBBAABfIA'>blorbo maker</a>. ","Though the downside is that if you try to click any link sin this newspost it absolutely loses its shit.")

    ,new Newspost("04/22/2022", "Good news: the muzak i found probably has hypnotic qualities.  Also good news, i can't stop listening it.","Ria warned me. <a href = 'http://farragofiction.com/BlorboBio/?data=N4IgdghgtgpiBcICyBVAWgQQNIgDQgBMYBnASwHNIAXUgezARAGUBaAYRYCUBWPEAJ1LEA1owwAZAKIAFABJ8qACxixiY6QHk2EgJrSmk3AAIAjCYDMxpJOsAVAJJtjZy0dRNHzi8YBinDGy2EvCm3kbSKNLSkrYh5uZ8xFQQVGqI9gBytpKcGRK4AJyW0hgOklm4Lrj2ACKSEvZMDk4muAFsMg4ZAOKV3uIaOvlV2uJIfQn4MAAeEADGVAA2AJ4A+kr8MDDrpAAOaSAYYMtGTACuAEYAVjALRrQAZkbmRvZgZOSKVPf8RuK0AHcYL8hEZSGA5hBdhALosYPcnnN6MQ5nQzsQVkZdsC5jBSAA3cHkU7sLjcADkxCMxHo5AAdMZ7E8lDAThBNkYZrtaMQYAQjFRaCSODwjA9aL8oBL4UoIGAjNwjEj3rczjR8fCoOC1SQBcoTgDSItFkYLvCkVBsca+QKhcRdpsIPzWCLFYL7izfuyYBBiAyjBgqYtaUZfcKyWCqbtFhBlkSwd9Dcaxfx5sljScqIaknr4cHITR6AnI2D5bQNV75Vz6DAwDQIBnS3NHWQwMTUwRSOi6XxwUlwQtGAA1YEnf4A3Aj-hjwGT0d-WdTmcTpcLgG994UL7D+fjufTtf75dHw+yLd8FLJOaKWB1ncHverx+7xcvldvvibB0kMj0e-Hp9XwfIDjzPT5EmSC4jVIKg1jhDVFkYAAGOkkM-PlViIB5a15ZDUL4AFFBg7YsJwuBEBQ3h8FheZhEwmBsJVPC0PwaE4XoxjcMQAAmfD8FIKByFWYh+DmRgvioXZ4AAemkh52VTchHlIBY6DAOkLWktBoGhMA6FkWglnBYRpIdWhoXIOUCAgOldjbCCJTWIhkiNA5o3mGBFFoRYiH4EAAF8gA'>  Tho she still listens to it too.</a>")

    ,new Newspost("04/18/2022", "Quest engine actually went faster than i thought, hell yes")

     ,new Newspost("04/15/2022", "MAN is it nostalgic coming back here? i've spent so much time wandering the fandom I forgot about my lil corner of it. anyways i'm gonna dust this off and see if i can get the quest system from zampanio working here")];

  const [showSecret, setShowSecret] = useState(Math.random() > 0.5);
  const face = Math.random() > 0.5;

  return (
    <div>
      <AboutDom>
        <h1>About ZampanioSim</h1>
        <Content>
          <p>ZampanioSimulator is a fanmade browser simulation of a game called "Zampanio", from this weird <a href="https://gamefaqs.gamespot.com/pc/3/zampanio">creepypasta FAQ </a>I found.</p>
          <p>Given I'm trying to be true to what appears to be for all intents and purposes a creepy pasta, there's going to be themes that might not be for everybody in here!  Without giving away the premise, here's a broad list of content warnings, though a good rule of thumb is that if you're a fan of Zampanio you're probably gonna be okay with this weird fan work I made of it. </p>
          <p>ALSO! The whole point of Zampanio, simulated or otherwise is the customized experience so don't blame me if you don't get any of these, or get an especially potent dose or something.</p>
          <p>Finally, Wastes Honor: no jump scares or anything lame and cheap like that. Honestly if you stay on your path and don't be a dick to Zampanio, it'll be perfectly nice to you.</p>
          <ul>
            <li>Themes of Unreality</li>
            <li>Creepy sounds/Ambiance</li>
            <li>Unsettling Images</li>
            <li>Violent, Creepy Monsters Described in Text</li>
            <li>Player Blaming</li>
            <li>Player Insulting</li>
            <li>Rabbitholes of Obession</li>
            <li>Addiction Themes</li>
            <li>Strong Langauge (Sorry, that's all me, Zampanio itself is probably not so sweary)</li>
          </ul>
          <p>If I've missed anything I should have had in the warnings, feel free to message me at jadedResearcher at gmail, yeah?</p>
          <p>PLUS theres the wiki and the zampanio specific (not just this sim) discord (though I'm not just gonna LINK them here, you can find them at the end of the Credits, think of them as a reward!)</p>
        </Content>
        <div>
          <LinkButton onClick={() => { props.setMode(BIRTHDAY) }}>Enter Zampanio</LinkButton>
        </div>
      </AboutDom>




      <DevLog>

        <h2 onMouseOver={() => setShowSecret(!showSecret)}><span>Dev Log by</span> <span>{showSecret ? "justifiedRecursion" : "jadedResearcher"}</span>:</h2>
        {newsposts.map((post) => {
          return (<NewspostDom post={post} face={face} />)
        })}
      </DevLog>
    </div>
  );
}
class Newspost {
  date: string;
  post: string;
  secret: string | null;
  constructor(date: string, post: string, secret: string | null = null) {
    this.date = date;
    this.post = post;
    this.secret = secret;
  }
}
export default About;



