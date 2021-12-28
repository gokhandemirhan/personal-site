---
template: post
title: A day with gatsby, bash and opensource
slug: configure-gatsby-auto-publish
draft: true
date: 2021-12-28T00:20:23.693Z
description: This is a story of how I spend my last Sunday configuring my
  personal blog, connecting it to my existing (but never used) hashnode and
  dev.to accounts and setting up auto-publish to always keep them in sync to
  reach more people.
category: tutorial
tags:
  - personal
  - gatsby
  - hashnode
  - dev.to
---
This is a story of how I spend my last Sunday configuring my personal blog, connecting it to my existing (but never used) hashnode and dev.to accounts and setting up auto-publish to always keep them in sync to reach more people.

### Decide on which medium to use

This is the first step I need to take as there are tons of platforms out there nowadays and each has their own pros and cons. I wanted to use my own blog which I've setup during 2020 with Gatsby and Netlify but was standing there being nothing but a landing page for my social links. 

### Make blog developer friendly

I am using a starter theme for my blog and sadly it didn't have the code block highlighting and other fancy features. I was jealous so I dig on Gatsby docs. Turns out there are some solid plugins for code highlighting, having file names and even a button copy the code block to clipboard.

#### Step 1: Syntax highlighting

We all know what syntax highlighting is and how it is important for readers. Using [gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/) makes it really easy to have it.

1. Install it with your favourite package 
```bash
npm install gatsby-transformer-remark gatsby-remark-prismjs prismjs
```
2. Edit your configuration file
```js{9:10}:title=gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
              showLineNumbers: true,
              noInlineHighlight: false,
            }
        },
      ],
    },
  },
]
```
You can find the full configuration on the plugins page. But here all I need is to show the line numbers as I want them always visible, and noInlineHighlight to false for inline highlights that I will talk about in a minute.

3. Set your theme or create your own.

```js:title=gatsby-browser.js
... other CSS files
require("prismjs/themes/prism-okaidia.css")
```
I chosed the okaidia theme here as it is dark and my favourite. You can see all the themes on [official prismjs site](https://prismjs.com/)

#### Line numbers and line highlighting

Line numbers are important when sharing code as well as highlighting that line to point out what is added/removed. In order to achieve this the same plugins helps us again by wrapping the desired line in a class you can style however you want. 

1. Add a highlighting style for the line. I am gonna use my init.scss file for that since I am already including it on my gatsby-browser.js file

```css
.gatsby-highlight-code-line {
  background-color: #feb;
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid #f99;
}
```

2. Add default styles for line numbers. This is how my gatsby-browser.js file looks like after I've included the default styles for line numbers
```js{4}:title=gatsby-browser.js
require("./src/assets/scss/init.scss");
require("prismjs/themes/prism-okaidia.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
```

Now all you need to specify the line numbers in curly braces like javascript{1,3} if you want to highlight a line. For line numbering we don't need to do anything as it is on by default set on config.

#### Step 2: Adding file names on code blogs

Maybe you have noticed that already some code blocks on this post has filenames which I find it quite helpful on coding blogs. Let's see how we can achieve it.

A quick search on Gatsby plugin directory showed on two plugins for them

* gatsby-remark-prismjs-title
* gatsby-remark-code-titles

They are almost the same plugin but first one wraps the title inside a span tag which I needed for better styling, so I went ahead with it. [Here](https://github.com/otanu/gatsby-remark-prismjs-title) is the repository.

1. Again get it from npm
```bash
npm install gatsby-remark-prismjs-title --save-dev
```
2. Set your gatsby-config.js file
```js:title=gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
         ... other plugins
        "gatsby-remark-prismjs-title"
      ]
    }
  }
]
```
3. Add the custom CSS (I think you start to get the hang of the procedure now). I have customized my CSS a bit. Feel free to copy.

```css
.gatsby-code-title {
  display: block;
  position: relative;
  background: #272822;
  width: 100%;
  top: 13px;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.gatsby-code-title span {
  display: inline;
  position: relative;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  color: #eee;
  background: #777;
  border-top-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  padding: 3px 6px;
  top: -1px;
}
```

#### Step 3: Add a button for copying the code block

Again we are going to use a plugin. This time it is [https://www.gatsbyjs.com/plugins/gatsby-remark-code-buttons/](https://www.gatsbyjs.com/plugins/gatsby-remark-code-buttons/).

1. Install
```bash
npm install gatsby-remark-code-buttons --save-dev
```
2. Configure
```js{4}:title=gatsby-config.js
{
    resolve: "gatsby-remark-code-buttons",
    options: {
        svgIcon: "Copy",
        tooltipText: "Click to copy code",
        toasterText: "Copied to clipboard",
    },
}
```

Note that I am not using a SVG icon as the plugin has it by default, instead I've just wrote `Copy` for the svgIcon field which outputs it as a text. Tooltip options are the ones visible when user hover over the button and when clicked.

3. Custom CSS (again modified by my needs)

```css
.gatsby-code-button {
  position: absolute;
  right: 20px;
  top: -19px;
  color: black;
  background-color: white;
  border-radius: 0 0 6px 6px;
  padding: 0px 6px;
  font-size: 14px;
}
.gatsby-code-button-icon {
  fill: white;
}
```

### Summary
As you can see, Gatsby is really powerful and a huge plugin ecosystem around it thanks to opensource. On next post I will explain how I connected this blog wit Netlify CMS, autoposting to dev.to and hashnode. 

Thanks for reading!