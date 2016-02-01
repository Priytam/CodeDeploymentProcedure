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

athentication/roles :
1. user can looged in using their idsid and mailID (Intentionally password field is not provided any username and email make you login, later on this authentication will be moved to ldap/sso).
2. logged in user will have role as owner and will be able to delete/update his own created object (plans/dbinstance).
3. query on configured dbInstance can be executed by only owner or secondray owners(comma seperated username) provided by owner of that instance and can be updated/removed later on by him/her.
4. admin can be configured in config/development.js and has acess to do any available actions and they will have role admin.
 ```
admins : [ {
  username : xyz,
  email : abc@email.com
},{
  username : pqr,
  email : pqr@email.com
}
]
```
5. admin can also switch as another user
6. not logged in person will have role as guest and can view only things.

supported steps :
1. approval (send mails with link to request's aprroval steps and approver can either reject/aprrove previous steps ).
2. query (able to run any query and view result and finish to move to next step of compltete request).
3. upload (upload documnets and visible to only potnetial user of that request).



#//TODO:
1. provide configuration readme.
3. add ldap authentication.
