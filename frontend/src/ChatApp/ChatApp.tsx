import "./ChatApp.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function OwnMessages() {
  return (
    <div className="Messages">
      <div className="d-flex justify-content-end">
        <div className="card">
          <div className="card-body">Some of my own text</div>
        </div>
      </div>
    </div>
  );
}

function OtherMessages() {
  return (
    <div>
      <div className="d-flex justify-content-start">
        <div className="card">
          <div className="card-body">Some Other Text</div>
        </div>
      </div>
    </div>
  );
}
export default function ChatApp() {
  // Using Axios - ensure you first install the package
  axios
    .post("http://localhost:5000/Chat", {
      // Add parameters here
      name: "tobu",
      message:"Hi"
    })
    .then((response) => {
      console.log(response.data);
      // Handle data
    })
    .catch((error) => {
      console.log(error);
    });

  fetch("http://localhost:5000/startpage")
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <div>
      <h1 className="title">Chat App</h1>

      <div className="searchuserNavbar">
        <nav className="navbar bg-body-tertiary">
          <form className="container-fluid">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </form>
        </nav>
      </div>

      <div className="container">
        <div className="own Messages">{OwnMessages()}</div>
        <div className="other Messages">{OtherMessages()}</div>
      </div>

      <div className="inputMessage">
        <form className="input-group mb-3 my-form" method="POST">
          <input
            type="text"
            className="form-control"
            placeholder="Neue Nachricht schreiben"
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Senden
          </button>
        </form>
      </div>
    </div>
  );
}
