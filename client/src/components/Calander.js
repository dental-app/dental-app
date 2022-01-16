import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import M from "materialize-css/dist/js/materialize.min.js";
import axios from "axios";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }

  componentDidMount() {
    M.AutoInit();
    this.getAppointments();
  }

  getAppointments = () => {
    axios
      .get("/appointments")
      .then((res) => {
        this.setState({
          appointments: res.data,
        });
        // console.log(this.state.appointments);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={this.state.appointments}
        eventContent={renderEventContent(this.state.appointments)}
      />
    );
  }
}

function renderEventContent(eventInfo) {
  console.log(eventInfo);
  return (
    <div>
      {eventInfo.map((element, key) => {
        return (
          <div className="row" key={key}>
            <p>{element.fullname}</p>
            <p>{element.time}</p>
            <p>{element.cellphone}</p>
            <p>{element.description}</p>
          </div>
        );
      })}
    </div>
  );
}
