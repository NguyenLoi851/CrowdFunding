import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CampaignFactoryProvider } from "./context/CampaignFactory";
import { CampaignProvider } from "./context/Campaign";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CampaignProvider>
    <CampaignFactoryProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CampaignFactoryProvider>
  </CampaignProvider>
);
