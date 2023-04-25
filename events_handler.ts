const usersWithEvents = [];
/// ALL THIS SHOULD BE INSIDE LABMDA that will be triggered everyday
//1. query the db for relavent events record
//2. create usersWithEvents
//3. for every usersWithEvents  send push with relavent events message

//TODO: connection for db

interface Events {
  id: number;
  title: string;
  recipient;
}
function getRelevantDbEvents() {
  //db.connect
  //db.getAll({})
  return [];
}

function handlePushNotifications() {
  //1. query the db for relevant events record

  const dbEvents = getRelevantDbEvents();
  //2. create usersWithEvents
  //3. for every usersWithEvents  send push with relavent events message
}

handlePushNotifications();
