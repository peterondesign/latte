#!/bin/bash

# If PORT is not defined
if [ -z "$PORT" ]; then

  # Check if .env file exists
  if [ -f .env ]; then

    # Read PORT value from .env (MacOS)
    PORT=$(grep -E '^PORT=' .env | cut -d '=' -f 2-)

    # Check if POST is still null
    if [ -z "$PORT" ]; then

      # Read PORT value from .env (Windows)
      while IFS='=' read -r key value; do
        key_clean="${key//[^a-zA-Z0-9]/}"

        if [ $key_clean = "PORT" ]; then
          PORT=$value
          break
        fi
      done < .env
    fi
  fi

  # Check if POST is still null
  if [ -z "$PORT" ]; then
    # Default value if not set in .env or system environment
    PORT="8099"  
  fi
fi

next dev --port $PORT