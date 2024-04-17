#!/bin/bash

# Check if a file path was provided
if [ -z "$1" ]
then
  echo "Please provide a file path as an argument."
  exit 1
fi

# Check if the file exists
if [ ! -f "$1" ]
then
  echo "File not found!"
  exit 1
fi

# Read the file line by line
while IFS= read -r line
do
  # Create a new branch from main for each line in the file
  git checkout main
  git checkout -b "$line"
done < "$1"