<?php
// show error reporting


$http_origin = $_SERVER['HTTP_ORIGIN'];

$server = $_SERVER['SERVER_NAME'];


$allowed_domains = array(
    'localhost:4200',
    'anibc.local',
    'http://anibc.local',
    'http://localhost:4200',
    'https://localhost:4200',
    'http://mollo.ch',
    'https://mollo.ch',
);

if ($server === 'mollo.ch') {
    $dir_root = '/home/oliver14/www/mollo.ch/anibc';
} else {
    $dir_root = '/Users/ost/MAMP/anibc';
}

if (in_array($http_origin, $allowed_domains)) {
    header("Access-Control-Allow-Origin:$http_origin");
}

header("Access-Control-Allow-Credentials: true");
header('Access-Control-Request-Headers: content-type');
header('Access-Control-Allow-Methods: HEAD, GET, POST');
header("Content-type: application/json; charset=utf-8");



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


function authenticate($users, $username, $password)
{
    $length = 78;
    $status = false;
    $user = false;
    $token = false;

// find if any user matches login credentials
    foreach ($users as $_user) {

        if ($_user['username'] === $username && $_user['password'] === $password) {

            $user = $_user;
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
   //     http_send_status(400);
        echo json_encode([
                'user' => false,
                "token" => false,
                "message" => 'Benutzername oder Passwort falsch']

        );

    }
}


if (isset($_POST['username']) && !empty($_POST['username'])) {

    $username = sanitizeString($_POST['username']);
    $password = sanitizeString($_POST['password']);

      authenticate($users, $username, $password);


}

elseif (isset($_GET['id']) && !empty($_GET['id'])) {

    $id = sanitizeString($_GET['id']);


    echo json_encode([
            'status' => true,
            "message" => $id]
    );
}
else{
    echo json_encode([
            'status' => true,
            "message" => 'users']
    );
}


function sanitizeString($var)
{
    $var = trim($var);
    $var = stripslashes($var);
    $var = strip_tags($var);
    $var = htmlentities($var);
    return $var;
}


