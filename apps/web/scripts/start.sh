#!/bin/bash

# If WEB_PORT is not defined
if [ -z "$WEB_PORT" ]; then

  # Check if .env file exists
  if [ -f .env ]; then

    # Read WEB_PORT value from .env (MacOS)
    WEB_PORT=$(grep -E '^WEB_PORT=' .env | cut -d '=' -f 2-)

     # Check if POST is still null
    if [ -z "$WEB_PORT" ]; then

      # Read WEB_PORT value from .env (Windows)
      while IFS='=' read -r key value; do
        key_clean="${key//[^a-zA-Z0-9]/}"

        if [ $key_clean = "WEB_PORT" ]; then
          WEB_PORT=$value
          break
        fi
      done < .env
    fi
  fi

  # Check if POST is still null
  if [ -z "$WEB_PORT" ]; then
    # Default value if not set in .env or system environment
    WEB_PORT="8099"  
  fi
fi

next start --port $WEB_PORT