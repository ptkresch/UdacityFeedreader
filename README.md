#Udacity Feedreader Testing Project

##Introduction

A premade newsfeed application was put through a series of tests using [Jasmine](http://jasmine.github.io/).

##Running the Application

###Downloading the application
Begin by navigating [here](https://github.com/ptkresch/FeedreaderTesting) to find the Github repository for the application. Select the 'Clone or download' button and choose one of the options: Open in Github desktop, Download ZIP file, or copy the git url to the clipboard. The latter utilizes Github through the terminal or command line. 

If the ZIP file is download, simply extract the folder using an unarchiver program and browse the folder for a file named 'index.html'. Open this file using a web browser (Chrome recommended) and the app will start.

If using Github through the terminal, navigate to the folder you would like to clone the repository to. Then enter the following: 

`$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`

The above url is the one copied to the clipboard from the main repository page, so simply paste the url after typing 'git clone'. Following this, a local repository should be created with all the files necessary to run the app. Navigate to the folder and open 'index.html' inside of it with a web browser (again, Chrome recommended). 

###Testing the application on a server

Although not really necessary for this project, the steps below outline the method used to run this application on a server.

Download [ngrok](https://ngrok.com/) and open terminal. Unzip the file using the command: 

`$ unzip /path/to/ngrok.zip`

Open another Terminal window or tab and enter the following:

`python -m SimpleHTTPServer YOURPORTNUMBERHERE`

Enter an appropriate number for the port your server will run on (the defualt usually being port 80, according the the official documentation found [here](https://ngrok.com/docs#expose)). Provided the ngrok file is placed in the repository for the portfolio, ngrok can be initialized with the following command in a separate terminal window:

`./ngrok http YOURPORTNUMBERHERE`

When ngrok starts, it will display a url of the tunnel. Copy the url provided and enter it into a web browser to view the app. Now, the application can be tested online.

##Tests
1. News Feeds
	1. Each newsfeed object in the allFeeds object has a defined url that is not empty.
	2. Each newsfeed object in the allFeeds object hs a defined name that is not empty.
2. Menu Functionality
	1. The menu is hidden by default
	2. The menu changes visibility when clicked - It appears on the first click and hides on the second.
	3. The menu position changes upon each click.
3. Initial Entries
	* The loadFeed function ensures that there is at least one .entry element in the .feed container. This required callbacks to ensure feeds are loaded before testing, as the feeds were fetched asynchronously through ajax requests.
4. New Feed Selection
	* Page content actually changes upon execution of the loadFeed function. Again, this required callbacks due to asynchronous ajax requests.

In addition, tests were ensured to have no dependencies with one another.
