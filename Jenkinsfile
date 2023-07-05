def IMAGE_NAME = "kwik_trust_frontend"
def CONTAINER_PREFIX = "container_kwik_trust_frontend"
def HOST = "18.224.88.112"
def USER_NAME = "ubuntu"
def TARGET_FOLDER = "/var/www/devkwiktrust/"

pipeline {
  agent any
  stages {
  stage("Clone & Initialize repository") {
     steps {
        script {
          COMMIT_HASH = sh(script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
          TAG_NAME = "dev-${COMMIT_HASH}"
          BUILD_FOLDER = "build-${COMMIT_HASH}"
          CONTAINER_NAME = "container_kwik_trust_frontend-${COMMIT_HASH}"
        }
        sh "whoami"
        sh "pwd"
        sh "ls -al"
        sh "cat /home/jenkins/jenkins/workspace/workspaces.txt"
        echo sh(script: 'env|sort', returnStdout: true)
        echo "${COMMIT_HASH}"
        echo "${TAG_NAME}"
        echo "${BUILD_FOLDER}"
        echo "${BRANCH_NAME}"
      }
  }
  stage("Build Image") {
    when { branch "development" }
    steps {
      sh "docker image rm $IMAGE_NAME:$TAG_NAME || true"
      sh "docker build -t $IMAGE_NAME:$TAG_NAME -f Dockerfile ."
    }
  }
  stage("Create Release") {
    when { branch "development" }
    steps {
      sh "mkdir -p /home/jenkins/$IMAGE_NAME"
      sh "ls -al /home/jenkins/$IMAGE_NAME"
      sh "docker stop $CONTAINER_NAME || true"
      sh "docker rm $CONTAINER_NAME || true"
      sh "docker run --name $CONTAINER_NAME -v /home/jenkins/$IMAGE_NAME/$BUILD_FOLDER:/app/build -i $IMAGE_NAME:$TAG_NAME npm run build"
      sh "ls -al /home/jenkins/$IMAGE_NAME"
      sh "ls -al /home/jenkins/$IMAGE_NAME/$BUILD_FOLDER"
    }
  }

  stage("Publish Artifacts Development") {
     when { branch "development" }
     steps {
       sh "scp -r /home/jenkins/$IMAGE_NAME/$BUILD_FOLDER/* $USER_NAME@$HOST:$TARGET_FOLDER"
    }
  }

  stage("Remove Images & Cleanup") {
    when { branch "development" }
    steps {
      sh "docker stop $CONTAINER_NAME"
      sh "docker rm $CONTAINER_NAME"
      sh "docker rmi -f $IMAGE_NAME:$TAG_NAME"
    }
  }
}
}