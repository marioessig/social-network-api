# Social Network API

## Table of Contents
* [Challenge Goal](#challenge-goal)
* [Challenge Requirements](#challenge-requirements)
* [Challenge Result](#challenge-result)
---

## Challenge Goal
Create an API for a social network using NoSQL database where friends can share thoughts, comment and reply.

## Challenge Requirements

### User Story
>AS A social media startup <br>
I WANT an API for my social network that uses a NoSQL database <br>
SO THAT my website can handle large amounts of unstructured data <br>

### Acceptance Criteria
>GIVEN a social network API <br>
WHEN I enter the command to invoke the application <br>
*THEN* my server is started and the Mongoose models are synced to the MongoDB database <br>
WHEN I open API GET routes in Insomnia Core for users and thoughts <br>
*THEN* the data for each of these routes is displayed in a formatted JSON <br>
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core <br>
*THEN* I am able to successfully create, update, and delete users and thoughts in my database <br>
WHEN I test API POST and DELETE routes in Insomnia Core <br>
*THEN* I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list <br>


## Challenge Result

### Application Video Walkthrough
[Application Walkthrough](https://youtu.be/2BlEWzmQW5c)

### GitHub Repository
[GitHub Repository URL](https://github.com/marioessig/social-network-api)

---
Packages to install:
`npm init -y` first then enter the next code: `npm i express moment mongoose`

Then update the package.json file in the scripts section with: `"start": "node server.js"`
