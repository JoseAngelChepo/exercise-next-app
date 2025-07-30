pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'npm run install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
