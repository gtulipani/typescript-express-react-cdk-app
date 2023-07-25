import {Stack, StackProps} from 'aws-cdk-lib';
import {AttributeType, Table} from 'aws-cdk-lib/aws-dynamodb'
import {DockerImageAsset} from 'aws-cdk-lib/aws-ecr-assets'
import {ContainerImage} from 'aws-cdk-lib/aws-ecs'
import {ApplicationLoadBalancedFargateService} from 'aws-cdk-lib/aws-ecs-patterns'
import {ManagedPolicy, PolicyDocument, PolicyStatement, Role, ServicePrincipal} from 'aws-cdk-lib/aws-iam'

import {Construct} from 'constructs';

import {join} from 'path'

import { AWS_ACCOUNT_ID, AWS_REGION, DB_TABLE, PORT} from './consts'

export class CompleteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DynamoDB table for the counter
    const table = new Table(this, 'Table', {
      tableName: 'State',
      partitionKey: {name: 'id', type: AttributeType.STRING},
    });

    // Policy to access DynamoDB State table
    const readWriteAccessToStateDynamoDBTablePolicyDocument = new PolicyDocument({
      statements: [
        new PolicyStatement({
          resources: [`arn:aws:dynamodb:us-east-1:${AWS_ACCOUNT_ID}:table/${DB_TABLE}`],
          actions: ['dynamodb:GetItem', 'dynamodb:PutItem'],
        }),
      ],
    });

    // IAM Role that will be able to communicate with DynamoDB table
    const taskRole = new Role(this, 'ECSFargateServiceExecutionRole', {
      assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com'),
      description: 'Role that will be used by the ECS Fargate Service to consume the required cloud services',
      inlinePolicies: {
        'DynamoDBTablePermissions': readWriteAccessToStateDynamoDBTablePolicyDocument,
      },
      // This is the minimum policy required for working as a Fargate Container IAM Task Role
      managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy')],
    });

    // Docker image we'll use
    const image = new DockerImageAsset(this, "BackendImage", {
      directory: join(__dirname, "..", ".."),
    });

    // Application Load Balancer
    const loadBalancedFargateService = new ApplicationLoadBalancedFargateService(this, 'Service', {
      memoryLimitMiB: 512,
      cpu: 256,
      publicLoadBalancer: true,
      taskImageOptions: {
        image: ContainerImage.fromDockerImageAsset(image),
        containerPort: PORT,
        environment: {
          AWS_REGION: AWS_REGION,
          DB_TABLE: DB_TABLE,
          PORT: String(PORT),
        },
        taskRole
      },
    });

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: '/health',
    });
  }
}
