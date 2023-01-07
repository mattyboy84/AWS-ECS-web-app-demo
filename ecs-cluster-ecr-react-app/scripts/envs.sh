#!/bin/bash

#set -x

function main {
  if [ -z "$1" ]; then
    usage
    exit 1
  else
    stack_filter="$1"
  fi
 
  if [ -z "$2" ]; then
    region=us-east-1
  else
    region="$2"
  fi
  echo "$stack_filter"
  echo "$region"

  stacks=$(aws cloudformation describe-stacks --region $region --stack-name $stack_filter --query "Stacks[0].Outputs" --output json)
  echo $stacks

  for i in $(echo "${stacks}" | jq -r '.[] | @base64'); do
    _jq() {
     echo ${i} | base64 -d | jq -r ${1}
    }
    
    key=$(_jq '.OutputKey')
    echo $key
    value=$(_jq '.OutputValue')
    echo $value
    #
    # Add "NEXT_PUBLIC_" to the start of the key name
    echo "${key}=${value}" >> .env
    key="NEXT_PUBLIC_${key}"
    #
    # Output the key and value to the .env file
    echo "${key}=${value}" >> .env
  done
}

main "$@"