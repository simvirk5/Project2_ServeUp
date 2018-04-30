# Feeding Forward

This fullstack application allow users to log food donations items and search nearby food banks in Washington State. The food industry is known for throwing away tons of adequate food that can simply be donated to food banks that rely heavily, if not entirely, on donation.

## How to use this app:

After signing in, user saves the food items from a predetermined list and/or add their own items to their database. In addition, they can save their food bank location to the same database. Once on the profile page, users have the ability to make any updates to their database and/or delete any of their entries. 

## Technologies Used

Node.js
MongoDB
Mongoose
Javascript
Materialize CSS
EJS
CSS
JQuery

## Routes

|Method         |Route/Url          |Purpose                         |
|----------------|-------------------------------|-----------------------------|
|GET |/            |Homepage            |
|GET          |/auth/login            |Displays login form with email and password input fields          |
|POST          |/auth/login| Logs user, displays google maps and food donation logs, and redirects to profile page
|GET          |/auth/profile| User's profile page displays user's database of the selected food items and food bank location
|GET |/auth/signup          |Displays signup form          
|POST          |/auth/signup           |Signup form created          |
|GET          |/auth/logout| Redirect to homepage

## API 

https://developers.google.com/maps/
Google Maps Javascript API

## Challenges

- Searchbox in google maps API only renders search by city, not by foodbanks. I had to hardcode the markers with name and coords of each foodbank location. 
- Sending data from API to foodItems database by using Jquery to add eventListener and using AJAX call to post and update saved locations. 
- Rendering checked items selected by user to the update route.


## Next Steps
- Replace the hardcore food bank database with an actual API Call that renders food bank names when a user searches 'food banks' in the search box.
- Add another route/schema for volunteer drivers signup
	> Give users option to deliver items to foodbank and ask for a pickup.
	Add monthly subscription for users who ask for pickup.