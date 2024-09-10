/*  -------------------------------------------------------------
    Deploy www.nasqueron.org
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Project:        Nasqueron
    Description:    Jenkins CD pipeline to deploy through Alkane
    License:        BSD-2-Clause
    -------------------------------------------------------------    */

/*  -------------------------------------------------------------
    Alkane context
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

def context = """
    {
      "url": "https://devcentral.nasqueron.org/source/www.git",
      "branch": "main"
    }
"""

/*  -------------------------------------------------------------
    Jenkins CD pipeline
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

pipeline {
    agent any

    stages {
        stage('Publish') {
            steps {
                echo 'Deploying through Alkane on web-001....'

                def response = httpRequest url: "http://172.27.27.10:10206/deploy/www.nasqueron.org",
                                           httpMode: "POST", requestBody: context,
                                           validResponseContent: '"Success",'
                                           validResponseCodes: "200"
                println("Status: HTTP " + response.status)
                println("Content: " + response.content)
            }
        }
    }
}
