const fs = require('fs');
const geodist = require('geodist');
// read json file
const waypoints = JSON.parse(fs.readFileSync('./waypoints.json', 'utf8'));

// calculate total driving distance
const totalDrivingDistance = () => {
    let totalDistance = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
        totalDistance += geodist({lat: waypoints[i].position.latitude, lon: waypoints[i].position.longitude}, {lat: waypoints[i + 1].position.latitude, lon: waypoints[i + 1].position.longitude}, {exact: true, unit: 'km'});
    } 
    return parseInt(totalDistance * 1000);
}
// calculate total driving time
const totalDrivingTime = () => {
    const durationTime = (Date.parse(waypoints[waypoints.length - 1].timestamp) - Date.parse(waypoints[0].timestamp))/1000;
    return durationTime;
}
// filter out waypoints with speed exceeding speed limit
const speedFilter = waypoints.filter(waypoint => waypoint.speed > waypoint.speed_limit);
// calculate speed exceeding time
const durationTimeExceededSpeed = () => {
    return (Date.parse(speedFilter[speedFilter.length - 1].timestamp) - Date.parse(speedFilter[0].timestamp))/1000; 
}
// calculate exceeded speed distance    
const distanceExceededSpeed = () => {
    return parseInt(geodist({lat: speedFilter[0].position.latitude, lon: speedFilter[0].position.longitude}, {lat: speedFilter[speedFilter.length - 1].position.latitude, lon: speedFilter[speedFilter.length - 1].position.longitude}, {exact: true, unit: 'km'}) * 1000);
}



    
module.exports = {
waypoints: waypoints,
totalDrivingDistance: totalDrivingDistance,
totalDrivingTime: totalDrivingTime,
durationTimeExceededSpeed: durationTimeExceededSpeed,
distanceExceededSpeed: distanceExceededSpeed
};