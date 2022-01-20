import React from "react";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { user: {} };
  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const id = window.location.href.split("/")[4];
    axios
      .get(`/user/${id}`)
      .then((res) => {
        this.setState({
          user: res.data,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return <div>{this.state.user.fullname}</div>;
  }
}

export default Profile;
