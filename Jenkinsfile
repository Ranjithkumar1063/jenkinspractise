pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['Smoke', 'Regression', 'Smoke+Regression', 'All'],
            description: 'Select Test Suite'
        )
    }

    stages {

        stage('Check Node') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {

                    switch(params.TEST_SUITE) {

                        case 'Smoke':
                            echo "Executing Smoke Suite"
                            bat 'npx playwright test --grep "@Smoke"'
                            break

                        case 'Regression':
                            echo "Executing Regression Suite"
                            bat 'npx playwright test --grep "@Regression"'
                            break

                        case 'Smoke+Regression':
                            echo "Executing Smoke and Regression Suites"
                            bat 'npx playwright test --grep "@Smoke|@Regression"'
                            break

                        case 'All':
                            echo "Executing Complete Test Suite"
                            bat 'npx playwright test'
                            break
                    }
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            }
        }

    }

    post {
        always {
            echo "Pipeline Execution Completed"
        }

        success {
            echo "Playwright Tests Executed Successfully"
        }

        failure {
            echo "Playwright Test Execution Failed"
        }
    }
}
