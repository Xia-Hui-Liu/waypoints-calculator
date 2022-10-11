const {
    totalDistance,
    totalDuration,
    distanceSpeed,
    durationSpeed
} = require('./waypoints.js');

// test total distance
test('total distance', () => {
    expect(totalDistance()).toBe('The total driving distance is : 202 meters');
});

// test total duration
test('total duration', () => {
    expect(totalDuration()).toBe('The total driving time is: 20 seconds');
});

// test distance speed
test('distance speed', () => {
    expect(distanceSpeed()).toBe('The total distance that Peter has driven at a speed exceeding the speed limit is: 20.5 meters');
});

// test duration speed
test('duration speed', () => {
    expect(durationSpeed()).toBe('The total time that Peter has driven at a speed exceeding the speed limit is: 5 seconds');
});
