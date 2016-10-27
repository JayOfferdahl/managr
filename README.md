# managr
MANAGR is a tool to simplify the management process for ALL project stakeholders: the project managers, the clients, and the construction workers.

Works best for Mac OS/Linux (Windows will require extra effort to set up the local PostgreSQL development server)

Initial Environment Setup
install latest version of python (should be 3.5.2+)
Install python package manager "pip" (Linux users install "pip3")
Install Django itself with "pip install Django==<latest_django-version>" (Linux users use "pip3")

Next, pull down this repository, open a terminal, and navigate to where the repository is locally.

In order to make sure everything is running properly, navigate inside the outer project folder to see the 'manage.py' file. Type "python manage.py runserver", open a browser, and navigate to http://127.0.0.1:8000. A confirmation message should be presented. (To run the server on a different local port, simply specify the port number after "runserver").

Managr will be connected to a PostgreSQL database.
In order to install PostgreSQL, use a package manager (i.e. apt-get for Ubuntu, homebrew for Mac OS) and run install postgresql postgresql-contrib

Next run sudo apt-get install python-psycopg2
then sudo apt-get install libpq-dev

Once postgres is installed, create a local postgres database to develop on locally
Run "sudo -u postgres createdb <db_name>"
Example: sudo -u postgres createdb managr_local_dev

PostgreSQL allows for multiple database creation. One machine can have many databases on it. To switch between databases, run sudo -u postgres psql then \connect <name_of_db_to_connect_to>

Run sudo -u postgres psql to open up a postgres shell. Next, connect to the database just created.
Issue the command CREATE USER <desired_username> WITH PASSWORD '<desired_password>'
(This password doesn't actually need to be secure i.e. can be 'password' or 'admin' etc.)

Next issue the following 4 commands while still inside the postgres shell (username in these commands = desired_username from above)
ALTER ROLE <username> SET client_encoding TO 'utf8';
ALTER ROLE <username> SET default_transaction_isolation TO 'read committed';
ALTER ROLE <username> SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <username>;

Next, navigate to settings.py inside the the django project (project_name_folder/project_name_folder/(settings.py will be sitting here))

In this same directory, create a file named "local_settings.py". The contents of this file will contain all local settings necessary for development on a local machine. This allows for the project to be connected to a production database when it's in its production environment (i.e. AWS) but connected to a local database when it's in a local environment.
*NOTE* DO NOT mistake __local_settings.py for local_settings.py, they are meant to be two different files.

Inside of the created local_settings.py, configure the database dictionary to connect to the postgreSQL that was just created on a local machine.
Example:
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

After local_settings.py is configured, open a terminal to where the manage.py file is located for the project. Run 
python manage.py makemigrations
python manage.py migrate

A superuser needs to be added through Django, run
python manage.py createsuperuser
fill out the information (can leave email blank)

