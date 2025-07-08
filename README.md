### cool php-laravel commands ### 
`php artisan migrate:fresh --seed`

`php artisan make:model {{model name}} -mfs`

`php artisan route:clear` 

`php artisan view:clear`

`php artisan cache:clear`

`php artisan route:list`

`php artisan optimize`

`php artisan config:clear` 

`php artisan config:cache`


### cloning sequence ###
1. git clone a project
2. install the dependencies from `composer` (php)
PS C:\Users\Omar.Sanchez\Herd\vehicool-wardem> 
`composer install`

3. install the dependencies from the package.json (front-end)
PS C:\Users\Omar.Sanchez\Herd\vehicool-wardem> 
`npm install`

4. setup the `.env` environment , on the .env.example we just need to add some stuff:
    1. APP_URL=http://{{name of the project}} for example:
        1.1 APP_URL=http://vehicool_wardem.test
    2. APP_KEY
        1. for the app_key we can use artisan - `php artisan key:generate` , this generates a key and automatically assign it to the .env file

5. create a database and run a migration to get all the default data base tables up and running
    1. we just need to go to the database folder and add a file database.sqlite this file represents the default database that Laravel looked for without having to update anything in the .env file, if the database is not named database I need to add on the .env file a DB_DATABASE= where the value is a path : DB_DATABASE=C:/Users/Omar.Sanchez/Herd/vehicool_wardem/database/database.sqlite
    2. we need to run a migration to run all the project tables: php artisan migrate --seed 
    3. in order to see the sqlite files in vs code we can install an extension called SQLITE VIEWER

6. `npm run dev` to use all the public assets that vite give us