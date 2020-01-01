# shake-search
## Search Shakespeare's Plays

Currently Live @ http://shake-search.herokuapp.com

Select a play, input a word, and the site will show all lines in that play with that word and their speaker and location. Does not work across lines.

To Run:
1. Make sure all the files are converted using converter.py
2. Build the client
3. Run the server

----
Data Source:
http://shakespeare.mit.edu/

----

Frameworks Used:
* Frontend
    * React
        * react-track
        * react-reveal
        * antd
    * GraphQL
        * Apollo GraphQL
* Backend
    * Express
    * dotenv
    * trim
    * htmlparser
