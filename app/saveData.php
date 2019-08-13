<?php
    $data = json_decode($_POST["data"]);
    $fname = "OAPhood.json";
    $file = fopen("../data/" . $fname, "w");
    fwrite($file, json_encode($data, JSON_PRETTY_PRINT));
    fclose($file);
?>