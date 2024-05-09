# COMPSCI 732 / SOFTENG 750 project - Team Enchanting Eagles

Welcome to the project! I look forward to seeing your progress and your final results this semester!

Your team members are:
- Packy Li
- Tianya Xu
- Xingyan Hu
- Yang Shi
- Wenting Chen
- Sherry Zhou
- Ian Dong

![](./group-image/Enchanting%20Eagles.webp)

# HarmonyWallet

## Introduction

HarmonyWallet is a comprehensive tool designed to assist international students and others needing regular access to currency exchange rates and personal finance management. It supports inquiring about the exchange rates of 20 major currencies worldwide over the past year and offers features such as real-time exchange rate display, currency conversion, historical exchange rate charts, and relevant financial news display. The application also allows users to add their income, expense, and exchange records, displaying these records in various chart forms.

## Steps to Run Our Application
To get the HarmonyWallet application running on your local devices, please follow the step-by-step instructions. :)

### Step 1: Clone the Repository

Open your terminal and run the following command:

```bash
git clone https://github.com/UOA-CS732-SE750-Students-2024/project-group-enchanting-eagles.git
```

This command downloads the project files to your device.

### Step 2: Install Node.js

Run the following on the command line:
```bash
nvm install node
```

### Step 3: Install MongoDB driver

The database has been deployed on MongoDB Atlas.
Run the following on the command line:

```bash
npm install mongodb
```

Note: the connection string has been added into the application code
mongodb+srv://pli791:exZlk93F7nRBnidq@cluster0.sj4dd4c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

### Step 4: Set Up the Backend
#### 1. In your terminal, navigate to the “backend” directory of the cloned project:

```bash
cd project-group-enchanting-eagles/backend
```

#### 2. Install the project dependencies by running:

```bash
npm install
```

#### 3.Connect to and initialize the database by running:

```bash
npm run init-db
```

#### 4. Start the backend server with the following command:

```bash
npm run dev
```

Then, you will see a message “App server listening on port 3000!” indicating that the server is running and ready at “http://localhost:3000”.

### Step 5: Set up the frontend
#### 1. Open another terminal and navigate to the “frontend” directory:

```bash
cd project-group-enchanting-eagles/frontend
```

#### 2. Install the project dependencies by running:

```bash
npm install
```

#### 3. Start the Pokemon Shop application with the following command:

```bash
npm run dev
```

Then, you will see a message “Local: http://localhost:5173/” indicating that the application is ready and running at “http://localhost:5173”. 
You can copy and paste the link in your browser and you will see our application! :)

## How to use our application?

### 1. Sign up and log in
After finishing the steps to run the application, the first page you will see is the Login page.
![image](https://github.com/UOA-CS732-SE750-Students-2024/project-group-enchanting-eagles/assets/140019411/d5d56cfc-ff4b-42ea-a3b4-5780cf6064df)

To enjoy all the functions of our application, the first thing you need to do is signing up! Just click on the “Sign up” button and the application will jump to another page where you can input your username. After you enter your username, the application will check whether there are other users using the same username as you. If yes, the page will warn that “Username already exists.” Then you need to enter another username.

If your username is unique, the page will show that “Username is available.” 

Then click on the “Next” button. The website will jump to another page allowing you to input and confirm your password. You must enter the exactly same password twice or you will see the warning “Passwords do not match.” 

After setting up your password successfully, click on the “Next” button. Then you can select your security question and input the corresponding answer in case that you forget your password. Then click on the “Next” button.

On the following page, you can select your base currency.

The signing up is all done! Now you will see the login page again and enter your username and password and click on the “Log in” button. Then you will see your personal home page showing your username, base currency, income record chart, expense record chart and exchange records.

If you need to change your base currency or password, click the button in the top right-hand corner of the profile part.

You can click on the “Logout” button in the top right-hand corner to log out. However, you need to log in again before your next use. :)

### 2.Currency
To see the currency information, click on the “Currency” button on the top of the page. Then you will see the exchange rate of your base currency to other 19 kinds of main currencies worldwide displayed in the line chart.
In each currency grid, you can see the name of the currency, the current exchange rate, the line chart describing the exchange rates in the recent 7 days and the local time.
In the top right-hand corner of each currency grid, there is a star which you can click on to add that currency to your favourite. Your favourite currencies will be displayed before other currencies.
You can alter the base currency through the drop down list in the top right-hand corner to see more exchange rates.

There is a calculator button in the top right-hand corner of the home page. After clicking on that, the conversion calculator will pop up. There you can select the base currency and target currency and input the amount, then you can get the concerted amount according to the current exchange rate.

By clicking on the currency grid, you can see the line chart describing the exchange rate changes from recent 7 days to recent 1 year with the statistical data below the chart.
In addition, there are some links of relevant finical news about the two currencies (the base currency and the target currency) which you can click into to see the news details.
If there is no news about the base currency and the target currency, the news only about the target currency will be returned.

### 3.Record
When you first log in your account, you won’t see any income, expense or exchange records. You can add your own records by clicking the “+” button in the bottom right-hand corner.

A pop-up window allows you to add income/expense records or exchange record. Input the record details and then click “Save”. The record would be saved successfully.

After you added a record, you will see the newly added record in your home page. (It should be noted that the records shown in your home page are in recent 7 days by default. That means if you add a record of 2 months ago, you won’t see it in the home page.)

When you click the chart or the “More” link in the top right-hand corner, you will be brought to the income detail page where you can see your income records in recent 7 days, recent 14 days, recent 30 days and recent 1 year in the form of the line chart and the pie chart.

One bright spot of the line chart is the amount shown has been converted according to your base currency. For example, if your base currency is CNY and you just added an income record of 100 EUR(Let’s say the exchange rate of EUR to CNY is 9.0), the income amount in the line chart is 900 which is converted according to your base currency CNY.
You can alter the currency through the drop down list in the top right-hand corner. Then the amount in the line chart would be changed according to the currency you just chose.
The pie chart shows the proportions of different currencies of your income. Each proportion is calculated according to the amount converted to your base currency.
One thing need to be noted is that all the default currency in the currency selector is your base currency.

The expense part is in the same way.

When you add an exchange record, the newly added record will appear in your home page as well. Because of the limit of the space, only the last 5 exchange records will appear in your home page and you need to click on “More” to find more records.

In the exchange detail page, you can see your exchange records in recent 7 days, recent 14 days, recent 30 days and recent 1 year. The left part is the tabs generated according to the types of your exchange currencies. The exchange rate shown in the right line chart is calculated according to the amount of the base currency and the amount of target currency of the record.

Hope our HarmonyWallet application will bring you convenience and happiness. :)

## How to run the test files?

### 1. Location of test files

#### Frontend test files:
frontend/src/\_\_tests\_\_/

#### Backend test files:
backend/src/controllers/\_\_tests\_\_/dailyRateController.test.js
backend/src/middleware/\_\_tests\_\_/authenticateToken.test.js
backend/src/models/\_\_tests\_\_/schema.test.js
backend/src/services/\_\_tests\_\_/fillMissingRates.test.js
backend/src/services/\_\_tests\_\_/getCurrentDate.test.js
backend/src/services/\_\_tests\_\_/getExchangeRate.test.js

### 2. Please run the following code in your terminal:

#### Frontend unit tests:

```bash
cd ./frontend
```
```bash
npm test
```

#### Backend unit tests:

```bash
cd ./backend
```
```bash
npm test
```
