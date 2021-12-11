---
template: post
title: Instagram photo parser
slug: instagram-photo-parser
draft: true
date: 2021-12-11T19:05:51.970Z
description: Today we are going to create a web application that enables user to
  see the original photo that is posted on instagram. First we create a web
  service that sends a request to the embeded version of that photo with a given
  image url, then the service is gonna parse the page it gets and finds the
  image url from there. In order to bypass instagrams CORS rules we will use
  some npm modules to be able to display the photo on our page.
category: tutorial
tags:
  - node
  - react
  - express
  - cors
---




Today we are going to create a web application that enables user to see the original photo that is posted on Instagram. First we create a web service that sends a request to the embedded version of that photo with a given image url, then the service is gonna parse the page it gets and finds the image url from there. In order to bypass Instagram CORS rules we will use some npm modules to be able to display the photo on our page.

### Server side

Server side is a simple node express app that has only two endpoints. It is responsible for listening for the Instagram link and requesting the embedded photo from Instagram as well as returning a proxyed URL to the client.

Start by installing the required modules:

> ```javascript
> yarn add axios cors express node-html-parser pass-cors
> ```

The modules are pretty self explanatory but I want to highlight **cors** and **pass-cors**module here which will allow us to bypass the same origin rule of Instagram so that the image can be shown.

Now it is time to write the parser module.

```
const axios = require("axios");
const { parse } = require("node-html-parser");

async function parseInstagramUrl(url) {
  url = `${url}embed`;
  console.log(`Fetching ${url}`);

  let res = axios.get(url).then(async (response) => {
    const root = parse(response.data);
    let source = root
      .querySelector("img.EmbeddedMediaImage")
      .getAttribute("src");

    source = `http://localhost:3001/proxy?url=${source}`;
    return { source };
  });

  return res;
}

module.exports = {
  parseInstagramUrl: parseInstagramUrl,
};
```

As you can see, the function requests the image from Instagram, passes this response to node-html-parser then goes over the parsed DOM to find the image source.

Line 14 returns the image source but prefixed with our another endpoint **proxy**. We will be looking into that next. Here is our index.js file which is the main file for our server

```
const express = require("express");
const cors = require("cors");
const proxy = require("pass-cors");

const app = express().use("*", cors());
const port = process.env.port || 3001;

const { parseInstagramUrl } = require("./parser");

app.get("/", async (req, res) => {
  res.json("Hello");
});

app.use("/proxy", proxy);

app.get("/parse", async (req, res) => {
  const instagramUrl = req.query.url;
  let imageData = "";
  if (instagramUrl) {
    imageData = await parseInstagramUrl(instagramUrl);
  }
  console.log(imageData);
  res.json({ data: imageData });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

```

On line 14 the enpoint '/proxy' handles the request using the **pass-cors** module.