#!/usr/bin/env bash

echo "running script......"

# cd into frontend directory
cd DNA_seq_search/frontend

# npm install
echo "installing npm packages......"
npm install

# running webpack
echo "running webpack......."
npm run dev


# cd out one directory
cd ../

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








# 2. cd to DNA_seq_search/  run following command
		# python manage.py migrate         #get database data
		# python manage.py makemigrations
        # run server        
		# python manage.py runserver    


 #    NOde    modules