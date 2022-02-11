# Tech Overview

- Deployment perspective:  
-- Docker compose  
-- Git CI / CD  
-- monorepo  
- Technical  
-- headless API  
 -- NodeJS + TypeScript + typescript-rest  
-- DB  
 -- Postgres  
 -- TypeORM  
-- models  
 --  entities / db structure  
 -- super-basic business logic  
 -- DTO  
-- frontend:  
 --  NextJS application (with React)  
 -- MobX for data storage  
 -- UI is based on Argon template from CreativeTim  

# Development Phase

## Setup

1. `yarn` in root folder (Lerna handles different yarns inside packages)
2. Locally, need to have Postgres. Set it up from 'data' folder, then run sample user (see update below).
3. Check and configure .env file
4. Run api: `cd api; yarn swagger; yarn dev`
5. Run frontend (next): `yarn dev`

Sample login: 
ingestion@panthr.com / pas@wf.la  
12345

## Deployment
NB: there are no slashes in the token. Webstorm has a bug that shows with \ sign.
```
update users set token='$2a$10$UDgFa9f0u9KrLxV3wzGk0uxc9VJ9qVUleLGNHUS50levHKKYD3pRi' where id = '114e667c-eb2b-49f3-a30f-5f26ea8a237f'

OR (newer DB):

update users set token='$2a$10$UDgFa9f0u9KrLxV3wzGk0uxc9VJ9qVUleLGNHUS50levHKKYD3pRi' where id = '47a0418d-7fb7-446f-b31a-573aa5ceb300'
```
update users set token='$2a$10$UDgFa9f0u9KrLxV3wzGk0uxc9VJ9qVUleLGNHUS50levHKKYD3pRi' where id = '1957d3b1-be4e-4898-80e9-05d99fab61d1'
## Multiple environments
There can be A LOT of different environments where to connect.
Right now we have a placeholder for two environments, list of environments is in `models/mapping/Environments.ts` file. 

Each of environment has "api_suffix" field that is used when taking environment vars:
see `api/.env.sample`

Say, there are vars like
`DB_HOST` (with empty suffix)
and 
`DB_HOST_ALT` (with suffix)

## Filling template ids
select template_id from galleries -> gallery template  
select template_id from biographies -> story template  

## getting new database
bash dump.sh 
cp alexie@54.215.56.147:/home/alexie/dump.sql  
~/work/PostgreSQL/bin/psql -U oscm3 -d atg-uat -f ~/work/atg-github/data/backup-uat-2021-07-20.sql  
change env to handle new db  
ts-node ./generateDb.ts ts > ../models/entities/db.ts  

## dev env
M1 usage:  
cp -r ../../node_modules/ffprobe-darwin-arm64 node_modules/ffprobe-darwin-arm64  

`Development Phase` setup relatively old, can't guarantee proper functioning.


# ! UPD: Docker-compose  
compose up (port 80):  
``` bash
docker-compose -p wfo  up --build --remove-orphans -d
docker exec wfo_api_1 yarn seed:run
```
Sample login: 
postnikov@gmail.com
12345


compose down:  
``` bash
docker-compose down
```


## ! UPD: kubectl command list
Required environment variables before start:  
- `$POSTGRES_USER` - client (tennant) name.  
- `$POSTGRES_PASSWORD` - db password for particular tennant.  
- `$APP_ENV_PASSWORD` - customers password  
- `$APP_ENV_USER` - customers email  
- `$APP_ENV_FROM` - customers title (I guess)  

In this example kubernetes manifests on `kuber` directory. Replace with your one.

``` bash
# provisioning dgo db and user
envsubst < kuber/db-provision/DBCreateJob.yaml | kubectl apply -f -
# provisioning k8s namespace with required items
kubectl kustomize kuber/production | envsubst | kubectl apply -f -
# stopping particular tennant
kubectl scale --replicas=0 deployment/api deployment/next  -n wf-$POSTGRES_USER
# resuming particular tennant. Also we can add more pod by changing replicas count
kubectl scale --replicas=1 deployment/api deployment/next  -n wf-$POSTGRES_USER
# get space name for particular tennant
kubectl get pvc csi-s3-pvc -o jsonpath={.spec.volumeName} -n wf-$POSTGRES_USER
# get users db data (values encoded by base64)
kubectl get secret client-db-secret -o jsonpath={.data} -n wf-$POSTGRES_USER
# get users db name (decoded)
kubectl get secret client-db-secret -o jsonpath={.data.PGDATABASE} -n wf-$POSTGRES_USER | base64 -d
# get status of `restore demo data` job
kubectl get job db-demo-data-job -o jsonpath={.status} -n wf-$POSTGRES_USER

```

## ! UPD: connect to database

``` bash
# connect to our pgsql pod in k8s
kubectl exec -ti postgres-0 -- /bin/bash
# set env variables (inside pod)
export PGHOST=wf-postgresql-ams3-95435-do-user-10478125-0.b.db.ondigitalocean.com
export PGPORT=25060
export PGUSER=<tennant_name>
export PGDATABASE=<tennant_name>
export PGPASSWORD=<db_password>
# just start psql 
psql

```
### psql port forwarding  
  
port forwarding to `localhost:5432`.  
port forwarding stops with ending ssh session.  
  
``` bash
#       local ip        aim host              bastion host
#         |                 |        bastion user     |
#         | local port      |      aim port  |        |
#         |       |         |          |     |        |
#      ┌-------┐ ┌--┐ ┌------------┐ ┌---┐ ┌--┐ ┌-----------┐
ssh -L 127.0.0.1:5432:188.166.19.193:25060 root@167.71.61.252
```

### handle static files
- k8s way. Get space name for particular tennant (script above) and find on DGO dashboard.
- dgo way. Every space has `csi-fs/tennant.properties` file which containns tennant name. Find right one.
