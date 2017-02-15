# Managr
MANAGR is a tool to simplify the management process for ALL project stakeholders: the project managers, the clients, and the construction workers.

### Notes on Frontend Setup

#### NPM
We'll use npm and webpack to handle module dependencies -- React, Webpack, loaders, and other stuff. While in the base directory of our project run `npm install` to install all necessary dependencies.

#### Webpack
Webpack is used to bundle all our javascript code into a single file called "bundle.js." This bundled file is mounted in the index.html Django template (templates/base/index.html). [React Router](https://github.com/ReactTraining/react-router) handles routing within the app. To build a *single* instance of the bundle, run `webpack` from the command line. To enable the *live reloading* of a bundle every time you make a change to a React components, run `webpack --watch`. Check out the webpack.config.js file to see how/where bundling happens.

After the bundle is created, you can run `python manage.py runserver` as usual, and navigate to localhost:8000/home to see the dashboard.

### Environment Setup
Setting up the the development environment works best in Mac OS/Linux because running and connecting a local PostgreSQL server is more friendly to these operating systems (for Windows setup see PostgreSQL for Windows).

#### Initial Environment Setup
* Install latest version of Python (should be 3.5.2+)
* Install Python package manager "pip" (Linux users install "pip3")
* Install Django with `pip install Django==<latest_django-version> djangorestframework django-cors-headers` (May need to use pip3)

Pull down this repository, open a terminal, and navigate to the repository

In order to make sure everything is running properly, navigate inside the outer project folder to see the 'manage.py' file. Run "python3 manage.py runserver", open a browser, and go to http://127.0.0.1:8000. A confirmation message should be presented (to run the server on a different port, specify the port number after "runserver").

**Note:** This may create a SQLite3.db file in the Django project. Delete this file and make sure to **not** commit the file.

#### PostgreSQL Setup
Managr uses a PostgreSQL relational database to store data. In order to install PostgreSQL, use a package manager (i.e. apt-get for Ubuntu, homebrew for Mac OS) and follow the instructions below:

* `sudo apt-get install postgresql postgresql-contrib libpq-dev`
* `sudo apt-get install python-psycopg2` (Mac users may need to run `pip install django psycopg2` if previous command fails)

**Note:** Fedora/RHEL and some other linux distributions have different packages for postgres, which are mentioned below. The following link may be useful: https://fedoraproject.org/wiki/PostgreSQL

* `sudo dnf install postgresql-server postgresql-contrib postgresql-devel`

After install these packages, you'll have to start and initialize the database with the following command:

* `sudo postgresql-setup --initdb --unit postgresql`
* `sudo systemctl enable postgresql`
* `sudo systemctl start postgresql`

Once Postgres is installed, create a local Postgres database for development
* `sudo -u postgres createdb <db_name>`
* Example: `sudo -u postgres createdb managr_local_dev`
   * If this does not work, try the following:
      * `sudo -u postgres psql`
      * `\password postgres`
         * Sets a password for the postgres user
      * `create user <user_name> with password '<password>';`
      * `create database <db_name> owner <user_name>;`
      * Proceed as normal (skip user creation below)

PostgreSQL allows for multiple database creation. One machine can have many databases on it. To switch between databases:
* `sudo -u postgres psql`
* `\connect <name_of_db_to_connect_to>`

Django requires a special admin user in the PostgreSQL database and specifies certain properties for the user to have in order for optimal interaction between the middleware and database (see below).
* Open a Postgres shell - `sudo -u postgres psql`
* Connect to the newly created local database
* Issue the following commands:
    * `CREATE USER <desired_username> WITH PASSWORD '<desired_password>';` (this password need not be secure)
    * `ALTER ROLE <username> SET client_encoding TO 'utf8';` (username = desired_username from above)
    * `ALTER ROLE <username> SET default_transaction_isolation TO 'read committed';`
    * `ALTER ROLE <username> SET timezone TO 'UTC';`
    * `CREATE EXTENSION hstore;`
    * `GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <username>;`

**Note:** If you're getting an "Ident authentication failed for user" error when attempting to run the development server, edit the file either in /etc/postgresql/<version>/main/pg_hba.conf or /var/lib/pgsql/data/pg_hba.conf and set all instances of "ident" to "md5".

Next, navigate to settings.py inside the the Django project (project_name_folder/project_name_folder/(settings.py will be sitting here)). In this same directory, create a file named "local_settings.py". The contents of this file will contain all local settings necessary for development on a local machine. This allows for the project to be connected to a production database when it's in its production environment (i.e. AWS) but connected to a local database when it's in a local environment.

**NOTE:** _DO NOT_ mistake `__local_settings.py` for `local_settings.py`. They are two different files!

Inside of the created `local_settings.py`, configure the database dictionary to connect to the PostgreSQL database that was just created on a local machine.

Example: (NAME = name of local db, USER = username of created user)
~~~~
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'managr_local_dev',
        'USER': 'bdavidson',
        'PASSWORD': 'admin',
        'HOST': '127.0.0.1',
        'PORT': '',
    }
}
~~~~
After `local_settings.py` is configured, open a terminal to where the manage.py file is located for the project.

Run:
* `python manage.py migrate managr_entities`
* `python manage.py migrate`

Finally, a superuser needs to be added through Django

Run:
* `python manage.py createsuperuser`
* fill out the information (can leave email blank)

### .Gitignore
The .gitignore currently ignores `local_settings.py` in order for everyone to maintain their own local development settings. It also ignores files ending with `.pyc` which are compiled files that are generated on the fly (**NOTE:** Do NOT commit any files ending with .pyc). These will always be changing with no relevant impact to source code of the project so they are ignored (more to come).
