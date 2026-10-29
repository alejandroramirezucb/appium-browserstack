pipeline {
    agent any

    parameters {
        string(name: 'BROWSERSTACK_APP', defaultValue: 'bs://385e5b3c00023d0b1cfc5be466aa3a074d81e1ce', description: 'App id de BrowserStack (bs://...)')
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Clonando los repositorios...'
                checkout scm
                dir('web') {
                    git branch: 'main', url: 'https://github.com/alejandroramirezucb/wdio-jenkins'
                }
                dir('allure-results') { deleteDir() }
                dir('web/allure-results') { deleteDir() }
            }
        }

        stage('Instalar dependencias') {
            steps {
                echo 'Instalando dependencias...'
                bat 'npm ci'
                dir('web') {
                    bat 'npm ci'
                }
            }
        }

        stage('Pruebas WDIO web') {
            steps {
                echo 'Ejecutando pruebas WDIO web...'
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    dir('web') {
                        bat 'npx wdio run ./wdio.conf.js'
                    }
                }
            }
        }

        stage('Pruebas Appium BrowserStack') {
            steps {
                echo 'Ejecutando pruebas Appium en BrowserStack...'
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    withCredentials([usernamePassword(credentialsId: 'browserstack', usernameVariable: 'BROWSERSTACK_USERNAME', passwordVariable: 'BROWSERSTACK_ACCESS_KEY')]) {
                        bat 'npx wdio run ./wdio.conf.js'
                    }
                }
            }
        }

        stage('Reporte Allure') {
            steps {
                echo 'Generando reporte Allure...'
                allure([
                    commandline: 'Allure',
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'web/allure-results'], [path: 'allure-results']]
                ])
            }
        }
    }

    post {
        success {
            echo 'Pruebas web y moviles ejecutadas con exito.'
        }
        failure {
            echo 'Fallo alguna etapa del pipeline.'
        }
    }
}
