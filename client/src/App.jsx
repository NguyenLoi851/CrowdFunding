import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Outlet, Link } from "react-router-dom";
import {
  Home,
  Campaigns,
  CreateCampaign,
  CreateRequest,
  Requests,
} from "../pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index={true} element={<Home />} />
          <Route path="campaigns">
            <Route path="new" element={<CreateCampaign />} />
            <Route path=":id">
              <Route index={true} element={<Campaigns />} />
              <Route path="requests">
                <Route index={true} element={<Requests />} />
                <Route path="new" element={<CreateRequest />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
