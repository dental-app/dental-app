import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import spinner from "../images/loading.gif";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filterName: "",
      dataImage: "",
      filterDescription: "",
      user: {},
      loading: false,
      isAuthenticated: false,
    };
    this.fullnameInput = React.createRef();
    this.timeInput = React.createRef();
    this.cellphoneInput = React.createRef();

    this.cinInput = React.createRef();
    this.townInput = React.createRef();
    this.adressInput = React.createRef();

    this.postalCodeInput = React.createRef();
    this.dateInput = React.createRef();
    this.maturityInput = React.createRef();

    this.sexInput = React.createRef();
    this.civilityInput = React.createRef();
    this.descriptionInput = React.createRef();
  }
  componentDidMount() {
    M.AutoInit();
    this.getUsers();
  }

  handleClick = (id) => {
    this.props.history.push(`/profile/${id}`);
  };

  getUsers = () => {
    axios
      .get("/users")
      .then((res) => {
        this.setState({
          users: res.data,
          loading: false,
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  deleteUser = (id) => {
    axios
      .delete(`/user/${id}`)
      .then((res) => {
        const objToDeleteIndex = this.state.users.findIndex(
          (obj) => obj._id === id
        );
        const newItems = [...this.state.users];
        newItems.splice(objToDeleteIndex, 1);
        this.setState({ users: newItems });
        M.toast({ html: res.data.msg, classes: "green darken-1 rounded" });
      })
      .catch((err) => console.log(err));
  };
  uploadImage = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "nwaspat2");
    formData.append("file", files);
    axios
      .post("https://api.cloudinary.com/v1_1/danfous/image/upload", formData)
      .then((res) => {
        this.setState({
          dataImage: res.data.secure_url,
        });
        console.log("image", this.state.data);
      })
      .catch((err) => console.log(err));
  };

  editUser = () => {
    const { _id } = this.state.user;
    const updatedValues = {
      date: this.dateInput.current.value,
      time: this.timeInput.current.value,
      fullname: this.fullnameInput.current.value,
      cin: this.cinInput.current.value,
      town: this.townInput.current.value,
      adress: this.adressInput.current.value,
      postalCode: this.postalCodeInput.current.value,
      cellphone: this.cellphoneInput.current.value,
      maturity: this.maturityInput.current.value,
      sex: this.sexInput.current.value,
      civility: this.civilityInput.current.value,
      data: this.state.dataImage,
      description: this.descriptionInput.current.value,
    };
    axios
      .put(`/user/${_id}`, updatedValues)
      .then((res) => {
        const objToEditIndex = this.state.users.findIndex(
          (obj) => obj._id === _id
        );
        const newItems = [...this.state.users];
        newItems[objToEditIndex].date = updatedValues.date;
        newItems[objToEditIndex].time = updatedValues.time;
        newItems[objToEditIndex].fullname = updatedValues.fullname;
        newItems[objToEditIndex].cin = updatedValues.cin;
        newItems[objToEditIndex].town = updatedValues.town;
        newItems[objToEditIndex].adress = updatedValues.adress;
        newItems[objToEditIndex].postalCode = updatedValues.postalCode;
        newItems[objToEditIndex].cellphone = updatedValues.cellphone;
        newItems[objToEditIndex].maturity = updatedValues.maturity;
        newItems[objToEditIndex].sex = updatedValues.sex;
        newItems[objToEditIndex].civility = updatedValues.civility;
        newItems[objToEditIndex].data = updatedValues.data;
        newItems[objToEditIndex].description = updatedValues.description;
        this.setState({ users: newItems });

        M.toast({ html: res.data.msg, classes: "green darken-1 rounded" });
      })
      .catch((err) => console.log(err));
  };
  render() {
    let nr = 1;
    const {
      filterName,
      filterDate,
      filterDescription,
      loading,
      user,
      dataImage,
    } = this.state;
    const {
      fullname,
      cin,
      town,
      adress,
      postalCode,
      cellphone,
      date,
      time,
      maturity,
      sex,
      civility,
      data,
      description,
    } = this.state.user;
    return (
      <div className="row dashboard">
        <div className="col m10 offset-m1">
          <div className="green-text darken-2">
            <h4> Manage patients</h4>
            <h6>Total user: {this.state.users.length}</h6>
          </div>
          <div className="row">
            <div className="input-field col">
              <input
                id="fullname"
                type="text"
                className="validate"
                value={filterName}
                onChange={(e) => this.setState({ filterName: e.target.value })}
              />
              <label htmlFor="fullname">
                <i className="material-icons left">find_in_page</i> Search by
                name
              </label>
            </div>

            <div className="input-field col">
              <input
                id="description"
                type="text"
                className="validate"
                value={filterDescription}
                onChange={(e) =>
                  this.setState({ filterDescription: e.target.value })
                }
              />
              <label htmlFor="description">Search by description</label>
            </div>
          </div>
          {loading ? (
            <div className="center">
              <img src={spinner} alt="spiner" />
            </div>
          ) : (
            <table className="responsive-table blue-grey darken-2 white-text highlight">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Full Name</th>
                  <th>Cell Phone</th>
                  <th>Cin</th>
                  <th>Town</th>
                  <th>Adress</th>
                  <th>Postal Code</th>
                  <th>Date</th>
                  <th>maturity</th>
                  <th>sex</th>
                  <th>civility</th>
                  <th style={{ width: "300px" }}>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {console.log(this.state.users)}
                {this.state.users
                  .filter((key) =>
                    key.fullname
                      ? key.fullname
                          .toString()
                          .toLowerCase()
                          .includes(filterName)
                      : null
                  )
                  .filter((key) =>
                    key.description
                      .toString()
                      .toLowerCase()
                      .includes(filterDescription)
                  )

                  .map((user) =>
                    user.fullname ? (
                      <tr
                        onClick={() => this.handleClick(user._id)}
                        key={user._id}
                      >
                        <td>{nr++}</td>
                        <td>{user.fullname}</td>
                        <td>{user.cellphone}</td>
                        <td>{user.cin}</td>
                        <td>{user.town}</td>
                        <td>{user.adress}</td>
                        <td>{user.postalCode}</td>
                        <td>{user.date}</td>
                        <td>{user.maturity}</td>
                        <td>{user.sex}</td>
                        <td>{user.civility}</td>
                        <td>{user.description}</td>
                        <td>
                          <button
                            className="waves-effect red waves-light btn modal-trigger"
                            href="#deleteModal"
                            onClick={() => this.deleteUser(user._id)}
                          >
                            <i className="material-icons right">delete</i>
                            Delete{" "}
                          </button>
                        </td>
                        <td>
                          <button
                            className="waves-effect waves-light btn modal-trigger"
                            href="#editModal"
                            onClick={() => this.editUser()}
                          >
                            <i className="material-icons right">edit</i>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )}
              </tbody>
            </table>
          )}
          {/*Delete Modal*/}
          <div id="deleteModal" className="modal">
            <div className="modal-content">
              <h4 className="center">Deleting User</h4>
              Are you sure you want to delete user with client:
              <h4>{fullname}</h4>
            </div>
            <div className="modal-footer">
              <Link
                to="/user"
                className="modal-close waves-effect red waves-light btn"
                style={{ marginRight: "10px" }}
                onClick={this.deleteUser.bind(this, user._id)}
              >
                Yes
              </Link>
              <Link
                to="/user"
                className="modal-close waves-effect waves-light btn"
              >
                No
              </Link>
            </div>
          </div>
          {/* Edit Modal*/}
          <div id="editModal" className="modal">
            <div className="modal-content">
              <h4 className="center">Editing User</h4>
              <h5 className="center">Client: {fullname} </h5>
              <form>
                <div className="row">
                  <div className="center">
                    <img
                      alt=""
                      className="materialboxed"
                      height="100%"
                      width="100%"
                      src={dataImage ? dataImage : data}
                    />
                  </div>
                  <div className="center file-field input-field">
                    <div className="btn">
                      <span>Edit Image</span>
                      <input type="file" onChange={this.uploadImage} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      className="validate"
                      defaultValue={fullname}
                      ref={this.fullnameInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">phone</i>
                    <input
                      id="cellphone"
                      name="cellphone"
                      type="number"
                      className="validate"
                      defaultValue={cellphone}
                      ref={this.cellphoneInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">contact_mail</i>
                    <input
                      id="cin"
                      name="CIN"
                      type="number"
                      className="validate"
                      defaultValue={cin}
                      ref={this.cinInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">home</i>
                    <input
                      id="Town"
                      name="Town"
                      type="text"
                      className="validate"
                      defaultValue={town}
                      ref={this.townInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">home</i>
                    <input
                      id="Adress"
                      name="Adress"
                      type="text"
                      className="validate"
                      defaultValue={adress}
                      ref={this.adressInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">local_post_office</i>
                    <input
                      id="PostalCode"
                      name="PostalCode"
                      type="number"
                      className="validate"
                      defaultValue={postalCode}
                      ref={this.postalCodeInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="Maturity"
                      name="Maturity"
                      type="text"
                      className="validate"
                      defaultValue={maturity}
                      ref={this.maturityInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="Sex"
                      name="Sex"
                      type="text"
                      className="validate"
                      defaultValue={sex}
                      ref={this.sexInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="Civility"
                      name="Civility"
                      type="text"
                      className="validate"
                      defaultValue={civility}
                      ref={this.civilityInput}
                    />
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">event</i>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="validate"
                      defaultValue={date}
                      ref={this.dateInput}
                    />
                    <label htmlFor="editDate">Date</label>
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">access_time</i>
                    <input
                      id="editTime"
                      name="editTime"
                      type="time"
                      className="validate"
                      defaultValue={time}
                      ref={this.timeInput}
                    />
                    <label htmlFor="editTime">Time</label>
                  </div>

                  <div className="input-field col m8 offset-m2">
                    <i className="material-icons prefix">description</i>
                    <input
                      id="Description"
                      name="Description"
                      type="text"
                      className="validate"
                      defaultValue={description}
                      ref={this.descriptionInput}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <Link
                to="/user"
                className="modal-close waves-effect red waves-light btn"
                style={{ marginRight: "10px" }}
                onClick={this.editUser}
              >
                Submit
              </Link>
              <Link
                to="/user"
                className="modal-close waves-effect waves-light btn"
              >
                Back
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(User);
