import "./ChatApp.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { type } from "os";

function OwnMessages(mess: Message) {
  return (
    <div className="Messages">
      <div className="d-flex justify-content-end">
        <div className="card">
          <div className="card-body">{mess.message}</div>
        </div>
      </div>
    </div>
  );
}

function OtherMessages(mess: Message) {
  return (
    <div>
      <div className="d-flex justify-content-start">
        <div className="card">
          <span>{mess.name}</span>
          <div className="card-body">{mess.message}</div>
        </div>
      </div>
    </div>
  );
}

type Message = {
  name: string,
  message: string
}

const spawnMessages = (mess: Message[]) => {
  const el = document.getElementById("mess-con")
  
  const userName = (document.getElementById("user-name") as HTMLInputElement).value
  const arr = mess.map(m => {
    const outer = document.createElement("div")
    const c = document.createElement("div")
    c.classList.add("card")
    const cb = document.createElement("div")
    cb.classList.add("card-body")
    cb.innerText = m.message
    
    if (m.name == userName) {
      outer.classList.add("d-flex")
      outer.classList.add("justify-content-end")
    } else {
      outer.classList.add("d-flex")
      outer.classList.add("justify-content-start")
      const s = document.createElement("span")
      s.innerText = m.name
      c.appendChild(s)
    }
    c.appendChild(cb)
    outer.appendChild(c)
    return outer
  });

  el?.replaceChildren(...arr)
}



const sendMessage = async () =>  {
  const message = document.getElementById("message-text") as HTMLInputElement
  const userName = document.getElementById("user-name") as HTMLInputElement
  const result = await fetch("http://localhost:5000/message", {
      // Add parameters here
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      method: 'POST',
      body: JSON.stringify({
        name: userName.value,
        message: message.value
      })
    })
  
  const messages = await result.json() as Message[]

  spawnMessages(messages)
}

setInterval(async () => {
  console.log("running")
  const res = await fetch("http://localhost:5000/all", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    },
    method: 'GET'
  })
  const data = await res.json() as Message[]
  spawnMessages(data)
}, 3000)



export default function ChatApp() {
  // Using Axios - ensure you first install the package
 
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
                id="user-name"
              />
            </div>
          </form>
        </nav>
      </div>

      <div className="container mess-con" id="mess-con">
        
      </div>

      <div className="inputMessage">
        <div className="input-group mb-3 my-form">
          <input
            type="text"
            className="form-control"
            placeholder="Neue Nachricht schreiben"
            id="message-text"
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            onClick={sendMessage}
          >
            Senden
          </button>
        </div>
      </div>
    </div>
  );
}
