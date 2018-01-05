<?php

// show error reporting
error_reporting(E_ALL);

const DEBUG = true;


/** ==================================
 *
 * USER LIST
 *
 * ================================== */

$users = [
    0 => [
        'id' => 1,
        'username' => 'admin',
        'password' => 'admin',
        'firstname' => 'Administrator',
        'lastname' => '',
    ],
    1 => [
        'id' => 2,
        'username' => 'user',
        'password' => 'user',
        'firstname' => 'Anibc User',
        'lastname' => '',
    ],
    2 => [
        'id' => 3,
        'username' => 'hf',
        'password' => 'movingtype2017',
        'firstname' => 'HF St.Gallen',
        'lastname' => '',
    ]

];

/** ==================================
 *
 * allowed domains
 *
 * ================================== */

$allowed_domains = array(
    'localhost:4200',
    'anibc.local',
    'http://anibc.local',
    'http://localhost:4200',
    'https://localhost:4200',
    'http://mollo.ch',
    'https://mollo.ch',
);



if ($_SERVER['SERVER_NAME'] === 'mollo.ch') {
    $dir_root = '/home/oliver14/www/mollo.ch/anibc';
} else {
    $dir_root = '/Users/ost/MAMP/anibc';
}
