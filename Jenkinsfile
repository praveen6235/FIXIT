pipeline {

    agent any

    stages {

        stage('Build Backend') {
            steps {
                bat 'docker build -t praveen6235/fixit-backend ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'docker build -t praveen6235/fixit-frontend ./frontend'
            }
        }

        stage('Push Backend') {
            steps {
                bat 'docker push praveen6235/fixit-backend'
            }
        }

        stage('Push Frontend') {
            steps {
                bat 'docker push praveen6235/fixit-frontend'
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/'
            }
        }
    }
}