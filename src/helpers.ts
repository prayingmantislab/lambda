//TODO: implement

import { createQueryInput, executeQuery, getDbClient } from './db';

//gets the events for the next 3 weeks
export async function getAllDbEvents() {
  const dynamoDbClient = await getDbClient();
  const queryInput = createQueryInput();
  const result = await executeQuery(dynamoDbClient, queryInput);
  return result.Items;
}

function isEventShouldBeSent(event: never) {
  throw new Error('Function not implemented.');
}
function sendPush(event: never) {
  throw new Error('Function not implemented.');
}
