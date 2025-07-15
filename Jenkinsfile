pipeline {
    agent any

    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'front'
        NODEJS_HOME = tool name: 'NodeJS 18', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        MAVEN_HOME = tool name: 'Maven 3.8', type: 'hudson.tasks.Maven$MavenInstallation'
        PATH = "${NODEJS_HOME}/bin:${MAVEN_HOME}/bin:$PATH"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/yourusername/your-repo.git', branch: 'main'
            }
        }

        stage('Build Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'mvn test'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy step here – Add Docker, SSH, S3, or other logic'
                // Example: dir("${FRONTEND_DIR}/dist") { sh 'aws s3 sync . s3://your-bucket-name' }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build failed. Check errors.'
        }
    }
}
