<?php

(new \Aerys\Host())
    ->use(\Aerys\root(__DIR__ . '/public'))
    ->expose('*', 9999);
