pipeline {
    agent any

    tools {
        maven 'Maven'      // Name as configured in Global Tool Configuration
        nodejs 'Node18'    // Name as configured in Global Tool Configuration
    }

    environment {
        MAVEN_HOME = tool name: 'Maven', type: 'maven'
        NODE_HOME = tool name: 'Node18', type: 'NodeJSInstallation'
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
                    sh "${MAVEN_HOME}/bin/mvn clean install -DskipTests"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('e-commerce-frontend') {
                    sh 'npm install'
                    sh 'npm run build -- --configuration production'
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
                // Add real deployment commands here
            }
        }
    }
}
