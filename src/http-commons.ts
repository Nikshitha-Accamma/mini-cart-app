import axios from "axios";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: "https://dnc0cmt2n557n.cloudfront.net",
    headers: {
      "Content-type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);
  return instance;
};

export default fetchClient();
