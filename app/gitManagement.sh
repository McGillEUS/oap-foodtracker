#! /bin/bash
git add /srv/www/oap/foodtracker/data/*;
git commit -m "food history update";
chmod 777 /srv/www/oap/foodtracker/data/*;
chown oap:oap /srv/www/oap/foodtracker/data/*
chmod 775 /srv/www/oap/foodtracker/app/*;
chown oap:oap /srv/www/oap/foodtracker/app/*