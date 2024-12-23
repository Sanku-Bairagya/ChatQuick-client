import moment from "moment";

const fileFormat = (url = "") => {

    const fileExe = url.split(".").pop();
    if(fileExe === "mp4" || fileExe === "webm" || fileExe === "ogg"){
        return "video";
    }

    if(fileExe === "mp3" || fileExe === "wav" ){
        return "audio";
    }
    if(fileExe === "png" || fileExe === "jpg" || fileExe === "jpeg" || fileExe === "gif"){
        return "image";
    }
    return "file";

}

const transformImage = (url=" ",width=100) => url;

const getLastSevenDays = () => {
    const constcurrentdate = moment();
    const LastSevenDays = [];

    for(let i =0;i<7;i++){
        const dayDate = constcurrentdate.clone().subtract(i,"days");
        const dayName = dayDate.format("dddd");
        LastSevenDays.unshift(dayName);
    }
    return LastSevenDays;

}

const getOrSaveFromStroge = ({key,value,get}) => {


    if(get) 
        return localStorage.getItem(key) ?
          JSON.parse(localStorage.getItem(key))
          :null; 
    else localStorage.setItem(key,JSON.stringify(value));


}

export  {transformImage ,getLastSevenDays,getOrSaveFromStroge};

export {fileFormat}
