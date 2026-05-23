pipeline {

    agent any

    stages {

        stage('Build Backend') {
            steps {
                sh 'docker build -t fixit-backend ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t fixit-frontend ./frontend'
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}