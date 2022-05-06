export const reportKey = "blorbos";


export const addNumToArrayWithKey =(key:string,target:number)=>{
  const tmp = valueAsArray(key);
  tmp.push(target);
  localStorage[key] = JSON.stringify(tmp);
}

export const valueAsArray = (key: string)=>{
  if(localStorage[key]){
    return JSON.parse(localStorage[key]) as any[];
  }else{
    return initEmptyArrayAtKey(key);
  }
}

export const initEmptyArrayAtKey =(key:string)=>{
  const tmp:any[] = [];
  localStorage[key] = JSON.stringify(tmp);
  return tmp;
}