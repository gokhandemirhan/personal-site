---
template: post
title: How to cross-post to hashnode and dev.to from your command line
slug: cross-post-to-hashnode-and-devto
draft: false
date: 2021-12-29T19:27:52.374Z
description: Hashnode and Dev.to are great platforms for development blogging
  each has their own pros/cons. The biggest plus is that they have a community
  which means reaching out to more people. Having my own blog I was in need for
  a solution that can save me from copy pasting the same blog post to different
  sites.
category: blogging, web development
tags:
  - gatsby
  - hashnode
  - devto
  - ""
---
Hashnode and Dev.to are great platforms for development blogging each has their own pros/cons. The biggest plus is that they have a community which means reaching out to more people. Having my own blog I was in need for a solution that can save me from copy pasting the same blog post to different sites.

### Multiple options

First option you can go is to use your RSS feed and put it to dev.to's `Extentions` settings. This is gonna put your new posts in your dashboard as draft so that you can go and edit/publish as you want.

![settings](/media/screenshot-2021-12-29-213230.png "settings on dev.to")

This solution is enough for most people but not for me. I've seen that if fails to parse my code blocks properly. And hashnode does not have RSS import feature. You need to create a custom Zapier zap to listen for RSS changes and create a post in your blog.

Mihai Bojin explains it really well in [this github repo](https://github.com/MihaiBojin/zapier-integration-create-hashnode-story) how to do that. I've tried and had to create a new integration id and install zapier package, which I will not be using ever again. Even though I managed to create a custom Zap for my account it stuck on listening for RSS and pop out same blog post repeatedly sometimes. So I had to give up on this.

### I need more power!

Dev.to has a REST api and hashnode has a GraphQL endpoints so there must be a tool that uses these endpoints right? Yes there are couple ones. I found two actual products that you need to pay but didn't want to go for that. And finally I found [this github repo](https://github.com/shahednasser/cross-post).

It is really handy and simple cli, that does the job well. In my case not so well since I had to configure it for my needs. What it does is actually getting the contents of the given URL, parses it to markdown and uses these platforms APIs to create a post there. I tried to post directly from the markup file I already have(since I am using VSCode to write)but dealing with frontmatter can be frustrating, so I've forked and edited that plugin. You can find mine [here](https://github.com/gokhandemirhan/cross-post).

There are other improvements can be done such as having tags, summary etc, but I will be doing them along the way.

### Workflow

1. Find a motivation to write a new post
2. Write the actual post
3. Upload photos, and check code blocks
4. Commit, push, merge
5. Wait for CI to finish the deployment (have another cup of coffee)
6. Go to the blog and copy the url
7. Open terminal `cross-post <url> -p dev hashnode`
8. Check dev.to and hashnode for issues
9. Publish
10. Yay!

Thanks for reading. Don't forget to check the other repositories I've mentioned if you are looking for a cross post solution.