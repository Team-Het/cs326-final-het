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

# API CRUD Operations:

| Path | Descriptions | Input | Output |
| :------------- | :------------- | :------------- | :------------- |
| \/login | Login | login_name, password | success with user_id or failure | 
| \/user\/create | Create New User | login_name, password, email | success with user_id or failure | 
| \/user\/delete\/id | Delete User | user_id | success or failure | 
| \/user\/update\/id | Update User | user_id, first_name, last_name, password, login_name, email | success or failure |
| \/user\/view\/id | View User | user_id | user_id, first_name, last_name, password, login_name, email | 
| \/user\/getall | Get All Users | NA | list of all users | 
| \/item\/create | Create Item | item_name, item_desc, is_found, image, user_id | success with item_id or failure |
| \/item\/delete\/id | Delete Item | item_id | success or failure |
| \/item\/update\/id | Update Item | item_id, item_name, item_desc, is_found, image, user_id | success or failure |
| \/item\/view\/id | View Item | item_id | item_id, item_name, item_desc, is_found, image, user_id |
| \/item\/getall | Get All Items | NA | list of all items |

## Division of Labor
Kelly Chung: Constructed the initial version of milestone markdown file, server.js, database.js, webpages.js, added express server, database objects and fields definitions, and RESTful API CRUD documentation.

Yuqi Liu:

Yujin Qin: