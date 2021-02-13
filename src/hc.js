import HttpClient from "./HttpClient";

const LIMIT = 10;

const hc = new HttpClient({
  protocol: "https",
  host: "school.constcode.ru",
  port: "3500",
  url: "/posts",
  query: {
    key: "0001fjaiushedfaipu",
    _limit: LIMIT
  }
});

export default hc;
