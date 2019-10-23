<?php

require_once('config.php');

$request_arr = json_decode( file_get_contents('php://input') );

$Angular_NoteId = $request_arr->Angular_NoteId;

$result = mysqli_query($con, "SELECT tbl_doctor.doc_id, tbl_doctor.name, tbl_doctor.lname, notes.* FROM notes INNER JOIN tbl_doctor ON tbl_doctor.doc_id=notes.UserId WHERE notes.Id='$Angular_NoteId'");

$DetailNotes = array();

while ($row = mysqli_fetch_array($result)) {
   $DetailNotes[] = $row;
}

echo json_encode($DetailNotes);
?>