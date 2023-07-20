import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCO2 } from '../../redux/types';
import { BASE_URL } from '../../utils/baseUrl';
import { AppState } from '../../redux/store';
import CO2Chart from '../chart';
import styles from './style.module.css'
import { getAirQualityLevel } from '../../utils/airQualityLevel';

interface CO2Data {
  co2: number;
}

const MAX_HISTORY = 12;

const Measurements: React.FC = () => {
  const dispatch = useDispatch();
  const co2Values: number[] = useSelector((state: AppState) => state.co2.co2Values);
  const co2Labels = co2Values.slice(-MAX_HISTORY).map((_, index) => `Measurement ${co2Values.length - index } `);
  useEffect(() => {
    const eventSource = new EventSource(BASE_URL);

    eventSource.onmessage = (event) => {
      const data: CO2Data = JSON.parse(event.data);
      const newCo2Value: number = data.co2;
      dispatch(updateCO2(newCo2Value));
    };

    return () => {
      eventSource.close();
    };
  }, [dispatch]);

  return (
    <div>
      {co2Values.length > 0 && (
        <div className={styles.dataSection}>
          <h2>Recent CO2 Levels: Last 2 Minutes</h2>
          <div className={styles.gridContainer}>
            {co2Values.slice(-MAX_HISTORY).map((value, index) => (
              <div className={getAirQualityLevel(value).cssClass} key={index}>
                Measurement {co2Values.length <= MAX_HISTORY ? index + 1 : index + 1 + co2Values.length - MAX_HISTORY} is: {value} ppm
              </div>
            ))}
          </div>
          <CO2Chart co2Values={co2Values.slice(-MAX_HISTORY)} co2Labels={co2Labels.reverse()} />
        </div>
      )}
    </div>
  );
};

export default Measurements;
