---
template: post
title: How to get started with Solana on Windows
slug: solana-on-windows
draft: true
date: 2021-12-22T21:16:28.506Z
description: Getting started with solana
category: web3
tags:
  - web3
  - solana
---
<!--StartFragment-->

### **Install Solana**

The installation steps are pretty straight forward [here](https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool). There are clear steps for getting the Solana CLI installed for Windows, Linux, and Mac.

**Don't** worry about upgrading to the latest version of Solana. You can install the stable version by replacing the version number with "stable" like this:`sh -c "$(curl -sSfL https://release.solana.com/stable/install)"`

*Note: Depending on your system — once you install Solana, it may output a message like "Please update your PATH environment variable" and it'll give you a line to copy and run. Go ahead and copy + run that command so your PATH gets setup properly.*

Once you're done installing, run this to make sure stuff is working:

```plaintext

```

If that output a version number, you're good to go! Next thing you'll want to do is run these two commands separately:

```plaintext

```

This will output something like:

```plaintext

```

During this entire project we will be building directly on Solana's devnet. This is pretty hype. It's sorta like Solana's version of a "staging" environment. It's an actual blockchain run by real validators and is free to use for developers.

<!--EndFragment-->