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
            sh '''
            docker build \
            --cache-from praveen6235/fixit-backend:latest \
            -t praveen6235/fixit-backend:latest ./backend
            '''
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
            sh '''
            docker build \
            --cache-from praveen6235/fixit-frontend:latest \
            -t praveen6235/fixit-frontend:latest ./frontend
            '''
        }
    }

    stage('Push Frontend') {
        steps {
            sh 'docker push praveen6235/fixit-frontend:latest'
        }
    }

    stage('Deploy Containers') {
        steps {

            sh 'docker rm -f fixit-backend || true'
            sh 'docker rm -f fixit-frontend || true'

            sh '''
            docker run -d \
            --name fixit-backend \
            -p 5000:5000 \
            praveen6235/fixit-backend:latest
            '''

            sh '''
            docker run -d \
            --name fixit-frontend \
            -p 3001:80 \
            praveen6235/fixit-frontend:latest
            '''
        }
    }
}

post {
    success {
        echo 'CI/CD Pipeline Executed Successfully!'
    }

    failure {
        echo 'Pipeline Failed!'
    }
}

}
