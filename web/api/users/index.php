<?php
// show error reporting
error_reporting(E_ALL);


header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

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
        'username' => 'hf',
        'password' => 'movingtype2017',
        'firstname' => 'HF St.Gallen',
        'lastname' => '',
    ]

];


/** ==================================
 *
 * Functions
 *
 * ================================== */


function getAll()
{
    echo json_encode(
        ['status' => true,
            'message' => "getAll"]
    );
}

function getById()
{
    echo json_encode(
        ['status' => true,
            'message' => "getById"]
    );
}

function create()
{
    echo json_encode(
        ['status' => true,
            'message' => "create"]
    );
}

function update()
{
    echo json_encode(
        ['status' => true,
            'message' => "update"]
    );
}


function delete()
{
    echo json_encode(
        ['status' => true,
            'message' => "delete"]
    );
}


function authenticate($users)
{

    $content = json_decode(file_get_contents('php://input'), true);

    $username = $content['username'];
    $password = $content['password'];

    $length = 78;
    $status = false;
    $user = false;
    $token = false;

// find if any user matches login credentials
    foreach ($users as $_user) {
        echo $_user['username'];

        if ($_user['username'] === $username && $_user['password'] === $password) {
            $user = $_user;
            $status = true;
            try {
                $token = bin2hex(random_bytes($length));
            } catch (
            Exception $e) {
                die();
            }

            break;
        }

    }

    if ($status === true) {
        // if login details are valid return 200 OK with user details and  token
        //   http_send_status(200);

        echo json_encode([
                'user' => $user,
                "token" => $token,
                "message" => 'Login OK']

        );

    } else {
        // else return 400 bad request
        //   http_send_status(400);
        echo json_encode([
                'user' => false,
                "token" => false,
                "message" => 'Benutzername oder Passwort falsch',
                'debug' => debuginfo()
            ]

        );

    }
}


function sanitizeString($var)
{
    $var = trim($var);
    $var = stripslashes($var);
    $var = strip_tags($var);
    $var = htmlentities($var);
    return $var;
}

function debuginfo($info = '')
{
    if (DEBUG) {

        return [
            'info' => $info,
            'http_origi' => $_SERVER['HTTP_ORIGIN'],
            'server' => $_SERVER['SERVER_NAME'],
            '_GET' => $_GET,
            '_POST' => $_POST,
        ];

    } else {
        return 'Debug off';
    }
}


/** ==================================
 *
 * Cors
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


$http_origin = $_SERVER['HTTP_ORIGIN'];
$server = $_SERVER['SERVER_NAME'];

if ($server === 'mollo.ch') {
    $dir_root = '/home/oliver14/www/mollo.ch/anibc';
} else {
    $dir_root = '/Users/ost/MAMP/anibc';
}


// REQUEST OPTIONS

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {


    if (in_array($http_origin, $allowed_domains)) {
        header("Access-Control-Allow-Origin: $http_origin");
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        //    header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
    }

    die();
}


// REQUEST POST

if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    if (in_array($http_origin, $allowed_domains)) {


        header("Access-Control-Allow-Origin: $http_origin");
        header('Content-Type: application/json');


        if (!empty(file_get_contents('php://input'))) {


            authenticate($users);

        } else {


            echo json_encode([
                'status' => false,
                "message" => 'Error',
                'error' => 'Empty Value',
                'debug' => debuginfo('_POST'),
                'postdata' => $request
            ]);
        }
    }
}


// REQUEST GET

if ($_SERVER['REQUEST_METHOD'] === 'GET') {


    if (isset($_GET['id']) && !empty($_GET['id'])) {

        $id = sanitizeString($_GET['id']);

        echo json_encode([
            'status' => true,
            "message" => $id]);
    } else {

        echo json_encode([
                'status' => false,
                "message" => 'Error',
                'error' => 'Empty Value',
                'debug' => debuginfo('_GET')
            ]
        );
    }

}