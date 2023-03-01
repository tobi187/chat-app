import React from "react";
import { useCallback, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("/Chat", { replace: true }),
    [navigate]
  );

  return (
    <div>
      <form>
  <div className="mb-3">
    <label className="form-label">Username</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label">Merken</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Login</button>
</form>
    </div>
  );
}

