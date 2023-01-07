sam build
sam package --output-template-file packaged.yaml --s3-bucket gitlab-codebucket --region eu-west-2
sam deploy --no-fail-on-empty-changeset --template-file packaged.yaml --stack-name ecs-cluster --s3-bucket gitlab-codebucket --capabilities CAPABILITY_NAMED_IAM --region eu-west-2