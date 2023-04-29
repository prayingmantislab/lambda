// ------------ NodeJS runtime ---------------
// Add aws-sdk in package.json as a dependency
// Example:
// {
//     "dependencies": {
//         "aws-sdk": "^2.0.9",
//     }
// }
// Create your credentials file at ~/.aws/credentials (C:\Users\USER_NAME\.aws\credentials for Windows users)
// Format of the above file should be:
//  [default]
// aws_access_key_id = AKIAXN5SNWRN52IONUVG;
// aws_secret_access_key = gYJgq3t + CC0LBlbAKwQXJNFIg1wfYZNdUoWiCaS3;

const AWS = require('aws-sdk');

// Create the DynamoDB Client with the region you want
const region = 'eu-central-1';

// Call DynamoDB's query API
// executeQuery(dynamoDbClient, queryInput).then(() => {
//   console.info('Query API call has been executed.');
// });

//@ts-ignore
function createDynamoDbClient(regionName) {
  // Set the region
  AWS.config.update({ region: regionName });
  // Use the following config instead when using DynamoDB local
  // AWS.config.update({region: 'localhost', endpoint: 'http://localhost:8000', accessKeyId: 'access_key_id', secretAccessKey: 'secret_access_key'});
  return new AWS.DynamoDB();
}

export function createQueryInput() {
  const today = new Date();
  const threeWeeksFromNow = new Date(
    today.getTime() + 21 * 24 * 60 * 60 * 1000
  );
  const threeWeeksFromNowString = threeWeeksFromNow.toISOString().split('T')[0];

  return {
    TableName: 'Event-24thrzunffebpnrydmsfe2nbwi-dev',
    ScanIndexForward: true,
    IndexName: 'date-index',
    KeyConditionExpression: '#e9270 = :e9270',
    ExpressionAttributeValues: {
      ':e9270': {
        S: threeWeeksFromNowString,
      },
    },
    ExpressionAttributeNames: {
      '#e9270': 'date',
    },
  };
}

// Handles errors during Query execution. Use recommendations in error messages below to
// add error handling specific to your application use-case.
//@ts-ignore
function handleQueryError(err) {
  if (!err) {
    console.error('Encountered error object was empty');
    return;
  }
  if (!err.code) {
    console.error(
      `An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(
        err
      )}`
    );
    return;
  }
  // here are no API specific errors to handle for Query, common DynamoDB API errors are handled below
  handleCommonErrors(err);
}

//@ts-ignore
function handleCommonErrors(err) {
  switch (err.code) {
    case 'InternalServerError':
      console.error(
        `Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`
      );
      return;
    case 'ProvisionedThroughputExceededException':
      console.error(
        `Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. ` +
          `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`
      );
      return;
    case 'ResourceNotFoundException':
      console.error(
        `One of the tables was not found, verify table exists before retrying. Error: ${err.message}`
      );
      return;
    case 'ServiceUnavailable':
      console.error(
        `Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`
      );
      return;
    case 'ThrottlingException':
      console.error(
        `Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`
      );
      return;
    case 'UnrecognizedClientException':
      console.error(
        `The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. ` +
          `Error: ${err.message}`
      );
      return;
    case 'ValidationException':
      console.error(
        `The input fails to satisfy the constraints specified by DynamoDB, ` +
          `fix input before retrying. Error: ${err.message}`
      );
      return;
    case 'RequestLimitExceeded':
      console.error(
        `Throughput exceeds the current throughput limit for your account, ` +
          `increase account level throughput before retrying. Error: ${err.message}`
      );
      return;
    default:
      console.error(
        `An exception occurred, investigate and configure retry strategy. Error: ${err.message}`
      );
      return;
  }
}

//@ts-ignore
export async function executeQuery(dynamoDbClient, queryInput) {
  // Call DynamoDB's query API
  try {
    const queryOutput = await dynamoDbClient.query(queryInput).promise();
    console.info('Query successful.');
    return queryOutput;
    // Handle queryOutput
  } catch (err) {
    handleQueryError(err);
  }
}

export async function getDbClient() {
  const dynamoDbClient = await createDynamoDbClient(region);

  return dynamoDbClient;
}
