pipeline {

agent any

stages {

    stage('Clone Repo') {
        steps {
            git branch: 'main',
                url: 'https://github.com/praveen6235/FIXIT.git'
        }
    }

    stage('Build Backend') {
        steps {
            sh 'docker build -t praveen6235/fixit-backend:latest ./backend'
        }
    }

    stage('Docker Login') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'dockerhub',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {

                sh '''
                echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                '''
            }
        }
    }

    stage('Push Backend') {
        steps {
            sh 'docker push praveen6235/fixit-backend:latest'
        }
    }

    stage('Build Frontend') {
        steps {
            sh 'docker build -t praveen6235/fixit-frontend:latest ./frontend'
        }
    }

    stage('Push Frontend') {
        steps {
            sh 'docker push praveen6235/fixit-frontend:latest'
        }
    }

    stage('Deploy Containers') {
    steps {

        sh 'docker stop $(docker ps -q) || true'
        sh 'docker rm $(docker ps -aq) || true'

        sh 'docker compose -f docker-compose.app.yml down || true'

        sh 'docker compose -f docker-compose.app.yml up -d'
    }
}
}



}
