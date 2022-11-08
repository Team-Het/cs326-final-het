# Group Name: 
Het

# Team Overview: 
| | Name | GitHub |
| ------------- |------------- | ------------- |
| ![](https://avatars.githubusercontent.com/u/71847172?s=48&v=4) | Yujin Qin | [nenevadera](https://github.com/nenevadera) |
| ![]() | Kelly Chung | [Kelly2c](https://github.com/Kelly2c) |
| ![](https://avatars.githubusercontent.com/u/58710754?s=40&v=4) | Yuqi Liu| [ZephyrusLiu](https://github.com/ZephyrusLiu) |

# Database Objects:

| user Objects | PostgreSQL Type |
| :------------- | :------------- |
| user_id | Numeric |
| password | Character |
| user_name | Character |
| email | Character |

| item Objects | PostgreSQL Type |
| :------------- | :------------- |
| user_id | Numeric |
| item_id | Numeric |
| item_name | Character |
| item_desc | Character |
| image | Character |
| address | Character |
| is_found | Boolean |

# API CRUD Operations:

| Path | Descriptions | Input | Output |
| :------------- | :------------- | :------------- | :------------- |
| \/login | Login | user_name, password | success with user_id or failure |
| \/logout | Logout | user_name, password | success with user_id or failure |
| \/user\/create | Create New User | user_name, password, email | success with user_id or failure | 
| \/user\/delete\/id | Delete User | user_id | success or failure | 
| \/user\/update\/id | Update User | user_id, password, user_name, email | success or failure |
| \/user\/view\/id | View User | user_id | user_id, password, user_name, email | 
| \/user\/getall | Get All Users | NA | list of all users | 
| \/item\/create | Create Item | item_name, item_desc, is_found, image, user_id | success with item_id or failure |
| \/item\/delete\/id | Delete Item | item_id | success or failure |
| \/item\/update\/id | Update Item | user_id, item_id, item_name, item_desc, image, address, is_found,  | success or failure |
| \/item\/view\/id | View Item | item_id | user_id, item_id, item_name, item_desc,  image, address, is_found |
| \/item\/getall | Get All Items | NA | list of all items |

## Division of Labor
Kelly Chung: Constructed the initial version of milestone markdown file, server.js, database.js, webpages.js, added express server, database objects and fields definitions, RESTful API CRUD documentation and faker data.  Created events and logics functionality for Navigation Bar and Dashboard Page.

Yuqi Liu:

Yujin Qin:
