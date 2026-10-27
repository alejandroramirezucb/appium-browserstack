exports.config = {
    runner: 'local',

    specs: [
        './features/**/*.feature'
    ],
    exclude: [],

    maxInstances: 1,

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    capabilities: [{
        platformName: 'android',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BROWSERSTACK_APP,
        'bstack:options': {
            deviceName: 'Google Pixel 10',
            osVersion: '16.0',
            projectName: 'Proyecto QA',
            buildName: 'Build Alarmas',
            sessionName: 'Prueba APK Alarmas',
            local: false
        }
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [
        ['browserstack', {
            buildIdentifier: '${BUILD_NUMBER}',
            browserstackLocal: false
        }]
    ],

    framework: 'cucumber',

    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true
    }]],

    cucumberOpts: {
        require: ['./features/step_definitions/alarmStep.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    afterScenario: async function (world, result) {
        if (result.passed === false) {
            await browser.takeScreenshot()
        }
    }
}
