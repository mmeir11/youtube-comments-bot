const express = require("express");

var Analytics = require('analytics-node');
var analytics = new Analytics('SYmEzQPRHhYMXRRopDC424XFPasdnEVE');

const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.get("/signup", (req, res) => {
  analytics.track({
    anonymousId: '48d213bb-95c3-4f8d-af97-86bb404dcfe',
    event: 'signup',
    properties: {
      name: 'meir',
      email: 'meir@gmail.com'
    }
  });

  res.send("sign up success!");
});

app.get("/", (req, res) => {
  analytics.identify({
    anonymousId: '48d213bb-95c3-4f8d-af97-86b2b404dcfe',
    traits: {
      friends: 42
    }
  });

  res.send("Hello world!");
});