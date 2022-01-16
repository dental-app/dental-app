import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";

class AboutUs extends Component {
  state = {
    fullname: "",
    cin: "",
    town: "",
    adress: "",
    postalCode: "",
    cellphone: "",
    date: "",
    time: "",
    maturity: "",
    sex: "",
    civility: "",
    description: "",
    errorMessage: "",
    successMessage: "",
    errMsg: "",
    successMsg: "",
    selectedFile: "",
    previewSource: "",
    fileInputState: "",
  };
  componentDidMount() {
    M.AutoInit();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state.maturity);
  };

  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    this.previewFile(file);
    this.setState({
      selectedFile: file,
      fileInputState: e.target.value,
    });
  };

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        previewSource: reader.result,
      });
    };
  };
  handleSubmitFile = (e) => {
    e.preventDefault();
    if (!this.state.selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(this.state.selectedFile);
    reader.onloadend = () => {
      this.uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!! ERROR!! !!");
      this.setState({
        errMsg: "something went wrong!",
      });
    };
  };
  uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
      this.setState({
        errMsg: "something went wrong!",
      });
    }
  };
  makeUser = (e) => {
    e.preventDefault();
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
      description,
    } = this.state;

    const newUser = {
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
      description,
    };
    axios
      .post("/add-User", newUser)
      .then((result) => {
        this.setState({
          successMessage: result.data.msg,
          fullname: "",
          cin: "",
          town: "",
          adress: "",
          postalCode: "",
          cellphone: "",
          date: "",
          time: "",
          maturity: "",
          sex: "",
          civility: "",
          description: "",
          fileInputState: "",
          previewSource: "",
          successMsg: "Image uploaded successfully",
        });
        M.toast({
          html: this.state.successMessage,
          classes: "green darken-1 rounded",
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.msg });
        M.toast({
          html: this.state.errorMessage,
          classes: "red darken-1 rounded",
        });
      });
  };
  resetForm = () => {
    this.setState({
      fullname: "",
      cin: "",
      town: "",
      adress: "",
      postalCode: "",
      cellphone: "",
      date: "",
      maturity: "",
      sex: "",
      civility: "",
      description: "",
    });
  };
  render() {
    const {
      fullname,
      cin,
      town,
      adress,
      postalCode,
      cellphone,
      date,
      maturity,
      sex,
      civility,
      description,
    } = this.state;
    return (
      <div>
        <div className="container note">
          <div className="row">
            <div className="col s12 m12">
              <div className="card blue-grey darken-1 center-align">
                <div className="card-content white-text">
                  <form>
                    <div className="input-field">
                      <i className="material-icons prefix">account_circle</i>
                      <input
                        id="full_name"
                        name="fullname"
                        type="text"
                        value={fullname}
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="full_name">Full Name</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">contact_mail</i>
                      <input
                        id="cin"
                        name="cin"
                        type="text"
                        value={cin}
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="full_name">CIN</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">place</i>
                      <input
                        id="town"
                        name="town"
                        type="text"
                        value={town}
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="full_name">Town</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">home</i>
                      <input
                        id="adress"
                        name="adress"
                        type="text"
                        value={adress}
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="full_name">Adress</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">local_post_office</i>
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={postalCode}
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="full_name">Postal code</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">phone</i>
                      <input
                        id="cellphone"
                        name="cellphone"
                        type="number"
                        value={cellphone}
                        className="validate"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="cellphone">Cellphone</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">event</i>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        className="validate"
                        value={date}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="date">Date</label>
                    </div>
                    <div className="input-field">
                      <p>
                        <label>
                          <input
                            id="maturity"
                            name="maturity"
                            type="radio"
                            value="Adult"
                            onChange={this.handleChange}
                          />{" "}
                          <span>adult</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input
                            id="maturity"
                            name="maturity"
                            value="Kid"
                            class="with-gap"
                            onChange={this.handleChange}
                            type="radio"
                          />
                          <span>kid</span>
                        </label>
                      </p>
                      <label htmlFor="description">maturity</label>
                    </div>
                    <div className="input-field">
                      {" "}
                      <p>
                        <label>
                          <input
                            id="sex"
                            name="sex"
                            value="Male"
                            class="with-gap"
                            onChange={this.handleChange}
                            type="radio"
                          />
                          <span>male</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input
                            id="sex"
                            name="sex"
                            value="Female"
                            class="with-gap"
                            onChange={this.handleChange}
                            type="radio"
                          />
                          <span>female</span>
                        </label>
                      </p>
                      <label htmlFor="description">sex</label>
                    </div>
                    <div className="input-field">
                      {" "}
                      <p>
                        <label>
                          <input
                            id="civility"
                            name="civility"
                            value="Married"
                            class="with-gap"
                            onChange={this.handleChange}
                            type="radio"
                          />
                          <span>married</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input
                            id="civility"
                            name="civility"
                            value="Not Married"
                            class="with-gap"
                            onChange={this.handleChange}
                            type="radio"
                          />
                          <span>not married</span>
                        </label>
                      </p>
                      <label htmlFor="description">civility</label>
                    </div>
                    <div class="file-field input-field">
                      <div class="btn">
                        <span>File</span>
                        <input type="file" />
                      </div>
                      <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" />
                      </div>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">description</i>
                      <textarea
                        id="description"
                        name="description"
                        className="materialize-textarea"
                        style={{ height: "4rem" }}
                        value={description}
                        onChange={this.handleChange}
                      ></textarea>
                      <label htmlFor="description">About</label>
                    </div>
                    <div className="card-action">
                      <button
                        className="waves-effect waves-light btn s12 m8"
                        style={{ margin: "5px" }}
                        onClick={this.makeUser}
                      >
                        <i className="material-icons right">send</i>Create User
                      </button>
                      <button
                        type="reset"
                        className="waves-effect red waves-light btn"
                        onClick={this.resetForm}
                      >
                        <i className="material-icons right">clear</i>
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
