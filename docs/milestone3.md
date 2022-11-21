# Group Name: 
Het

# Team Overview: 
| | Name | GitHub |
| ------------- |------------- | ------------- |
| ![](https://avatars.githubusercontent.com/u/71847172?s=48&v=4) | Yujin Qin | [nenevadera](https://github.com/nenevadera) |
| ![]() | Kelly Chung | [Kelly2c](https://github.com/Kelly2c) |
| ![](https://avatars.githubusercontent.com/u/58710754?s=40&v=4) | Yuqi Liu| [ZephyrusLiu](https://github.com/ZephyrusLiu) |

# Documentation
## Items Database
| Name | Data Type | Description |
| :------------- | :------------- | :------------- |
| username | string | Username created by user |
| item_name | string | Name of the item, also the title |
| category | string | Category of the item |
| brand | string | Brand of the item |
| color | string | Color of the item |
| date_lost | string | Date that the item lost or found |
| time_lost | string | Time that the item lost or found |
| address | string | Where the item lost or found |
| additonal | string | Additional information add by post owner |
| is_found | string | Check the item is lost or found |

## User Database
| Name | Data Type | Description |
| :------------- | :------------- | :------------- |
| username | string | Username of the user |
| salt | string | Secret random key to hash |
| hash | string | Hashed value of password |
| email | string | Email of the user |


## Note 
We used to have seperate submit_lost_item and submit_found_item pages, we combined them this time for convenience, but kept using date_lost and time_lost in case some data mess up.


# Division of Labor
Kelly Chung: Setup MongoDB, MongoDB Client, MongoDB database node.js framework, passport local strategy, authentication, hash and salt.  Create initial lost and found database, sample data, heroku environment variables for MongoDB and session SECRET.  Fixed all the Restful API to be aysnc compatible.  Added CRUD for Items and Users collection.  Combined Submit Lost and Submit Found to Submit Lost/Found.  Checked if user not logged in, redirect to login page, then continue.  Implment Create Account and Login functionality.

Kelly's Finetune Fixes: Fixed bottom alignment for all pages, add sign in link in all navbars and create account link in sign in.  Redesigned login page.

Yuqi Liu:

Yujin Qin: Generated and completed the post detail page. Helped combine submit lost item page and submit found item page, modified nav bar. Created and finished update_post.js, update_post.html. Helped create some Restful API.
