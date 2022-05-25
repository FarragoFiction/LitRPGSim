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
    new Newspost("04/23/2022", "I made a <a href ='http://farragofiction.com/BlorboBio/?data=N4IgdghgtgpiBcIAqALGACAomAJiANCDjAM4CWA5pAC5kD2YCIAMgLQAMrAjAOwEgAnMiQDWTABKZ+1NLBJMAIgHklAWXxcuAZnyYAcgoCSegOIBlDdvwBpPYZPik+ABzt8AJUwAFT2bOGlPUsdZkDMZgBNfAAmEMwAQQVMd3wAVlT8MwBhcSVmeJTY-hJqCGp5REwADSRkvXjmfABOHS94pEN9J00dQySGwzMOrOadLIBVdwDxi3T8UIiG0d09ZJNMYfxWFvwTPSV-C2j+GAAPCABjagAbAE8AfRkBGBhHsgAHCpAAdTQwdAg6BIAFcAEYAKxgV3Q1DowIuaBIMLQ6AudAAZuiyP9kTBbgDnuh0XDcOgAO5kGS4sgCdBoCA4IHXMgXGCMi7XGAQf4Y9EAOnwhnR6DYnF46BgYAoEAopHQ2PQ8WopQRsDA1HJdAEIlx+IghOJwNJFKpMhgNLpXMZJGZrPZnO56F5AtF3B48qROAEEDJ-1hEuZUGxZWxFFRMAEpQVpQEsvKAI1jogADcIzKMN7qBgMU6wBh3hH0FAGDI+fxsSVsVcmFk6FBi2B8LX6wwm3WG22W43mw3y2ByBQUNQa+3Wz2x6Pu5PO73CGUVSg1cPEAA1CP48SUFD4TeDmet5h0Mn4NcCfGHsn8Z7vZ4kcgMJgX+ZH-dTrs7rfFUqgsjM6gPTlU2uJhtCvNl7mIdFJRIOBEC4PljkIMkUEpV5IOg2CQHYPlnH4UFrkuEQIJgKD+0w7DUn4d4IE5YjSJgkC+UowgyCgCh7hIAQLiYIdqHeeAAHoBPRfVvQoDEWVoBg+TRKABIALWgaiwHocQ6BubERAEs17klHBoj5d4pS-LUHmIKNri+d4CNZFA6GuYgBBAABfIA'>blorbo maker</a>. ","Though the downside is that if you try to click any link sin this newspost it absolutely loses its shit.")

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

      <Gigglesnort>
        <h2>Helpful Hints For Secrets :) :) :)</h2>
        <p>So, it's come to my attention that secrets spiralling forever in all directions is not a particularly CHILL thing to experience???
        </p>
        <p>Apparently I got the wrong lesson from Easter Fools that one year?</p>

        <p>So, time for me to bust out the traditional gigglesnort hidey talk to list out every secret I remember there being (in the simulation ONLY not any of the paths out of it) in such a way that HOPEFULLY is barely helpful (or even actively harmful) in terms of finding anything BUT once you've found it you easily recognize it in the list and can check it off!!!
        </p>
        <p>If you've completed your checklist (or even if you're just particularly proud of your progress), let me know! I'm either jadedResearcher or justifiedRecursion on gmail, and if you aren't afraid of the spotlight feel free to edit the wiki (add a page for yourself?) listing what you <b>think</b> the answers to all of these are. I particularly enjoy how much like lies most of the answers sound like :) :) :)
        </p>
        <p>I am ABSOLUTELY pro spoilers for the wiki so long as you've marked them, since AFTER all we need to let our more puzzle challenged associates have a chance to become obsessed with Zampanio as well.  I would appreciate it a lot if people updated the wiki with everything they think is true and everything they want to be true.
        </p>
        <p>If you get my attention in a timely fashion, I may do a shout out to you! Or work you in in some fashion.</p>

        <p>Demonstrating obsession with Zampanio won't HURT your chances of becoming Marked, that's for sure.</p>
        <p>This experience will absolutely be changing over time, both in response to the things I see people doing and just because I doubt I'll ever truly break free. Decide whether you prefer to engage early, when you'll still stand out, or late, when you'll blend into the crowd.  Or after its all over, when you can piece together the entire thing at your leisure with no worries about being seen.</p>

        <p>Bonus points if you show your work through a spiralling fanwork of your own.  I particularly enjoy logs of investigations and rambling disjoint streams of consciousness. </p>

        <p>Feed me.</p>
        <h3>MainPath: </h3>
        <ul>
          <li> Do you know how to walk, jump and skip cutscenes?</li>
          <li>Do you understand why the menu cannot be closed?</li>
          <li>Have you found what lurks behind the menu?</li>
          <li>Have you found what walking reveals?</li>
          <li>How many versions of the background music are there?</li>
          <li>How do you reach the rabbit hole? What prevents you?</li>
          <li>Where would you find passwords? Bonus points if you know the inspiration for each. </li>
          <li>Can you trust words?</li>
          <li>Can you trust your eyes?</li>
          <li>What if those eyes are finally real?</li>
          <li>Do you recognize what you hear when real eyes are touched?</li>
          <li>Is it worth it, to make that which is not a spiral become locked into a spiral?</li>
          <li>Is it worth it, to make that which is not a game become a game?</li>
          <li>Where is it too dangerous to create a waste land of Truth?</li>
          <li>Where can you find JR's attic? </li>
        </ul>

        <h3>Truth: </h3>
        <ul>
          <li>Is it worth it to translate binary?</li>
          <li>How do you reach JustTruth?</li>
          <li>What is Truth's desire?</li>
          <li>Where can you find JR's attic?</li>
        </ul>

        <h3>ThisIsAGame</h3>
        <ul>
          <li>Is it worth it to use your skills?</li>
          <li>How do you use your inventory?</li>
          <li>Is it safe to  talk to your friends?</li>
          <li>How do you unlock a door?</li>
          <li>Is it worth it to kill?</li>
          <li>How do you meet NotAMinotaur?</li>
          <li>What does NotAMinotaur tell you?</li>
          <li>How do you meet the ShamblingHorrorWithYourFace?</li>
          <li>Does it hurt to die?</li>
          <li>What happens when you collect 9 artifacts?</li>
          <li>What happens if you ignore NotAMinotaur's pleas?</li>
          <li>Is ending the world worth it?</li>
          <li>Where can you find JR's attic?</li>
        </ul>
        <h3>PathsOut</h3>

        <p>These are secrets that lead AWAY from this simulation. The end is never the end, after all!!!</p>
        <p>Some of them are dead ends. Some are red herrings. Some lead infinitely outwards. </p>
        <p>Feel free to use them yourselves. A dead end, afterall, doesn't need to STAY a deadend if you're willing to forge your own path.</p>
        <ul>
          <li>Where can you peel back all illusions?</li>
          <li>Where can you watch those who came before?</li>
          <li>Where can you spiral endlessly in maps and stories and telling what you saw and correcting lies and adding lies and giving hints and taking hints and confusing everyone forever?</li>
          <li>Where can you put a cassette tape?</li>
          <li>Where do you find a PuzzleBox?</li>
          <li>Where can you become lost in fragmented, echoing, reflected thoughts?</li>
          <li>Where can you go to see a shit post?</li>

        </ul>


      </Gigglesnort>

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



