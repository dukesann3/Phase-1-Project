------------------------------------------------------------------------------------------------------------
|                                                                                                          |
|         PHASE-1-PROJECT / FLATMO-PROJECT                                                                 |
|                                                                                                          |
------------------------------------------------------------------------------------------------------------

--- FLATMO --- ---------------------------------------------------------------------------------------------

This website 'FLATMO' is a knock-off version of 'VEN-MO' where users can exchange
currency with friends.

--- HOW TO RUN PROJECT -------------------------------------------------------------------------------------

1. Make sure you have node.js downloaded

2. Install JSON-server via: npm install -g json-server

3. Launch JSON-server by command: json-server --watch db.json

4. Launch website

--- PROJECT DESCRIPTION ------------------------------------------------------------------------------------

This app is simply a digital wallet where users can exchange money with other users.

*Notice*: Due to the restrictions of this project, the app already assumes the user has 
logged onto his/her FLATMO account. 

FEATURE 1: When the user first opens the app, he/she is greeted with lists of transactions his/her friends 
have done. Each transaction will have a "WHO PAID WHO", payor initials, and a description. This information
is stored in JSON-server, which a mock REST API tool where it acts like a database for all transactions
and friends of the user. Each data points are parsed and integrated into the DOM.

FEATURE 2: There will be a search bar at the top center of the website. When entering in the textbox, it will
filter the transactions listed in the website to match the user input and user names who paid or recieved money.
For example, if I type in 'Jess' into the textbox, the DOM will change so that the transaction list will 
contain every transaction where a person who's name contains 'Jess', and hides every other transactions.
This is done by a search function.

FEATURE 3: There is a pay button next to the search bar. Once pressed, it will pop up a transaction form containing 
an input field for reciever name, payment amount, and a description for the transaction. The reciever name is 
not quite an input field. It is a select HTML element that only contains the user's friends' names. This information
is fetched using GET. The remaining input fields do not have any fetch features. Another thing to note is that 
if the input fields are not fully filled out, the user will not be able to submit the form. It will alert the 
user that it needs to be fully filled out. Once filled, the submit button may be pressed. When pressed, it will 
trigger a POST request, posting a new transaction in the JSON-server database. The change will also be reflected 
on the BOM as well. Simultaneously, it will also trigger a PATCH request to update the user's balance as well.

FEATURE 4: At the top right corner of the website, the user will see "user initials" wrapped in a circular frame.
It will say "UN" as an initial for user name. If an user hovers over the initials, and it will pop up a display
showing how much money the user has in his/her "wallet". This information is fetched through a GET request.

--- WHY JSON-SERVER WAS USED -----------------------------------------------------------------------------------

The main reason JSON-server was used instead of a free API that is already built is because it gives me more
freedom for my app and also, it is a good practice for making/organizing databases for my next phase projects.

--- CHALLENGES I FACED ------------------------------------------------------------------------------------------

The biggest challenge I faced was a combination of my inexperience and the unknown. Although, I was able to 
finish the project, I was moving signifcantly slower and enountered a lot of new obstacles such as creating
a search bar from scratch.




