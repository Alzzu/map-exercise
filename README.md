## Requirements

-   PHP >= 7.2.5
-   BCMath PHP Extension
-   Ctype PHP Extension
-   Fileinfo PHP extension
-   JSON PHP Extension
-   Mbstring PHP Extension
-   OpenSSL PHP Extension
-   PDO PHP Extension
-   Tokenizer PHP Extension
-   XML PHP Extension
-   MySQL/PostgreSQL

## Installation

Rename .env.example to .env
Define Google Maps SDK api key and all needed database information.

Migrate database
php artisan migrate

If php is installed on local machine you can use but i recommend using [Homestead](https://laravel.com/docs/7.x/homestead) for local development
php artisan serve
