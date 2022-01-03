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


