var usersWithEvents = [];
function getRelevantDbEvents() {
    //db.connect
    //db.getAll({})
    return [];
}
function handlePushNotifications() {
    //1. query the db for relevant events record
    var dbEvents = getRelevantDbEvents();
    //2. create usersWithEvents
    //3. for every usersWithEvents  send push with relavent events message
}
handlePushNotifications();
