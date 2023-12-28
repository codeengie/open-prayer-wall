# Open Prayer Wall

## Overview
Open Prayer Wall is a web application that allows users to submit prayer requests or pray for existing requests.

## Technology
+ AWS
    + API Gateway
    + CloudFront
    + DynamoDB
    + Lambda
    + Route 53
    + S3
+ CSS3/SCSS
+ HTML5
+ JavaScript
+ Node.js
+ NPM
+ React
+ Vite

## Setup
This project utilizes AWS services but is not a requirement. You should be able to refactor to suite your needs.

### Vite
Update `vite.config.js` params to your specification and if your going to use Google Analytics update `googleTagId`
with your custom id.

### API Gateway
An API endpoint is required. The endpoint url will be needed for the environment file key.

### Database
A DynamoDB database with the following structure:
+ Partition key (String): PrayerId
+ Sort key (String): CreatedDate
+ Message
+ Name
+ PrayerCount
+ Title

### Lambda
Lambda functions are used to get, create and update prayer requests in DynamoDB
+ `get-prayers` - Retrieve prayers from a database
+ `new-prayer` - Create a new prayer request and add it to the database
+ `update-prayer-count` - Update the prayer count on a prayer request

### reCAPTCHA
You'll need to create an account to generate a production key. You can also create test keys, unfortunately I
wasn't able to get them so I used the automated testing keys. You can find them here [Site Key](https://developers.google.com/recaptcha/docs/faq).

### Environment Files
Before running please create a `.env.development` and `.env.production` file and add the following:
+ VITE_API_URL
+ VITE_API_KEY
+ VITE_CAPTCHA_SITE_KEY

## Install
```bash
$ cd open-prayer-wall
$ npm install
```

## Run
```bash
$ npm run dev # dev
$ npm run build # prod
```

## License
The code is available under the [MIT](LICENSE).
