export const hydrationUrl = 'http://farragofiction.com/ZampanioHotlink/Hydration/';

const extensions:string[] = [
  "png",
  "gif",
  "jpg",
  "jpeg",
];

const filePattern = new RegExp('<a href="([^?]*?)">','g');
const extensionPattern = new RegExp(`\\\.(${extensions.join("|")})\$`);


export const getHydrationImages = async()=>{
  try{
  const rawText = await httpGetAsync(hydrationUrl) as string;
  
  console.log("JR NOTE: patterns are", {filePattern, extensionPattern});
  let files:string[] = [];
  const match = rawText.matchAll(filePattern);
  const matches = Array.from(match, (res) => res);
  console.log("JR NOTE: matches are: ", matches)
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
