const { v4: uuidv4 } = require('uuid');
/**
 * @param  {Array[string]} users all of the users in this discussion
 */
const userMapGenerator = (users) => {
    const participantCountToRoomId = participantCountToRoomIdGenerator(users.length)
    const userRoomMap = {}
    let userPool = [...users]

    // The offset tracks the upper bound on
    let offset = users.length

    // Where to begin taking entries from
    let startingPoint = 0

    var iterationCount = 0

    while (offset > 0) {
        while (iterationCount < offset) {
            let entry = participantCountToRoomId[startingPoint + iterationCount]

            for (let j = 0; j < entry.participantCount; j++) {
                const user = userPool.pop()

                // initialize the roomId array for user if it's the first run
                if (userRoomMap[user] == undefined) {
                    userRoomMap[user] = []
                }

                userRoomMap[user].push(entry.roomId)
            }
            iterationCount += 1
        }
        // Our new starting point will be equal to the previous starting point plus the PREVIOUS offset
        startingPoint = startingPoint + offset

        // The offset calculation here takes advantage of a numeric quirk in how our rooms divide each time to account for both even and odd participant counts
        // 4 participants: [1,1,1,1,2,2,4] -> first 4, then 2, then 1
        // 5 participants: [1,1,1,1,1,2,3,5] -> first 5, then 2, then 1
        // 7 participants: [1,1,1,1,1,1,1,2,2,3,7] -> first 7, then 3, then 1
        // 8 participants: [1,1,1,1,1,1,1,1,2,2,2,2,4,4,8] -> first 8, then 4, then 2, then 1
        offset = Math.floor(offset / 2)

        // reset the iteration count
        iterationCount = 0

        // reset the user pool stack for the next round of room assignments
        userPool = [...users]
    }

    return userRoomMap
}

/**
 * @param  {number} discussionCount the number of TOTAL users in the discussion
 */
const roomConfigurationGenerator = (discussionCount) => {
    // Init with 1st stage
    let rooms = Array(discussionCount).fill(1);
    if (discussionCount < 2) {
        return rooms;
    }

    let isEven = (discussionCount%2 === 0);

    // Fill 2nd stage
    let roomNumber = Math.floor(discussionCount/2);
    rooms = [...rooms, ...Array(roomNumber).fill(2)];
    if (!isEven) {
        rooms[rooms.length-1] = 3;
    }
    if (discussionCount < 4) {
        return rooms;
    }

    // Fill 3rd stage
    roomNumber = Math.floor(discussionCount/4);
    rooms = [...rooms, ...Array(roomNumber).fill(4)];
    rooms[rooms.length-1] = (4 + discussionCount%4);
    if (discussionCount < 8) {
        return rooms
    }

    // Fill 4th stage
    rooms.push(discussionCount);

    return rooms;
}

/**
 * @param  {number} discussionCount  the number of TOTAL users in the discussion
 * participantCountToRoomIdGenerator outputs an array of small dictionaries in the form:
 * { participantCount: 2, roomId: "myUniqueId" }
 * Each entry is used later to know how many users to stick into that room
 */
const participantCountToRoomIdGenerator = (discussionCount) => {
    const roomConfiguration = roomConfigurationGenerator(discussionCount)

    const participantCountToRoomId = []

    roomConfiguration.forEach(participantCount => {
        const entry = {"participantCount": participantCount, "roomId": uuidv4()}
        participantCountToRoomId.push(entry)
    })

    return participantCountToRoomId
}

const UserMapGenerator = module.exports = userMapGenerator
UserMapGenerator.participantCountToRoomIdGenerator = participantCountToRoomIdGenerator
UserMapGenerator.roomConfigurationGenerator = roomConfigurationGenerator
