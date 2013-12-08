# Datsy Front-End [![Build Status](https://travis-ci.org/RyanMG/front-end.png?branch=newUI)](https://travis-ci.org/RyanMG/front-end)

##What is Datsy?

Datsy is a free, open and simple means to access and explore an ever growing number of data sets. This repository code serves as an example of a client facing component using the Datsy API, which allows users to access the data that is served via the Datsy API endpoints.

The project attempts to simplify the user experience of finding useful data. Many of the larger data repositories are cluttered and poorly designed in terms of usability. Searches offers hundreds of vague and disparate datasets with no clean way to sort and filter through them. We are building an alternative means for a user to find the data he or she is interested in, and put it to use. We aim to open up data up to the common user, not just data scientists.

On loading the site, users are immediately presented with a single field form to search for a topic they are interested in. No cluttered lists, nested drop down menus or archaic navigation needed to get started. When designing the user experience, we worked closely with the backend team to design a metadata system that took as much of the frustration as possible out of finding interested data sets. We settled on storing keywords for data sets as well as column data within a dataset, which most accurately boils down the contents of a dataset / column of data to its core. These keywords drive the user's searches for data, allowing them to filter down the the number of data sets they will need to sort through to a manageable number before they see any information from the data sets at all.

To offer a clear use case for the user in this search, within our given project timeframe and scope, we decided or give the user the ability to quickly see data graphed. Once a user has narrowed down their keyword search to just the data they want to look through, they can select columns of data that contain the information they are most specifically interested in. These columns of data are saved to a 'cart', which the user can have visualized immediately via D3. No extra knowledge is needed on their part - they just pick their data and go.

Due to the time limitations of the initial period of this project, we have limited all visualization to be built against time on the x-axis. This seemed like the most common use case, and offered the most dynamic overlap of data sets to be compared against one another.

###You can see the current implementation deployed here:

[link to deployed version]

This live version is pulling data through the API to populate its searches and build the visualizations. Data sets uploaded through the Datsy backend will appear in our front end searches.


##Our Tech Stack

We built our application in **Backbone.JS**, using **Handlebars.JS** for the templating of the views. Backbone's lightweight and simple architecture allowed us to get up and running quickly, while keeping our data tied in with its representation on screen. It was of the upmost importance that we be able to quickly and easily modify how data was stored in our models, and how our collections handled these models, so that information could be easily passed between views and even pages. Backbone's unopinionated structure let us extend and make modifications as required, to best handle out data as needed in a given use case. Handlebars offered the best solution to build our views, allowing just enough template logic to keep the pages dynamic, without losing efficiency.

**D3** drives the visualizations. This was an obvious choice. With D3 we were able to get large amounts of complex raw data from our models built into a charts with relative ease compared to other solutions. This is no means implies that building the visualizations was 'plug and play' - a lot of work was done to match data to a form D3 would accept and handle with accuracy.

Our javascript was all written using **CoffeeScript**, for its succinct and efficient syntax. CSS is precompiled from **Stylus** for the same reason. A lot of code and styling needed to written in a short amount of time by a team of only two people, and we wanted to be able to write out code as quickly and cleanly as possibly.

Our site is being served from a **Node.JS** server, running **Express**. Our current interactions with the server are limited, as we get our data through the API now. In the first stages of the project though, we were developing our interface in parallel to the development of the back end and the API, which meant we needed to be able to serve data to build our pages from our own server until the API was functional. We built routes in express that matches those the API would use, and from JSON files we created, parsed, filtered and served back data that matched the structure we had architected with the back end team. This meant a large amount of server side work on our end during the first phases of the project (which we knew would would ultimately be dumped), but this added work meant that tying into the API was far less painful when it became available.

The server compiles and builds the site's index file from a **Jade** template. It initially seems odd that we would use both Jade and Handlebars, since both are templating languages, but for us this made perfect sense. Handlebars plays well with Backbone, allowing us to add variables and simple logic to our views, but still requires long form HTML. Jade, like Coffeescript and Stylus, as a terse and simple syntax that allowed us to craft our HTML quickly and efficiently. Backbone's view templates are pulled from script tags inside the index page, to keep the views themselves cleaner, and stored on the main application model. Since Jade will compile to HTML, this meant we could write all the code in these script tags using Jade's cleaner syntax, and Handlebar's was none the wiser when it got this code to compile. Jade's include function further allowed us to separate parts of our HTML, so that each view could be written in a separate Jade file, then pulled into the index automatically when compiled. As the project grew in size, this kept us organized and made the codebase easier to navigate.

Unit testing was done in vanilla **Jasmine**. The core functionality of this testing framework was adequate to allow us to keep tabs on our models and views, and make sure their parts were functioning as intended as we added features and made changes.

**Grunt** was used to automate much of the repetition in our codebase. Using the Watch, we were able to have our Coffeescript compile to JS automatically, followed immediately by our Jasmine tests being run, every time we saved a file. Any errors we inadvertently created could be caught immediately, and fixed before they got lost in the stack. Because of the interplay we had built between Jade and Handlebars, and our view's dependency on the templates to initialize themselves, testing of views was initially off the table. Grunt's ability to compile the Jade to HTML, then the HTML to Handlebars compiled templates, and put these into our testing directory immediately, is what allowed up to test our views along side with our models and collections live.

**NPM** was used for server side dependency management, and **Bower** was used for client side components.

In the first days of this project, we needed data to build our JSON files, which would serve as the mock data to fill out our pages until the API was ready. We wrote a very simple data scraper in Node and Express, which pulled data from sites with no public API, parsed it, and stored it in a **PostGres** database. While it ultimately proved more useful to just make up all the data to build our JSON files from, this first pass proved informative in learning serve side data collection and storage.


##The Application Structure

    app.js  -- the primary server application
    Gruntfile.js
    bower.json
    .bowerrc
    package.json
    README.md

    public -- static files served to the client
      |
      |__images
      |__javascript  -- compiled JS files from coffeescript
             |
             |__**
      |__stylesheets -- compiled CSS files from stylus
             |__**
      |__vendor -- third party JS files required by not supported by bower

    resources -- the files we worked with, to be compiled for serving to the client
      |
      |__coffeescript -- .coffee files, sorted into sub directoried based on their type (models, collections, etc)
             |
             |__**
      |__stylesheets -- .styl stylus files

    server -- server code
      |
      |__fakedata -- JSON files we used to mock up data we would eventually receive from the API

    spec -- testing files
      |
      |__hbs -- precompiled handlebars templates for use in view testing
      |__helpers -- helper JS files needed to get project files to load
      |__serverTests -- tests for the server
      |__tests -- tests for the client

    views -- Jade templates to be served
      |
      |__views -- Each view's template is stored in its own Jade file, to be included in index.jade
            |
            |__**
