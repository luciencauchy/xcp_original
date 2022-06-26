<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>XCP - Login</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    </head>
    <body class="antialiased">
        <div id="app">
            <router-view />
        </div>
    </body>
    <script src="{{ mix('/js/app.js') }}"></script>
</html>
