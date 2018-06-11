export let durationToString = (duration) => {
    let seconds = parseInt(duration, 10);
    let hours = Math.floor(seconds/3600);
    let minutes = Math.floor((seconds%3600) / 60);
    let seconds_ = seconds%60;
    let string = '';
    // examples:
    // 1:02:13
    // 1:00:45
    // 12:00
    // 2:34
    // 35
    // 03
    if(hours>1) {
        string+=`${hours}:`;
        if(minutes<10)
            string+=`0${minutes}:`;
        else
            string+=`${minutes}:`;
        if(seconds_<10)
            string+=`0${seconds_}`;
        else
            string+=`${seconds_}`;
    } else {
        string+=`${minutes}:`;
        if(seconds_<10)
            string+=`0${seconds_}`;
        else
            string+=`${seconds_}`;
    }
    return string;
}