import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { vibrate } from './utils'

export default function App() {
  const [start, setStart] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [breakMinutes, setBreakMinutes] = useState(0)
  const [breakSeconds, setBreakSeconds] = useState(0)
  const [totalSecs, setTotalSecs] = useState(0)
  const [workOrBreak, setWorkOrBreak] = useState(false)

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const intervalId = useInterval(() => {
    if (start && totalSecs != 0) {
      setTotalSecs(prevCount => --prevCount)
      if (workOrBreak) {
        setMinutes(Math.floor(totalSecs/ 60))
        setSeconds(totalSecs % 60)
      } else {
        setBreakMinutes(Math.floor(totalSecs/ 60))
        setBreakSeconds(totalSecs % 60)
      }
    }
    // if (totalSecs === 0 || !start)
    else {
      if (totalSecs === 0 && start) {
        
        setTotalSecs(prevCount => --prevCount)
        
        if (workOrBreak) {
          setMinutes(Math.floor(totalSecs/ 60))
          setSeconds(totalSecs % 60)
        } else {
          setBreakMinutes(Math.floor(totalSecs/ 60))
          setBreakSeconds(totalSecs % 60)
        }
        
        setWorkOrBreak(prevState => !prevState)
        vibrate();
        // setStart(prevState => !prevState)
        onPress()
      }
      clearImmediate(intervalId)
    }
  }, 1000);

  function onPress() {
    setStart(prevState => !prevState)
    if (workOrBreak) {
      setTotalSecs(parseInt(minutes * 60) + parseInt(seconds))
    } else {
      setTotalSecs(parseInt(breakMinutes * 60) + parseInt(breakSeconds))
    }
  }

  function resetCount() {
    setStart(false)
    setTotalSecs(0)
    setMinutes(0)
    setSeconds(0)
    setBreakMinutes(0)
    setBreakSeconds(0)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 50, }}>
        {workOrBreak ? 'Work' : 'Break'} Timer
      </Text>

      <Text style={{ fontWeight: 'bold', fontSize: 50, }}>
        {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.textColor}>{start ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={resetCount}
        >
          <Text style={styles.textColor}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: 'bold', marginLeft: '30%' }}>Work Time</Text>
          <View style={styles.minInputs}>
            <Text>Minutes: </Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              onChangeText={mins => setMinutes(mins)}
              textAlign="center"
            />
          </View>
          <View style={styles.minInputs}>
            <Text>Seconds: </Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              onChangeText={secs => setSeconds(secs)}
              textAlign="center"
            />
          </View>
          <Text style={{ fontWeight: 'bold', marginLeft: '30%' }}>Break Time</Text>
          <View style={styles.minInputs}>
            <Text>Minutes: </Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              textAlign="center"
              onChangeText={minutes => setBreakMinutes(minutes)}
            />
          </View>
          <View style={styles.minInputs}>
            <Text>Seconds: </Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              textAlign="center"
              onChange={secs => setBreakSeconds(secs)}
            />
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#2E6DEB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    backgroundColor: '#2E6DEB',
    borderRadius: 10,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  textColor: {
    color: 'white',
  },
  resetTextColor: {
    color: '#2E6DEB',
    borderColor: '#2E6DEB',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 5,
    minWidth: 100,
  },
  minInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 20,
    justifyContent: 'center',

  },
});
