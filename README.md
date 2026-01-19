#  Globe Playwright TypeScript Framework

## ⚙️ Setup Instructions

### Clone the project

```bash
git https://github.com/ibrahimyreyes/globe-technical-exam-ui-test-automation.git
cd globe-technical-exam-ui-test-automation
```

### Install dependencies

```bash
npm install
```

### Install playwright browsers

```bash
npx playwright install --with-deps
```

| Parameter  | Description                  | Example Value         |
|------------|------------------------------|-----------------------|
| BASE_URL   | The base URL for the application | "https://demo.spreecommerce.org" |


## 🏃‍♂️ Running Tests

Run tests:

```bash
npx playwright test
```

Run the test with UI mode:

```bash
npx playwright test --ui
```

## 📊 Viewing Test Results

### Install Allure Commandline To View Test results

#### For Windows:

Follow the instructions [here](https://scoop.sh/) to install Scoop.<br>
Run the following command to install Allure using Scoop:

```bash
scoop install allure
```

#### For Mac:

```bash
brew install allure
```

### View Results Locally:

```bash
allure serve allure-results
```

## ℹ️  View Help And Other CLI Options

```bash
npx playwright test --help
```
