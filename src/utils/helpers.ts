export const getEpochTimeSinceHoursAgo = (hours: number)=> {
    const secondsSinceEpoch = Math.floor( Date.now() / 1000 );
    const hoursInSeconds = hours * 60 * 60;
    return secondsSinceEpoch - hoursInSeconds;
}