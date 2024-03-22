UK Spook Spotters - completed w/c 15th January 2024

Home Page:
![sp1](https://github.com/sdg877/Project2Backend/assets/149600602/5c55b92c-e045-4282-8f57-c8d1dd6b962b)

Login page:
![sp2](https://github.com/sdg877/Project2Backend/assets/149600602/1ff947c0-dae8-4515-b603-5577648941e6)

Sightings page (not logged in):
![sp3](https://github.com/sdg877/Project2Backend/assets/149600602/e5d3a070-eedd-474e-8be0-3c98dd83a413)

Sightings page (logged in):
![sp4](https://github.com/sdg877/Project2Backend/assets/149600602/c0cb8ad2-3afe-42a6-adf8-2ae4d79c5deb)

Single sighting view:
![sp5](https://github.com/sdg877/Project2Backend/assets/149600602/03f273fe-49d9-4801-8298-a060263f2d47)

County search page:
![sp6](https://github.com/sdg877/Project2Backend/assets/149600602/0f67d280-71f6-4c66-ba4f-1c198a7a9113)

County listing page:
![sp7](https://github.com/sdg877/Project2Backend/assets/149600602/d6924b3d-a1b7-4914-914d-5fa8d57cf810)


Description
For my Unit 2 project, we were required to build a full-stack application using Node.js, Express, and MongoDB. We could make the application about anything we wanted as long as it met the requirements. I love ghost stories and paranormal sightings so I chose to build an app that allowed people to record these sightings. 

Deployment link
GitHub Frontend
GitHub Backend
Deployed Frontend
Deployed Backend


Timeframe
We were given one week to complete this solo project. 

Technologies Used
Node
Express
MongoDB
Bootstrap


Brief
We were asked to create a fully CRUD full-stack application using the MERN framework. The application must have at least two data entities and restricted access for users that are not logged in, login must be done by Google Oauth. The app should be styled so that the look and feel are similar to apps that are used on a daily basis.

Code Process
Set up a Vue JS environment
I created a port and added a link to my Mongoose database in my .env file.
Installed relevant packages
Express
Cors
body-parser
Created Mongoose Schemas for my data entities
Counties
Cryptids
Ghosts
Users
![sp8](https://github.com/sdg877/Project2Backend/assets/149600602/5991bad4-ce38-48f9-ba64-07061e2eea3d)


Created POST requests, functions, and paths to allow the creation of  data for each of my data entities
![sp9](https://github.com/sdg877/Project2Backend/assets/149600602/d921cb9e-3b36-4bb5-904e-3067096b72ea)


I created the following components which allowed users to add sightings to each of these categories:
NewCryptid.vue
NewUFO.vue
NewGhost.vue
![sp10](https://github.com/sdg877/Project2Backend/assets/149600602/31b92be1-e7db-40aa-9ece-757921c5b73a)


Created GET requests, functions, and paths to make the data viewable
(for both single view and to view all entries for one data set)
![sp11](https://github.com/sdg877/Project2Backend/assets/149600602/7eb13b04-9630-4901-830b-0104ad6e61fe)


Created PUT and DELETE requests, functions, and paths to allow for my data to be edited or deleted
Added Oauth to allow different permissions for those logged-in and anonymous users.
![sp12](https://github.com/sdg877/Project2Backend/assets/149600602/b14ce04c-b91a-44f4-a90f-9577efb768ca)


Created a function and pages so that sightings can be viewed by the county
Added permissions so that only users who posted sightings can edit or delete them,  I required the help of my instructor to allow only the owner of posts to edit or delete, in addition to admin being able to amend them too.
Added CSS styling to make the website look more modern and user-friendly

Challenges
I needed quite a bit of assistance from my instructors with adding permission so that users could update or delete their posts.
In addition to this, I fractured my elbow two weeks before this project began. As it was my dominant arm, this made it much harder for me to type and the pain made it harder to concentrate at times. I was exceptionally proud of how this project turned out.


Wins
Aside from the help with permissions, I was able to complete the majority of this project without assistance which felt like a huge achievement. I am most proud that I was able to finish this project on time despite only having the use of my non-dominant arm.

Key Learnings
Learning to notice tiny errors in my code. The majority of the errors are caused by tiny errors, a missing curly bracket, etc. I also learned that if you are stuck, you should move on to something else and come back to it later. I found that I was usually able to resolve the issue on my own if I went back to it.

Bugs
I had issues with my logging in and out, sometimes it would log back in automatically even though I had logged out. My instructor helped me fix this by adding a console log.

Future Improvements
I would like to add the location onto a map and explain the site so that people from other countries can also add and search for sightings.

