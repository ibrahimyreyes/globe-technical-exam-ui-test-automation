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
### View Results Locally from Github Actions artifact:

```bash
1. Extract zip file from Github Actions artifacts
2. Navigate to the location where you extracted the zip file
3. npx allure generate .\allure-results --clean -o allure-report
4. npx allure open allure-report
```


## ℹ️  View Help And Other CLI Options

```bash
npx playwright test --help
```
