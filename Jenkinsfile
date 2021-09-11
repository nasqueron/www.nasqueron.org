pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                archiveArtifacts artifacts: '**', excludes: '.arc*, Jenkinsfile', onlyIfSuccessful: true
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
