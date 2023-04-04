import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Row from "./Row";
import "./Dashboard.css";

export default function Dashboard() {
  const [allData, setAllData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:5000/insights"),
        axios.get("http://localhost:5000/locations"),
        axios.get("http://localhost:5000/events"),
      ])
      .then(
        axios.spread((insights_data, locations_data, events_data) => {
          mergeAllData(
            insights_data.data,
            locations_data.data,
            events_data.data
          );
        })
      );
  }, [, refresh]);

  const mergeAllData = (insights, locations, events) => {
    const modifiedEvents = addDataToEvent(events);
    setAllData(mergeObjects(insights, locations, modifiedEvents));
  };

  const addDataToEvent = (events) => {
    if (!events) return;

      events.forEach((element) => {
      const start = moment(element?.events[0]?.startTime) || 0;

      element.events.forEach((event, i) => {
        const hoursFromStart = moment(event?.startTime) || 0;
        const midnight = moment(hoursFromStart).startOf("day");
        const hoursSinceMidnight = hoursFromStart.diff(midnight, "hours");
        const { startTime, endTime } = event;
        const duration = moment
          .duration(moment(endTime).diff(moment(startTime)))
          .asHours();
        event["duration"] = duration;

        const hoursFromElementStart = moment(startTime).diff(start, "hours");
        event["hoursFromStart"] =
          i === 0
            ? hoursFromElementStart + hoursSinceMidnight
            : hoursFromElementStart;
      });
    });
    return events;
  };

  const mergeObjects = (insights, locations, events) => {
    return locations.map((location) => {
      const subData = insights.map((insight) => {
        const intervals = events
          .filter(({ location: loc, insight: ins }) => loc === location.id && ins === insight.id)
          .map(({ location, insight, ...rest }) => rest)
          .flatMap((events_obj) => events_obj.events);
        return {
          title: insight.name,
          severity: insight.severity,
          intervals,
        };
      });
      return {
        title: location.name,
        subData,
      };
    });
  };

  const createRow = () => {
    return allData.map((location) => {
      <div>{location.title}</div>;
      return location.subData.map((insight, index) => {
        return (
          <React.Fragment key={index}>
            <Row location={location.title} insight={insight} />
          </React.Fragment>
        );
      });
    });
  };

  const refreshDashboard = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="bg">
      <div className="header">Insights Dashboard</div>
      <div>
        <div className="refresh">
          <button onClick={refreshDashboard} className="refresh-button">
            Refresh
          </button>
        </div>
        <div className="grid-container">{createRow()}</div>
      </div>
    </div>
  );
}
