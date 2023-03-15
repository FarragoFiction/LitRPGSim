import styled from "@emotion/styled";
import { useEffect } from "react";
import { CoreConcept } from "./CoreConcept";
export const Content = styled.div`
    position: fixed;
    top: 50px;
    left: 50px;
`

type LayerParams = {
  concept: CoreConcept;
}
const Layer1:React.FC<LayerParams> =({concept})=> {

  useEffect(()=>{
    console.log(`%c${concept.consoleThought}`, "font-weight: bold;font-family: 'Courier New', monospace;color:#06FFC9; background: #346F3F; padding:10px; border-radius: 13px; font-size:13px;");

  },[concept])
  return (
    <Content>
      <div style={{paddingBottom: "100px"}} id="truth" dangerouslySetInnerHTML={{__html:concept.truthThought}}/>

      
      <img width="50" onClick={()=>{(window as any).toggleIdleGameMode()}} src="http://farragofiction.com/ZampanioGoshShouldYouTrustThis/this_file_is_red.png" style={{cursor:"pointer"}} alt="This Is Not A Lie"/>
      <br></br>
      <br></br>
      <img width="50" onClick={()=>{(window as any).toggleShake()}} src="http://farragofiction.com/ZampanioGoshShouldYouTrustThis/this_file_is_red.png" style={{cursor:"pointer"}} alt="This Is Not A Lie"/>

    </Content>
  );
}

export default Layer1;
