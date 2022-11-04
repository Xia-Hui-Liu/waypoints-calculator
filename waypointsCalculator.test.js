const fs = require('fs');
const waypointsCalculator = require('./waypointsCalculator');

describe('waypoints', () => {
    it('should read waypoints json file', () => {
        expect(waypointsCalculator.waypoints).toEqual(JSON.parse(fs.readFileSync('./waypoints.json', 'utf8')));
      });
    });

describe('totalDrivingDistance', () => {
    it('should return expected total distance in meters', () => {
        const expectTotalDistance = 201;
        const result = waypointsCalculator.totalDrivingDistance();
        expect(result).toEqual(expectTotalDistance);
      });
    });

describe('totalDrivingTime', () => {
    it('should return expected total driving time in seconds', () => {
        const result = waypointsCalculator.totalDrivingTime();
        expect(result).toEqual(20);
      });
});

describe('durationTimeExceededSpeed', () => { 
    it('should return the total time that Peter has driven at a speed exceeding the speed limit in seconds', () => {
        const result = waypointsCalculator.durationTimeExceededSpeed();
        expect(result).toEqual(5);
      });
});

describe('distanceExceededSpeed', () => {
    it('should return the total distance that Peter has driven at a speed exceeding the speed limit in meters', () => {
        const result = waypointsCalculator.distanceExceededSpeed();
        expect(result).toEqual(67);
      });
});


