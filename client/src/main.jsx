import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CampaignFactoryProvider } from "./context/CampaignFactory";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CampaignFactoryProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CampaignFactoryProvider>
);
