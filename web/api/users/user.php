<?php
// show error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);


// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, X-Auth-Token');


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
        http_send_status(200);

        return json_encode([
                'user' => $user,
                "token" => $token,
                "message" => 'Login OK']

        );

    } else {
        // else return 400 bad request
        http_send_status(400);
        return json_encode([
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


if (isset($_GET['id']) && !empty($_GET['id'])) {

    $id = sanitizeString($_GET['id']);


    echo json_encode([
            'status' => true,
            "message" => $id]
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


