var swisseph = require ('swisseph');

// Test date
var date = {year: 1970, month: 10, day: 12, hour: 0};
console.log ('Date:', date);

var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

// path to ephemeris data
// swisseph.swe_set_ephe_path(__dirname + './src/ephemerisData');

const strtime = function (value) {
	var hour = Math.floor (value);
	var minFrac = (value - hour) * 60;
	var min = Math.floor (minFrac);
	var sec = Math.floor ((minFrac - min) * 60);
	
	return hour + ' ' + min + ' ' + sec;
};

const logbody = function (name, body) {
    var lng = body.longitude;
    var house = Math.floor (lng / 30);
    var lang30 = lng - house * 30;

    console.log(body)

	  console.log (name + ':', body.longitude, '|', (lang30), '|', house, body.longitudeSpeed < 0 ? 'R' : '');
};

const planets = [swisseph.SE_SUN, swisseph.SE_MOON, swisseph.SE_JUPITER]

// Julian day
swisseph.swe_julday (date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, (julday_ut) => {
  for(const planet of planets){
    swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, flag, (body) => {
      var degrees = body.longitude;
      var house = Math.floor (degrees / 30);
      var degreesWithinHouse = degrees - degrees * 30;
      console.log({degrees, house, degreesWithinHouse});
    });
  }
});