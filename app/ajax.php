<?php
  $name = $_POST['name'];
  $data = array();
  if ($name == 'nikita') {
    $data['age'] = 28;
    $data['work'] = 'web-developer';
  }
  header("Content-Type: application/json");
  echo json_encode($data);
  exit;
?>
