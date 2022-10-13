const assert = require('assert');
const waypoints =  require('./waypoints')

describe('waypoints', () => {
  describe('.totalDistance',() => {
    it('returns the total driving distance for 202 meters', () => {
      // setup
      const expected = 202;
      // exercise
      const actual = waypoints.totalDistance()
      // verify
      assert.strictEqual(actual, expected)
    });
  });

  describe('.totalDuration',() => {
    it('returns the total driving time for 20 seconds', () => {
      // setup
      const expected = 20;
      // exercise
      const actual = waypoints.totalDuration()
      // verify
      assert.strictEqual(actual, expected)
    });
  });

  describe('.distanceSpeed',() => {
    it('returns the total distance that Peter has driven at a speed exceeding the speed limit is 20.5 meters', () => {
      // setup
      const expected = 20.5;
      // exercise
      const actual = waypoints.distanceSpeed()
      // verify
      assert.strictEqual(actual, expected)
    });
  });

  describe('.durationSpeed',() => {
    it('The total time that Peter has driven at a speed exceeding the speed limit is 5 seconds', () => {
      // setup
      const expected = 5;
      // exercise
      const actual = waypoints.durationSpeed()
      // verify
      assert.strictEqual(actual, expected)
    });
  });
});