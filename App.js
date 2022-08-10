import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [start, setStart] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [totalSecs, setTotalSecs] = useState(0)

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

  let intervalId = null

  useEffect(() => {
    if (!start) {
      clearInterval(intervalId)
    }

    const intervalId = setInterval(() => {
      setTotalSecs(prevCount => {
        if (prevCount === 0){
          clearImmediate(intervalId)
        }
        return --prevCount
      })
    }, 1000);
    console.log(totalSecs)
    return () => {
      clearInterval(intervalId);
    };
  }, [start]);

  function onPress() {
    setStart(prevState => !prevState)
    setTotalSecs(parseInt(minutes * 60) + parseInt(seconds))
    // if (!start) {
    //   // intervalId = setInterval(function () {
    //   //   setTotalSecs(prevCount => --prevCount)

    //     // if (totalSecs <= 0) {
    //     //   clearInterval(intervalId)
    //     //   setMinutes(0)
    //     //   setSeconds(0)
    //     //   setTotalSecs(0)
    //     //   return
    //     // }
    //   // }, 1000)
    // } else {
    //   clearTimeout(intervalId)
    //   setTotalSecs(0)
    //   setMinutes(0)
    //   setSeconds(0)
    //   return
    // }
  }

  function resetCount() {
    setStart(false)
    // clearInterval(intervalId)
    setTotalSecs(0)
    setMinutes(0)
    setSeconds(0)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 50, }}>Work Timer</Text>
      <Text style={{ fontWeight: 'bold', fontSize: 50, }}>
        {Math.floor(totalSecs / 60).toString().padStart(2, '0')} : {(totalSecs % 60).toString().padStart(2, '0')}
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
              placeholder="Enter Minutes"
              keyboardType="numeric"
              onChangeText={mins => setMinutes(mins)}
              textAlign="center"
              value={minutes.toString()}
            />
          </View>
          <View style={styles.minInputs}>
            <Text>Seconds: </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Seconds"
              keyboardType="numeric"
              onChangeText={secs => setSeconds(secs)}
              textAlign="center"
              value={seconds.toString()}
            />
          </View>
          <Text style={{ fontWeight: 'bold', marginLeft: '30%' }}>Break Time</Text>
          <View style={styles.minInputs}>
            <Text>Minutes: </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Minutes"
              keyboardType="numeric"
              textAlign="center"
            />
          </View>
          <View style={styles.minInputs}>
            <Text>Seconds: </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Seconds"
              keyboardType="numeric"
              textAlign="center"
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
    maxWidth: 100,
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
