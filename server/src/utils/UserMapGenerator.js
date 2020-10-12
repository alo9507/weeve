const { start } = require('repl');
const { v4: uuidv4 } = require('uuid');

const userMapGenerator = (users) => {
    const participantCountToRoomId = uuidGenerator(users.length)
    const userRoomMap = {}
    let userPool = [...users]
    let offset = users.length
    let startingPoint = 0
    var iterationCount = 0

    while (offset > 0) {
        while (iterationCount < offset) {
            let entry = participantCountToRoomId[startingPoint + iterationCount]

            var j;
            for (j = 0; j < entry.participantCount; j++) {
                const user = userPool.pop()

                if (userRoomMap[user] == undefined) {
                    userRoomMap[user] = []
                }

                userRoomMap[user].push(entry.roomId)
            }
            iterationCount+=1
        }
        startingPoint = startingPoint + offset
        offset = Math.floor(offset / 2)
        iterationCount = 0
        userPool = [...users]
    }
    console.log(userRoomMap)

    return userRoomMap
}

const uuidMask = (participantCount) => {
    switch (participantCount) {
        case 2: return [1,1,2]
        case 3: return [1,1,1,3]
        case 4: return [1,1,1,1,2,2,4]
        case 5: return [1,1,1,1,1,2,3,5]
        case 6: return [1,1,1,1,1,1,2,2,2,6]
        case 7: return [1,1,1,1,1,1,1,2,2,3,7]
        case 8: return [1,1,1,1,1,1,1,1,2,2,2,2,4,4,8]
        default: throw new Error("Too few users")
    }
}

const uuidGenerator = (participantCount) => {
    const myUuidMask = uuidMask(participantCount)

    const participantCountToRoomId = []

    myUuidMask.forEach(roomCount => {
        const entry = {"participantCount": roomCount, "roomId": uuidv4()}
        participantCountToRoomId.push(entry)
    })

    return participantCountToRoomId
}

const UserMapGenerator = module.exports = userMapGenerator
UserMapGenerator.uuidGenerator = uuidGenerator
UserMapGenerator.uuidMask = uuidMask