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
                // Copy kubeconfig and replace 127.0.0.1 with Minikube's Docker IP
                sh 'cp ~/.kube/config ~/.kube/config.jenkins'
                sh 'sed -i "s|https://127.0.0.1:[0-9]*|https://192.168.49.2:8443|g" ~/.kube/config.jenkins'
                sh 'kubectl --kubeconfig ~/.kube/config.jenkins apply -f k8s/'
            }
        }
    }
}