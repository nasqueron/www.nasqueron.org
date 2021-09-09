pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://devcentral.nasqueron.org/source/www.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                archiveArtifacts artifacts: '**', onlyIfSuccessful: true 
            }
        }
        stage('Publish') {
            steps {
                echo 'Deploying....'
                sshPublisher(
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'ysul-deploy',
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    sourceFiles: '**',
                                    remoteDirectory: 'www.nasqueron.org',
                                    cleanRemote: true,
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}
