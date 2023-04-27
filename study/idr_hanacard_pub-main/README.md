# idr_hanacard_pub
***powerShell***
- 권한 확인
   ```
   get-ExecutionPolicy
   ```
- 권한 변경
   ```
   set-ExecutionPolicy RemoteSigned
   ```

***오프라인 패키지 파일 만들기***
1. package.json 파일과 같은 depth 로 .yarnrc 파일 작성
    ```
    yarn-offline-mirror "./npm_packages"
    yarn-offline-mirror-pruning true
    ```
2. package.json 파일과 같은 depth 로 npm_packages 폴더 생성
3. 기존 node_modules 폴더, yarn.lock, package.lock 파일 삭제
4. yarn 캐시 삭제
   ```
   yarn cache clean
   node ./yarn-1.22.17.js  cache clean
   ```
5. yarn install
   ```
   yarn install
   node ./yarn-1.22.17.js  install
   ```

***오프라인 패키지 설치***
1. node.js 설치
2. 프로젝트 셋팅 파일을 작업 폴더에 copy
3. npm_packages 폴더 내 패키지 파일 설치
   ```
   node ./yarn-1.22.17.js install --offline --production
   ```