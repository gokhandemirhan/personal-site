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
---


Today we are going to create a web application that enables user to see the original photo that is posted on instagram. First we create a web service that sends a request to the embeded version of that photo with a given image url, then the service is gonna parse the page it gets and finds the image url from there. In order to bypass instagrams CORS rules we will use some npm modules to be able to display the photo on our page.



# Server side