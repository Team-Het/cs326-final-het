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
In the previous milestone 1 and milestone 2, we designed the website to have seperate submit_lost_item and submit_found_item pages, which means the user have to go to different pages to submit lost or found items. This time, we combined two pages for convenience, but kept using old variable names in case some data mess up. Therefore, date_lost actually stands for the date that the item lost or found, time_lost stands for the approximate time that the item lost or found.


## How to test?
If you are a new user to this website, first click the "Sign In" button, this will lead you to the log in page, if you don't have an account, you could create one and after that it will show in the User Database. If you don't want to create a new one, you could just use { username: "testuser", password: "123" } to test. Then you could create a post for the item you lost or found. After creating, the post will appear in the Items Database. If you found the item you lost, or the owner found the item you picked up, you could choose to delete the post. Then the post will disappear in the Items Database.  If you don't want your account anymore, you can delete your account by clicking the person-circle icon on the top right corner and finding the delete button. After deleting, the account will be removed from User Database. 
# Heroku Application Link
https://umass-lost-and-found.herokuapp.com/


# Division of Labor
Kelly Chung: Setup MongoDB, MongoDB Client, MongoDB database node.js framework, passport local strategy, authentication, hash and salt.  Create initial lost and found database, sample data, heroku environment variables for MongoDB and session SECRET.  Fixed all the RESTful API to be aysnc compatible.  Added CRUD for Items and Users collection.  Helped combined Submit Lost and Submit Found to Submit Lost/Found.  Checked if user not logged in, redirect to login page, then continue.  Implment Create Account, Login, and User delete functionality. Finetune Fixes: Fixed bottom alignment for all pages, add sign in and sign out link in all navbars and create account link in sign in.  Redesigned login and profile page.

Yuqi Liu: Come up with the initial version of login functionality. Created lean_more page. Imported map and accomplised the basic functinality. Accomplieshed basic functionality of upload image. Helped with milestone3 markdown file.

Yujin Qin: Generated and completed the post_detail page. Finished delete post function for post_detail page. Helped combine submit lost item page and submit found item page, modified nav bar. Created and finished update_post.js, update_post.html. Helped create some Restful API. Wrote the documentation and how to test the website of milestone3 markdown file. Created samples for testing.
