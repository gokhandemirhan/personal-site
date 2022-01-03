---
template: post
title: I created a blog post from a photo. Here is how.
slug: blog-post-from-photo
draft: true
date: 2022-01-03T19:55:10.860Z
description: Last week I've come across a blog post by Ben Stokes. He was
  explaining how he build a product that enables users to create a blog post
  from a photo taken by their mobile phone. Although he gives a brief idea of
  how I wanted to explore more. After all, what else I can do better on the
  first of the new year anyway?
category: web development, proof-of-concept
---
Last week I've come across a [blog post](https://daily.tinyprojects.dev/paper_website) by Ben Stokes. He was explaining how he build a [product](https://paperwebsite.com/) that enables users to create a blog post from a photo taken by their mobile phone. Although he gives a brief idea of how I wanted to explore more. After all, what else I can do better on the first of the new year anyway?

### Brainstorming

I want to integrate this into my own blog flow which uses Gatsby, Netlify and Github. Maybe there are better ways but as a prrof-of-concept here are the steps I've decided to take for the prototype:

* Create an webapp that will post photo
* Create an endpoint to accept photo
* Save photo to drive
* Run some sort of OCR (Optical Character Recognition) on it to extract words
* Create a new markdown file with this content
* Push this file into Github repo
* Wait for Netlify to finis the development
* Think about if there was a better way to spend 01/01/2022

Looks pretty easy right? At least thats what I've thought, but it took me two days an a dozens of new topics to explore. They also came with new POC (Proof of Concept) ideas at least.

### Frontend

Ideally this will be a mobile/hybrid application that will allow you to take photo and send it to the API, but for the sake of simplicity I've just create a new React application.

```bash
create-react-app frontend
```

Simple page that has nothing but an input element to upload a photo, and a list to show the uploaded images coming from the API. If you have never used FormData before check line 4 to see how we are appending the chosen file then using POST to send it to the backend.

```js{4}
const [photos, setPhotos] = useState([]);
  const uploadHandler = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    console.log(formData);

    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        setPhotos((photos) => [...photos, result]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div className="App">
      <div className="box">
        <input type="file" name="file" onChange={uploadHandler} />
      </div>
      <div className="images">
        {photos &&
          photos.map((item, i) => (
            <div className="item" key={i}>
              <img src={`http://localhost:3001/${item.file.filename}`} alt="" />
              <p>{item.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
```

### Backend

Here is where we make our hands dirty. Here is where we get the file, save it, run OCR on it, create a new file, commit, push and finally return a succcess message to the client.

\-- GIF HERE --

#### Ready, Set, Serve!

Let's bootstrap a simple Node.js Express server to handle the job. Install `multer` as well to take care of the static files.

```bash
mkdir backend
cd backend
yarn init
yarn add express cors multer
```

On a new index.js file, add the following for a simplest endpoint to receive and save a file. Don't forget to create `public` directory on your project as this is the path the files gonna be saved.

```js{6,7:15,20}
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express().use('*', cors());
const port = process.env.port || 3001;
const DIR = './public/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get('/', async (req, res) => {
  res.json('Hello world!, your server is working');
});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    res.send(500);
  }
  res.send({ file, text:'Placeholder text for OCR' });
});

app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

On the highlighted rows, you can see how to initialize `multer` with the simplest configuration and make it ready. Now it's testing time. I will be uploading following image as I found that it is a testing image for an OCR library.

##### Test image
![](/media/eng_bw.png)

##### Working!
![](/media/screen-capture.gif)

On the recording it is not showing the file picker popup as it was on my second screen, but I just select the test image and wait. Placing a loader icon here is a good idea!

#### Okay Google, can you read this for me?


