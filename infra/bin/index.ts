#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import {CompleteStack} from '../lib/stack';

const app = new cdk.App();
const stackProps = {
  env: {
    region: process.env.AWS_REGION,
    account: process.env.AWS_ACCOUNT_ID,
  },
};

new CompleteStack(app, 'CompleteStack', stackProps);
