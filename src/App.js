import React, {useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import * as Tone from 'tone'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          sound horoscope
        </h1>
        <p>
          pick a date, hear a sound.
        </p>
        <CustomDatePicker></CustomDatePicker>
      </header>
    </div>
  );
}

const CustomDatePicker = () => {
  const synth = useRef(null);

  const handleSelect = (date) => {
    const [year, month, day, hours] = [date.getFullYear(), date.getMonth(), date.getDay(), date.getHours()]
    const dayPercentage = 200 + Math.round((day / 30) * 100 )
    const hourPercentage = 400 + Math.round((hours / 24) * 200)
    const monthPercentage = 600 + Math.round((month / 12) * 400)
    const params = [dayPercentage, hourPercentage, monthPercentage, Math.floor(year / 2)]
    playChord(params)
    // playSoundsFromDate(date, synth.current)
  } 
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const newSynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
    newSynth.set({
      envelope: {
        attack: 0.05,
        decay: 0.05,
        sustain: 0.1,
        release: 3,
      },
      volume: 0.5
    })
    synth.current = newSynth;
  }, []);

  const playChord = (providedNotes) => {
    const notes = providedNotes ? providedNotes : [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
    const now = Tone.now()
    let curTime = now
    for(const i in notes){
      synth.current.triggerAttackRelease(notes[i], '16n', curTime);
      curTime += 0.1
    }
  }
  const handleClick = () => playChord()

  return (
    <div>
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} onSelect={handleSelect} />
      <div style={{width: "20px"}}></div>
      <button onClick={handleClick}>
        play a default chord
      </button>
    </div>
  );
};


// const planets = [swisseph.SE_SUN, swisseph.SE_MOON, swisseph.SE_JUPITER]
// var flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;
// const playSoundsFromDate = (date, synth) => {
//   swisseph.swe_julday (date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), swisseph.SE_GREG_CAL, (julday_ut) => {

//     for(const planet of planets){
//       swisseph.swe_calc_ut (julday_ut, planet, flag, (body) => {
//         var degrees = body.longitude;
//         var house = Math.floor (degrees / 30);
//         var degreesWithinHouse = degrees - degrees * 30;
//         console.log({degrees, house, degreesWithinHouse});
//         const now = Tone.now()
//         synth.current.triggerAttackRelease(degrees, '16n', now + 0.1);
//       });
//     }
//   });
// }

export default App;
