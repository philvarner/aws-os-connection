# AWS ES Connection

AWS ES connection for the new OpenSearch client (@opensearch-project/opensearch)

Thanks to [ChristopherGillis](https://github.com/ChristopherGillis) and as well as the contributors to the [Acuris version](https://github.com/mergermarket/acuris-aws-es-connection) of this library. I've simply added an action to release this updated OpenSearch version to NPM. I'll continue to maintain this as needed, though hopefully AWS intergrates this directly into their client at some point.

PRs/Issues welcome.


## Installation

Just add this library with your favorite Node package manager. Examples below.

`aws-sdk` and `@opensearch-project/opensearch` are required peer dependencies for this library to function, so make sure you have both of those installed.

```bash
yarn add aws-os-connection aws-sdk @opensearch-project/opensearch

# or

npm install aws-os-connection aws-sdk @opensearch-project/opensearch
```

## Usage

Javascript:

```js
const { Client } = require('@opensearch-project/opensearch')
const { createAWSConnection, awsGetCredentials } = require('aws-os-connection')

const awsCredentials = await awsGetCredentials()
const AWSConnection = createAWSConnection(awsCredentials)
const client = new Client({
  ...AWSConnection,
  node: 'https://node-name.eu-west-1.es.amazonaws.com'
})

// inside async func
await client.cat.help()
```

Typescript:

```ts
import { createAWSConnection, awsGetCredentials } from 'aws-os-connection'
import AWS from 'aws-sdk'
import { Client } from '@opensearch-project/opensearch'

const awsCredentials = await awsGetCredentials()
const AWSConnection = createAWSConnection(awsCredentials)
const client = new Client({
  ...AWSConnection,
  node: 'https://node-name.eu-west-1.es.amazonaws.com'
})

// inside async func
await client.cat.help()
```

## How does it work?

This package creates a Connection class that signs the requests to AWS OpenSearch and a Transport class that checks that the AWS credentials haven't expired before every call, and refreshes them when needed.

## Developer notes

### Running the tests

Make sure that your AWS credentials are available to your env, for example you could set them in your ENV.

You need a running AWS ES instance for the tests to run against. Set the endpoint URL as the env `AWS_ES_ENDPOINT`.

```bash
AWS_ES_ENDPOINT=https://xxxx.es.amazonaws.com yarn test
```

### Tested versions

This package has been tested on versions of the official OpenSearch client up to 2.0.0.
