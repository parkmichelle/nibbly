# nibbly

## Set up Postgres

To get started with Postgres, install it using

	sudo apt-get install postgresql

Also install `pg` and `sequelize`:

	npm install sequelize
	npm install pg

You want to run Postgres under a separate user account. The default user is called ```postgres```. To create a new password for the default user, type

	sudo passwd postgres

Now type your new password.

To change to the `postgres` user and then enter the Postgres prompt, type

	su postgres
	psql

Once you're in this interactive Postgres prompt, you can type SQL commands and see query results.

## Create nibbly database

Go ahead and create a local database and call it `nibbly`:

	CREATE DATABASE nibbly;

You can make sure the database was created by typing `\l`, which will list all databases. To create tables and execute all SQL commands in the `setUpDB.sql` file in the project root folder, exit the `psql` prompt by typing `\q`. Make sure you're in the `nibbly` root folder and that you are running under the `postgres` user. Now type the following:
	
	psql -d nibbly -a -f setUpDB.sql

The `-d` flag specifies the database to connect to, the `-a` flag echoes all input from the script, and the `-f` flag specifies the file to read commands from.

Now log in to the Postgres prompt again by typing `psql`. Connect to the `nibbly` database by typing `\c nibbly`. You should get this message:

	You are now connected to database "nibbly" as user "postgres".

Now if you type `\dt` you can see the table(s) that have been created. Typing `\d+ [name of table]` will show you the columns of that table. You can query whatever parts of the database you want using SQL commands or psql meta-commands documented [here](https://www.postgresql.org/docs/current/static/app-psql.html).

Now the database is set up! You can find the port it's running on using the following command:

	SELECT * FROM pg_settings WHERE name = 'port';