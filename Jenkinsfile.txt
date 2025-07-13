pipeline {
    agent any

    environment {
        MAVEN_HOME = tool 'Maven'
        NODE_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/vijaybaghel1041/e-commerce-fullstack.git', branch: 'main'
            }
        }

        stage('Build Backend') {
            steps {
                dir('e-commerce-backend') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('e-commerce-frontend') {
                    sh 'npm install'
                    sh 'ng build --configuration production'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'e-commerce-backend/target/*.jar', fingerprint: true
                archiveArtifacts artifacts: 'e-commerce-frontend/dist/**/*', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy your frontend and backend here.'
                // Example:
                // sh 'scp target/*.jar user@server:/app/backend/'
                // sh 'scp -r dist/ user@server:/app/frontend/'
            }
        }
    }
}
