<?php
$remote_ip = (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);

if( $_GET["format"] == 'json'){
  header('Content-Type: application/json');
  //echo json_encode($result, true);
  print '{ "ip" : "' .$remote_ip. '"}';
}else{
  print $remote_ip;
}

?>
