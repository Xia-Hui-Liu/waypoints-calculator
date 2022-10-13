const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'waypoints.json'), 'utf8'));
const exceededSpeedLimit = data.filter(waypoint => waypoint.speed > waypoint.speed_limit);

const waypoints = {
    totalDistance(){
        let distance = 0;
        for (let i = 0; i < data.length - 1; i++) {
            const lat1 = data[i].position.latitude;
            const lon1 = data[i].position.longitude;
            const lat2 = data[i+1].position.latitude;
            const lon2 = data[i+1].position.longitude;
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
        return distance;
    },

    totalDuration(){
        const durationTime = (Date.parse(data[data.length - 1].timestamp) - Date.parse(data[0].timestamp))/1000;
        return durationTime;    
    },
    
    distanceSpeed(){
        const exceededSpeed = exceededSpeedLimit.reduce((total, waypoint) => total + waypoint.speed, 0);
        return exceededSpeed;
    },

    durationSpeed(){
        const exceededTime = (Date.parse(exceededSpeedLimit[exceededSpeedLimit.length-1].timestamp) - Date.parse(exceededSpeedLimit[0].timestamp))/1000
        return exceededTime;
    },

}

module.exports = waypoints