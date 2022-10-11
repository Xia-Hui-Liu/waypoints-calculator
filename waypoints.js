const fs = require('fs');
const path = require('path');
// read waypoints.json and return a list of waypoints
const waypoints = JSON.parse(fs.readFileSync(path.join(__dirname, 'waypoints.json'), 'utf8'));

// get distance between two points
const totalDistance = () => {
    let distance = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
        const lat1 = waypoints[i].position.latitude;
        const lon1 = waypoints[i].position.longitude;
        const lat2 = waypoints[i+1].position.latitude;
        const lon2 = waypoints[i+1].position.longitude;
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = Math.round(R * c); // in metres
        distance += d;
    }
    return `The total driving distance is : ${distance} meters`;
}

// get total driving time
const totalDuration = () => {
    const durationTime = (Date.parse(waypoints[waypoints.length - 1].timestamp) - Date.parse(waypoints[0].timestamp))/1000;
    return `The total driving time is: ${durationTime} seconds`;    
}

// filter out waypoints with speed limit exceeded
const exceededSpeedLimit = waypoints.filter(waypoint => waypoint.speed > waypoint.speed_limit);

// get total exceeding speed
const distanceSpeed = () => {
    const exceededSpeed = exceededSpeedLimit.reduce((total, waypoint) => total + waypoint.speed, 0);
    return `The total distance that Peter has driven at a speed exceeding the speed limit is: ${exceededSpeed} meters`;
}

// get total exceeding time
const durationSpeed = () => {
    const exceededTime = (Date.parse(exceededSpeedLimit[exceededSpeedLimit.length-1].timestamp) - Date.parse(exceededSpeedLimit[0].timestamp))/1000
    return `The total time that Peter has driven at a speed exceeding the speed limit is: ${exceededTime} seconds`;
}

module.exports = {
    totalDistance,
    totalDuration,
    distanceSpeed,
    durationSpeed
}