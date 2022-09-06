---
template: post
title: How did I make my gas meter smart(er)?
slug: measure-gas-consuption
draft: true
date: 2022-09-06T20:51:38.054Z
description: Raising gas prices makes me take control over my energy consumption
  using the ESP32-cam module and machine learning thank to maker community and
  IOT.
category: maker, iot
tags:
  - maker
  - iot
---
With the latest issues about gas supply the prices are skyrocketing, thus I thought I could have better control over how much energy I spend. The easiest way to do that may be to check the meter once in a while and note them down in an excel sheet, but I wanted more and looked for how smarter people solved this problem.

Another difficulty I have is having the gas meter in a meter cabinet which is kinda blocked by some other stuff, so it is not practical for me to check the values every time I want.

%\[https://twitter.com/zhuowei/status/1254266079532154880?s=20&t=D-I7YUsikVckhuYHXcc0Ow]

!﻿[](https://twitter.com/zhuowei/status/1254266079532154880?s=20&t=D-I7YUsikVckhuYHXcc0Ow)


## Let's begin

I wanted constant access to my meter cabinet so that I can an internal link to read the value. Since I have used the ESP32 module before, I have looked for some options around it. ESP32 module also has a version with a camera that can behave as a streaming service. Actually, the test code [available](https://github.com/espressif/esp32-camera) even solves my problem with a lot of good [tutorials](https://randomnerdtutorials.com/esp32-cam-video-streaming-face-recognition-arduino-ide/) about it.

![](https://m.media-amazon.com/images/I/71LGsWic1pS._SL1500_.jpg)

Connected with a USB-c cable inside the meter cabinet this gives me access from an internal URL that I can check and record values myself.

## Why stop now?

I didn't like the part of me recording values by myself, I believed there must be a way. After some brief search, I found **the**  library to rule all the metric readers. I present you [AI-on-the-edge-device](https://github.com/jomjol/AI-on-the-edge-device). All credits go to the developer(s) supporting that repository [jomjol](https://github.com/jomjol) being the owner. Let's see what this module can do:

%\[https://github.com/jomjol/AI-on-the-edge-device]

* Take a photo in a given time interval.
* Edit, and rotate photo after shot to make it more readable.
* Run an image processing to **understand**  the numbers
* Send these numbers over the  MQTT protocol
* Works in both digital and analog meters.

WHAAAATT???

<iframe src="https://giphy.com/embed/0NwSQpGY6ipgOSt8LL" width="480" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/theoffice-episode-1-the-office-tv-0NwSQpGY6ipgOSt8LL">via GIPHY</a></p>

## Good news and bad news

This was exactly what I was looking for, actually even more than what I asked. But the bad news is it requires a specific configuration since each meter has a different location and lighting situation. On top of that, image recognition works much better on analog meters compared to LCD panel meters which is what I have.

Putting all my trust in the image recognition and neural networks I installed the ESP32 in my cabinet and spend almost a **week**  configuring the position and each number reading. You can now understand the tweet I quoted above.

## Success?

![Screenshot 2022-09-06 221011.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662495136317/M1Zhbhj0i.png align="left")

Here is a screenshot from the interface which recognizes each number without a problem and compares it with a previous value to check if the reading is correct. Then it publishes this value using the MQTT protocol.

## Historical data

A great youtube tutorial from MakerMeik helped me to read these values using NodeRED and have a better visualization on Graphana. This part deserves another blog post by itself but you can check the video of him below.

%\[https://www.youtube.com/watch?v=iUgxwbfkIqU]

## Visualisation

Based on my current contract I pay around €39 per GJ of consumption. Multiplying this with the usage in graphana now I can track my energy consumption automatically and be prepared for the monthly invoice. 

![Screenshot 2022-09-06 221728.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1662495706250/2VEo4waZJ.png align="left")

Thanks to the amazing maker community these kinds of crazy ideas can become real. 

\--

Thank you for reading. Stay curious.