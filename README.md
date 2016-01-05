# CodeDeploymentProcedure
Easy configurable procedure containing combinations of mail send( approval) , connect to mysqldb (query), upload (doc, pdf, jpeg, png). Configure Once and excute it forever. Automating day to day office depolyment issues 

In your root directory (path/to/CodeDeploymentProcedure) create directory files/public, all uploaded docs will be saved here 
```
cd /path/to/CodeDeploymentProcedure
mkdir files
cd files
mkdir public
```

make sure you have mogoose, node , bower and gulp is intsalled 

Installing node packegs 
```
cd /path/to/CodeDeploymentProcedure
npm install
```

Installing bower packegs 
```
cd /path/to/CodeDeploymentProcedure
bower install
```
starting mongodb, run below command from mogo installation path 
```
mkdir /path/where/data/to/be/kept/
cd /path/to/mongointsallation/
./mongod.exe -dbpath /path/where/data/to/be/kept/

mogodb will default start on 27017 port 
```
running application
```
cd /path/to/CodeDeploymentProcedure
gulp
```
open in browser 
http://localhost:3000

#//TODO:
1. provide configuration readme.
2. remove unwanted packeges.
3. add ldap authentication.
4. add role based data processing(currently authentication and user role is nill and will be added soon).

