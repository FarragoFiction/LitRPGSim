export const hydrationUrl = 'http://farragofiction.com/ZampanioHotlink/Hydration/';
export const hydrationMusicUrl = 'http://farragofiction.com/CodexOfRuin/MallMusicMuzakMallOf1974/';

const imageExtendsions:string[] = [
  "png",
  "gif",
  "jpg",
  "jpeg"
];

const audioExtensions:string[]=["mp3"]

const filePattern = new RegExp('<a href="([^?]*?)">','g');
const extensionPattern = new RegExp(`\\\.(${imageExtendsions.join("|")})\$`);
const audioextensionPattern = new RegExp(`\\\.(${audioExtensions.join("|")})\$`);

export const getHydrationMusic = async()=>{
  try{
  const rawText = await httpGetAsync(hydrationMusicUrl) as string;
  
  let files:string[] = [];
  const match = rawText.matchAll(filePattern);
  const matches = Array.from(match, (res) => res);
  for(let m of matches){
    const item = m[1];
    if(item.match(audioextensionPattern)){
      files.push(item);
    }
  }

  return files;
  }catch(e){
    console.log("JR NOTE: error",e)
    return [];
  }
}



export const getHydrationImages = async()=>{
  try{
  const rawText = await httpGetAsync(hydrationUrl) as string;
  
  let files:string[] = [];
  const match = rawText.matchAll(filePattern);
  const matches = Array.from(match, (res) => res);
  for(let m of matches){
    const item = m[1];
    if(item.match(extensionPattern)){
      files.push(item);
    }
  }

  return files;
  }catch(e){
    console.log("JR NOTE: error",e)
    return [];
  }
}



//async, you'll want to await this.
//since using this will mean you don't have anything on screen yet, you'll want some kinda placeholder
const httpGetAsync = async (theUrl:string) => {
  return new Promise(function (resolve, reject) {

    let xhr = new XMLHttpRequest();
    try {
      xhr.open("get", theUrl);

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    } catch (e) {
      console.error(e);
      window.alert("AN UNKNOWN NETWORK ERROR HAS OCCURED")
      return `[]`;
    }
  });
}
