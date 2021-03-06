#!/usr/bin/env bash

echo "running script......"


cd DNA_seq_search/

pip install Django
pip install django-blastplus
pip install djangorestframework
pip install biopython

# run migration script
echo "running migrations....."
python manage.py migrate 
python manage.py makemigrations


# open app locally on browser 
# this command runs on mac system 
# for windows run 
# start http://127.0.0.1:8000
open http://127.0.0.1:8000

# run server 
python manage.py runserver  

