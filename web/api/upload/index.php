<?php
/**
 * Created by PhpStorm.
 * User: ost
 * Date: 19.12.17
 * Time: 21:38
 *
 *  https://lumen.laravel.com/
 *  https://www.phpflow.com/php/create-rest-api-example-using-lumen-micro-framework-laravel-part-ii/
 *
 */

error_reporting(E_ALL);


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
    header("Access-Control-Allow-Origin: $http_origin");
}

header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, X-Auth-Token');
header("Content-type: application/json; charset=utf-8");


include('src/class.upload.php');


// we first include the upload class, as we will need it here to deal with the uploaded file

// set variables


$dir_movies = $dir_root . '/web/files/movies';
$dir_docs = $dir_root . '/web/files/docs';


if (!is_writable($dir_movies)) {
    echo json_encode(array(
        'status' => false,
        'message' => 'Destination directory not writable.'
    ));
    exit;
}


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}


// ----------  UPLOAD ----------

if (isset($_FILES['file'])) {

    // we create an instance of the class, giving as argument the PHP object
    // corresponding to the file field from the form
    // This is the fallback, using the standard way
    $handle = new Upload($_FILES['file']);
}

// then we check if the file has been uploaded properly
// in its *temporary* location in the server (often, it is /tmp)
if ($handle->uploaded) {

    // yes, the file is on the server
    // now, we start the upload 'process'. That is, to copy the uploaded file
    // from its temporary location to the wanted location
    // It could be something like $handle->Process('/home/www/my_uploads/');
    $handle->Process($dir_movies);

    // we check if everything went OK
    if ($handle->processed) {
        // everything was fine !

        $filename = $handle->file_dst_name;
        $filesize = round(filesize($handle->file_dst_pathname) / 256) / 4 . 'KB';

        echo json_encode(array(
            'status' => true,
            'message' => 'File uploaded with success.',
            'file' => $filename,
            'filesize' => $filesize

        ));
    } else {
        // one error occured

        echo json_encode(array(
            'status' => false,
            'message' => 'File not uploaded to the wanted location.',
            'error' => $handle->error
        ));
    }

    // we delete the temporary files
    $handle->Clean();

} else {
    // if we're here, the upload file failed for some reasons
    // i.e. the server didn't receive the file

    echo json_encode(array(
        'status' => false,
        'message' => 'File not uploaded on the server.',
        'error' => $handle->error
    ));
}