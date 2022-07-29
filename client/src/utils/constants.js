export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://other-url";

export const campaignFactoryAddress = "0xABCdf562e6352917cCAEe6e16799296585392784"