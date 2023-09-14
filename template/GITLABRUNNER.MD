
You can config gitlab CI runner to create build automatically.

## Config workflow

- Create new repo for gitlab CI
- Create Runner for gitlab CI
- Move fastlane, build-ci folder to new repo
- Add new files [README.MD](#readmemd), [.gitlab-ci.yml](#gitlab-ciyml), [pull_repo.sh](#pull_reposh), [release.sh](#releasesh) and [build-ci](#build-ci) folder to new repo

### README.MD

```md
## Requiement

- [rbenv](https://github.com/rbenv/rbenv)(version >= 2.7.6)
- [fnm](https://github.com/Schniz/fnm)
- [fastlane](https://fastlane.tools/)
- [Gitlab-Runner](https://docs.gitlab.com/runner/) for macos. executor should be shell

## Run Pipeline

    - Step 1: Create new pipeline on gitlab
    - Step 2: Add 2 variable:
      - BRANCH_NAME: branch of repo want to build. ex: develop, main, ...
      - BASE_ENV_ARGS: env want to build. String with "," separator. This will use for fastlane. ex: dev,prod

```

### .gitlab-ci.yml

```yml
workflow:
stages: [clone, setup-env, install, android, ios, release, cleanup]

default:
  tags:
    - macos_shared

variables:
  GIT_CLEAN_FLAGS: "none"
  # BRANCH_NAME: "develop"
  FASTLANE_SCRIPT_ANDROID: "bundle exec fastlane android"
  FASTLANE_SCRIPT_IOS: "bundle exec fastlane ios"
  # BASE_ENV_ARGS: "dev"
  EXPORT_DIR_ARGS_NAME: "export_dir"
  EXPORT_FOLDER: "export/$BRANCH_NAME"

clone-code-project:
  stage: clone
  before_script:
    - echo "Cloning code ..."
    - chmod 777 pull_repo.sh
  script:
    - ./pull_repo.sh $REPO_SOURCE $BRANCH_NAME
  when: manual

setup-node:
  stage: setup-env
  before_script:
    - echo "Setting up node version ..."
  script:
    - if [[ $(fnm list | grep v$$(NAME_ARG)) == "" ]]; then (echo "Install node version $NODE_VERSION via fnm" && fnm install $NODE_VERSION) fi
    - fnm use $NODE_VERSION
    - npm install -g yarn
  needs:
    - job: clone-code-project

setup-ruby:
  stage: setup-env
  before_script:
    - echo "Setting up ruby version ..."
  script:
    - if [[ $(ruby-build --definitions | grep $RUBY_VERSION) == "" ]]; then (echo "Install ruby version $RUBY_VERSION via rbenv" && rbenv install $RUBY_VERSION ) fi
    - cd repo/$BRANCH_NAME
    - rbenv local $RUBY_VERSION
  needs:
    - job: setup-node

install-dependencies:
  stage: install
  before_script:
    - cd repo/$BRANCH_NAME
    - fnm use $NODE_VERSION
  script:
    - echo "Installing dependencies ..."
    - yarn install
    - bundle update fastlane
  needs:
    - job: setup-ruby

build-android:
  stage: android
  before_script:
    - echo "Building android app ..."
    - cd repo/$BRANCH_NAME
    - fnm use $NODE_VERSION
  script:
    - echo "sdk.dir=$ANDROID_HOME" > android/local.properties
    - npx ts-node build_script/build-android.ts $BASE_ENV_ARGS $EXPORT_FOLDER
  needs:
    - job: install-dependencies
  allow_failure: true

deploy-android:
  stage: android
  before_script:
    - echo "Deploy android app ..."
    - cd repo/$BRANCH_NAME
  script:
    - npx ts-node build_script/deploy-android.ts $BASE_ENV_ARGS $EXPORT_FOLDER
  needs:
    - job: build-android
  allow_failure: true

build-ios:
  stage: ios
  before_script:
    - echo "Building ios app ..."
    - cd repo/$BRANCH_NAME
    - fnm use $NODE_VERSION
  script:
    - npx ts-node build_script/build-ios.ts $BASE_ENV_ARGS $EXPORT_FOLDER
  needs:
    - job: install-dependencies
  allow_failure: true

deploy-ios:
  stage: ios
  before_script:
    - echo "Deploy ios app ..."
    - cd repo/$BRANCH_NAME
  script:
    - npx ts-node build_script/deploy-ios.ts $BASE_ENV_ARGS $EXPORT_FOLDER
  needs:
    - job: build-ios
  allow_failure: true

release:
  stage: release
  before_script:
    - chmod 777 release.sh
    - echo "Release ..."
  script:
    - ./release.sh repo/$BRANCH_NAME/fastlane/export $CI_JOB_TOKEN $CI_API_V4_URL $CI_PROJECT_ID $BRANCH_NAME
  needs: [build-android, build-ios]
  allow_failure: true

clean-up:
  stage: cleanup
  before_script:
    - echo "Cleaning up ..."
    - cd repo
  script:
    - rm -rf $BRANCH_NAME
  needs: [release, deploy-ios, deploy-android]

```

### pull_repo.sh

```sh
repo=$1
branch=$2
chmod 777 repo
rm -rf repo/$branch
mkdir -p repo/$branch
cd repo/$branch
rm -rf fastlane
git clone $repo -b $branch .
# copy fastlane and build_script to $branch folder
cp -r ../../fastlane .
cp -r ../../build_script .

```

### release.sh

```sh
export_dir=$1
CI_JOB_TOKEN=$2
CI_API_V4_URL=$3
CI_PROJECT_ID=$4
BRANCH_NAME=$5
files_dir=$(find "$export_dir" -type f \( -name "*.apk" -o -name "*.aab" -o -name "*.ipa" -o -name "*.dSYM.zip" \))
cd repo/$BRANCH_NAME
last_commit=$(git rev-parse --short HEAD)
cd ../..
for eachfile in $files_dir
do
   echo $eachfile
   filename=$(basename "$eachfile")
   if [[ $filename =~ ([0-9]+\.[0-9]+\.[0-9]+) ]]; then
      version="${BASH_REMATCH[1]}"
   else
      version="0.0.0"
   fi

   curl --header "JOB-TOKEN: $CI_JOB_TOKEN" --upload-file $eachfile "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/generic/$BRANCH_NAME-$last_commit/$version/$filename"
done

```

### build-ci

#### build-android.ts

```ts
import { execSync } from 'child_process';

(() => {
  const [envArgs, export_dir] = process.argv.slice(2);

  console.log(`envArgs: ${envArgs}`);

  envArgs.split(',').forEach(envArg => {
    console.log(`Building android for ${envArg}`);

    execSync(
      `bundle exec fastlane android aab_android --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );

    execSync(
      `bundle exec fastlane android apk_android --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );
  });
})();

```

#### deploy-android.ts

```ts
import { execSync } from 'child_process';

(() => {
  const [envArgs, export_dir] = process.argv.slice(2);

  console.log(`envArgs: ${envArgs}`);

  envArgs.split(',').forEach(envArg => {
    console.log(`Deploying android for ${envArg}`);

    execSync(
      `bundle exec fastlane android google_internal --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );
  });
})();

```

#### build-ios.ts

```ts
import { execSync } from 'child_process';

(() => {
  const [envArgs, export_dir] = process.argv.slice(2);

  console.log(`envArgs: ${envArgs}`);

  envArgs.split(',').forEach(envArg => {
    console.log(`Building ios for ${envArg}`);

    execSync(
      `bundle exec fastlane ios build_ipa --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );
  });
})();

```

#### deploy-ios.ts

```ts
import { execSync } from 'child_process';

(() => {
  const [envArgs, export_dir] = process.argv.slice(2);

  console.log(`envArgs: ${envArgs}`);

  envArgs.split(',').forEach(envArg => {
    console.log(`Deploying ios for ${envArg}`);

    execSync(
      `bundle exec fastlane ios upload_to_TF --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );
  });
})();

```

> Folder structure like:

    .
    ├── fastlane                   
    ├── build-ci                    
    │   ├── build-android.ts
    │   ├── deploy-android.ts
    │   ├── build-ios.ts
    │   └── deploy-ios.ts
    ├── .gitlab-ci.yml                   
    ├── pull_repo.sh                    
    ├── release.sh                  
    └── README.md
