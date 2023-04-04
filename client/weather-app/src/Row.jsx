import React from 'react'
import './Row.css'

export default function Row(props) {
    const {location, insight} = props;
    const PIXEL_WISE = 4.5; 
    const intervalsArray = [].concat(...insight.intervals);
    var mitigateHoursFromStart = 0;
  return (
    <>
      <div className='grid-item insight-title'>{location} - {insight.title}</div>
      <div className='grid-item intervals'>
      {intervalsArray.map((interval,index)=> {
       mitigateHoursFromStart = interval.hoursFromStart + interval.duration;
      const intervalDuration = PIXEL_WISE * interval.duration || 0;
      const intervalHoursFromStart = PIXEL_WISE *  ( mitigateHoursFromStart - interval.hoursFromStart) || 0;
        return  (
                  <div
                  key={index}
                  className={`time-cell-${insight.severity}`} 
                  style={{
                  marginLeft: intervalHoursFromStart,
                  width: intervalDuration,
                   }}>
                    </div>
                    )
    })}
    </div>
    </>
  )
}
