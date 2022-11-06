# Group Name: 
Het

# Team Overview: 
| | Name | GitHub |
| ------------- |------------- | ------------- |
| ![](https://avatars.githubusercontent.com/u/71847172?s=48&v=4) | Yujin Qin | [nenevadera](https://github.com/nenevadera) |
| ![]() | Kelly Chung | [Kelly2c](https://github.com/Kelly2c) |
| ![](https://avatars.githubusercontent.com/u/58710754?s=40&v=4) | Yuqi Liu| [ZephyrusLiu](https://github.com/ZephyrusLiu) |

# Database Objects:

user Objects: 
user_id, first_name, last_name, password, login_name, email

item Objects: 
item_id, item_name, item_desc, is_found, image, user_id

# API CRUD operations:

| Path | Descriptions | 
| :------------- | :------------- |
| \/login | Login: Pass -> login_name, password, return failed or success and user_id |
| \/user\/create | Create New User: Pass -> login_name, password, email |
| \/user\/delete\/id | Delete User: Pass -> user_id |
| \/user\/update\/id | Update User: Pass -> user_id, first_name, last_name, password, login_name, email |
| \/user\/view\/id | View User: Pass -> user_id |
| \/user\/getall | Get All Users |
| \/item\/create | Create Item: Pass -> item_name, item_desc, is_found, image, user_id |
| \/item\/delete\/id | Delete Item: Pass -> item_id |
| \/item\/update\/id | Update Item: Pass -> item_id, item_name, item_desc, is_found, image, user_id |
| \/item\/view\/id | View Item: Pass -> item_id, item_name, item_desc, is_found, image, user_id |
| \/item\/getall | Get All Items |

## Division of Labor
Kelly Chung: Constructed the initial version of milestone markdown file, server.js, database.js, webpages.js, added express server, database objects and fields definitions, and RESTful API CRUD documentation.

Yuqi Liu:

Yujin Qin: