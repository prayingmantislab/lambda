const usersWithEvents = [];
/// ALL THIS SHOULD BE INSIDE LABMDA that will be triggered everyday
//2. create usersWithEvents
//3. for every usersWithEvents  send push with relavent events message

//TODO: connection for db

interface DBEvent {
  id: number;
  userSub: string;
  title: string;
}

//TODO: implement
function createEventJson(event: DBEvent) {
  const APPLICATION_ID = 'asdfasdfasdfadf';

  return {
    title: `${event.title} yada yad yad`,
    token: '',
    message: '',
    service: '',
  };
}

function handlePushNotifications() {
  //1. query the db for all events
  const dbEvents = getAllDbEvents();
  dbEvents.forEach((event) => {
    //const token = getTokenByUserid(event.userId)
    // if (isEventShouldBeSent(event)) {
    //   const eventJson = createEventJson(event, token);
    //   sendPush(eventJson);
    // }
  });
  //3. for every usersWithEvents  send push with relavent events message
}

handlePushNotifications();
