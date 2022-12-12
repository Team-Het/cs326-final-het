# Team Het
UMass Lost and Found, Fall 2022

## Overview

This website is created for UMass students, faculty, and residents live around Amherst to find their lost items and give them a chance to return the found items. The user of this website will be asked to create an account if they don't have one. Once the account is created, they could feel free to submit the lost or found items by creating posts, and be able to contact with other users through email by seeing all posts. They will also be able to update their posts, delete their posts, and upload images.<br/>
A website like this doesn't exist at UMass Amherst, so it will be innovative and helpful for our town if this website could be put in use.

## Team Members
| | Name | GitHub |
| :------------- | :------------- | :------------- |
| ![](https://avatars.githubusercontent.com/u/71847172?s=48&v=4) | Yujin Qin | [nenevadera](https://github.com/nenevadera) |
| ![]() | Kelly Chung | [Kelly2c](https://github.com/Kelly2c) |
| ![](https://avatars.githubusercontent.com/u/58710754?s=40&v=4) | Yuqi Liu| [ZephyrusLiu](https://github.com/ZephyrusLiu) |

## User Interface
| Name | Purpose | Screenshot |
| :------------- | :-------------------- | :------------- |
| index | Home Page | ![dashboard wireframe](../imgs/index.png) |
| create_account | Page For User To Create Account | ![dashboard wireframe](../imgs/create_account.png) |
| learn_more | Information About Us Page | ![dashboard wireframe](../imgs/learn_more.png) |
| login | Page For User To Login In | ![dashboard wireframe](../imgs/login.png) |
| post_detail | Page Contains Details About Certain Item | ![dashboard wireframe](../imgs/post_detail.png) |
| post_page | Page To View All Posts | ![dashboard wireframe](../imgs/post_page.png) |
| profile | User's Profile With Personal Information | ![dashboard wireframe](../imgs/profile.png) |
| submit_lost_item | Page For Submitting Lost Or Found Items | ![dashboard wireframe](../imgs/submit_lost_item.png) |


## APIs

| Path | Descriptions | Input | Output |
| :------------- | :------------- | :------------- | :------------- |
| \/login | Login | user_name, password | success with user_id or failure |
| \/logout | Logout | NA | success or failure |
| \/user\/create | Create New User | user_name, password, email | success with user_id or failure | 
| \/user\/delete| Delete User | user_id | success or failure | 
| \/user\/update | Update User | user_id, password, user_name, email | success or failure |
| \/user\/view\/id | View User | user_id | user_id, password, user_name, email | 
| \/user\/view\/getall | Get All Users | NA | list of all users | 
| \/item\/create | Create Item | item_name, item_desc, is_found, image, user_id | success with item_id or failure |
| \/item\/delete | Delete Item | item_id | success or failure |
| \/item\/update | Update Item | user_id, item_id, item_name, item_desc, image, address, is_found,  | success or failure |
| \/item\/view\/id | View Item | item_id | user_id, item_id, item_name, item_desc,  image, address, is_found |
| \/item\/view\/getall | Get All Items, Same as \/item\/view\/id | NA | list of all items |
| \/item\/download\/:name | Upload Image | filename | success with filename or failure |

## Database

### Items
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
| additional | string | Additional information add by post owner |
| is_found | string | Check the item is lost or found |

### User
| Name | Data Type | Description |
| :------------- | :------------- | :------------- |
| username | string | Username of the user |
| salt | string | Secret random key to hash |
| hash | string | Hashed value of password |
| email | string | Email of the user |

## URL Routes / Mappings
| URL Path | Description | Authentication |
| :------------- | :------------- | :------------- |
| \/login | Login | not required |
| \/logout | Logout | required |
| \/user\/create | Create New User | not required |
| \/user\/delete| Delete User | required |
| \/user\/update | Update User | required |
| \/user\/view\/id | View User | not required |
| \/user\/view\/getall | Get All Users | not required |
| \/item\/create | Create Item | required |
| \/item\/delete | Delete Item | required |
| \/item\/update | Update Item | required |
| \/item\/view\/id | View Item | not required |
| \/item\/view\/getall | Get All Items | not required |
| \/item\/upload | Upload Image | required |
| \/item\/download\/:name | Download Image | not required |
## Authentication / Authorization

## Division of Labor
Kelly Chung:

Yuqi Liu:

Yujin Qin:

## Conclusion
We had a good learning experience working together and all learned how to use HTML, CSS, and JavaScript to build up a website and make it usable for anyone. We communicated well through Slack with a to-do list and everyone tried their best in the group work. 

The most difficult thing is figuring out the logic and website flow then figuring out how to code and debug it. We found it was quite difficult to work on a website even though we had planned out where something was as many parts were depending and dependent on each other forcing us to stop that job to fix or create the relying job before we could test or incorporate another part.  Figuring out the logic of our website was also quite challenging as their were so many variables between our users and the data that they can/cannot interact with.

Our team would have like to have had a better design on the wireframe of our website.  We realized while working on this project we came across many instances where there were extra/missing code that we didn't need or needed to add.  For example, at first we had a submit lost, submit found, and update page that were essentially the same except for a couple of buttons and text differences.  We lacked the knowledge/idea to simplify our work until our TA helped and pointed us to a much simpler alternative of combining the 3 pages into 1.  Also, it would be very helpful if everyone had their own branch before we started working because if two people are working on the same file at the same time, someone will have to revert there work for someone else. 
## Heroku Application Link
https://umass-lost-and-found.herokuapp.com/
