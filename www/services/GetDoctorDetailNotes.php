<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_NoteId = $request_arr->Angular_NoteId;

$result = mysqli_query($con, "SELECT tbl_users.UserId, tbl_users.FirstName, tbl_users.LastName, notes.* FROM notes INNER JOIN tbl_users ON tbl_users.UserId=notes.PatientId WHERE notes.Id='$Angular_NoteId'");

$DetailNotes = array();

while ($row = mysqli_fetch_array($result)) {
   $DetailNotes[] = $row;
}

echo json_encode($DetailNotes);
?>