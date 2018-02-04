import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { Grid, Row, Col } from 'react-bootstrap'


class Dashboard extends Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div style={styles.mainContainer}>
        <div style={styles.buttonContainer}>
          <div style={styles.buttonHeight}>
           <div style={styles.button}>Add Sensor</div>
          </div>
        </div>
        <div style={styles.sensorCardContainer}>
          <div style={styles.sensorCard}>
            <div style={styles.sensorInfoContainer}></div>
            <div style={styles.sensorGraphContainer}>
              <div style={styles.sensorStatusBar}>
                <div style={styles.controllerButtonContainer}></div>
              </div>
              <div style={styles.sensorActualGraph}></div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    backgroundColor: 'green',
    flex: 1,
    padding: 30,
    flexDirection: 'column'
  },
  buttonContainer: {
    backgroundColor: 'yellow',
    flex: 1,
    width: '100%',
    display: 'flex',
  },
  buttonHeight: {
    height: 40,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end'
  },
  button: {
    width: 100,
    backgroundColor: 'red'
  },
  sensorCardContainer: {
    // marginTop: '20%',
    flex: 10,
    backgroundColor: 'blue',
    height: 100,
    width: '100%',
    padding: 30

  },
  sensorCard: {
    height: 300,
    width: '100%',
    backgroundColor: 'gray',
    display: 'flex',
    flexDirection: 'row'
  },
  sensorInfoContainer: {
    flex: 1
  },
  sensorGraphContainer: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column'
  },
  sensorStatusBar: {
    flex: 1,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  controllerButtonContainer: {
    width: 40,
    backgroundColor: 'gray'
  },
  sensorActualGraph: {
    flex: 15
  }
}

export default Dashboard