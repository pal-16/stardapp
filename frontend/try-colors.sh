#!/bin/bash

FOLDER="/home/ankitshubham/workspace/stardapp/frontend/public"

while read line; do
    for file in `find $FOLDER -type f`; do
        sed -i -e "s/$line/g" $file
    done
done < search_and_replace_terms.txt

FOLDER="/home/ankitshubham/workspace/stardapp/frontend/src"

while read line; do
    for file in `find $FOLDER -type f`; do
        sed -i -e "s/$line/g" $file
    done
done < search_and_replace_terms.txt