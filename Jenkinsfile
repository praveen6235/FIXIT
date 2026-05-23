pipeline {

    agent any

    stages {

        stage('Build Backend') {
            steps {
                sh 'docker build -t praveen6235/fixit-backend ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t praveen6235/fixit-frontend ./frontend'
            }
        }

        stage('Push Backend') {
            steps {
                sh 'docker push praveen6235/fixit-backend'
            }
        }

        stage('Push Frontend') {
            steps {
                sh 'docker push praveen6235/fixit-frontend'
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}