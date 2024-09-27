export default function timeWatch(duration: string) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
    if (!match) {
      return "0:00"; // fallback in case duration is not in the expected format
    }
  
    const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
    const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
    const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0;
  
    const timeString = 
      (hours > 0 ? hours + ':' : '') + 
      (minutes < 10 && hours > 0 ? '0' : '') + minutes + 
      ':' + (seconds < 10 ? '0' : '') + seconds;
  
    return timeString;
  }
  