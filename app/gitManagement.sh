#! /bin/bash
git add /srv/www/oap/foodtracker/data/*;
git commit -m "food history update";
git pull;
git push;