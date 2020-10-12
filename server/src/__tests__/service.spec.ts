const UserMapGenerator = require("../utils/UserMapGenerator")

describe('Service Tests', () => {
    describe('UserRoomMapping Generator', () => {
      it('correctly generates a map of UUIDs according to participant count and room configuration', () => {
        const users = ["user1", "user2", "user3"]
        const participantCountToRoomId = UserMapGenerator.uuidGenerator(users.length)
        expect(participantCountToRoomId.length).toEqual(4)
        expect(participantCountToRoomId[0].participantCount).toEqual(1)
        expect(participantCountToRoomId[1].participantCount).toEqual(1)
        expect(participantCountToRoomId[2].participantCount).toEqual(1)
        expect(participantCountToRoomId[3].participantCount).toEqual(3)
      });

      it('correctly masks uuids to room configurations', () => {
        let two = [1,1,2]
        let three = [1,1,1,3]
        let four = [1,1,1,1,2,2,4]
        let five = [1,1,1,1,1,2,3,5]
        let six = [1,1,1,1,1,1,2,2,2,6]
        let seven = [1,1,1,1,1,1,1,2,2,3,7]
        let eight = [1,1,1,1,1,1,1,1,2,2,2,2,4,4,8]
        let nine = [1,1,1,1,1,1,1,1,1,2,2,2,3,4,5,9]

        expect(UserMapGenerator.uuidMask(2)).toEqual(two)
        expect(UserMapGenerator.uuidMask(3)).toEqual(three)
        expect(UserMapGenerator.uuidMask(4)).toEqual(four)
        expect(UserMapGenerator.uuidMask(5)).toEqual(five)
        expect(UserMapGenerator.uuidMask(6)).toEqual(six)
        expect(UserMapGenerator.uuidMask(7)).toEqual(seven)
        expect(UserMapGenerator.uuidMask(8)).toEqual(eight)
      })

      it('correctly generates user to room maps for three participants', () => {
        const threeUsers = ["user1", "user2", "user3"]
        const actualUserRoomMap = UserMapGenerator(threeUsers)

        expect(actualUserRoomMap["user1"].length).toEqual(2)
        expect(actualUserRoomMap["user2"].length).toEqual(2)
        expect(actualUserRoomMap["user3"].length).toEqual(2)

        expect(actualUserRoomMap["user1"].filter(value => actualUserRoomMap["user2"].includes(value)).length).toEqual(1)
        expect(actualUserRoomMap["user2"].filter(value => actualUserRoomMap["user3"].includes(value)).length).toEqual(1)
        expect(actualUserRoomMap["user1"].filter(value => actualUserRoomMap["user3"].includes(value)).length).toEqual(1)
      })

      it('correctly generates user to room maps for four participants', () => {
        const fourUsers = ["user1", "user2", "user3", "user4"]
        const actualUserRoomMap = UserMapGenerator(fourUsers)

        expect(actualUserRoomMap["user1"].length).toEqual(3)
        expect(actualUserRoomMap["user2"].length).toEqual(3)
        expect(actualUserRoomMap["user3"].length).toEqual(3)
        expect(actualUserRoomMap["user4"].length).toEqual(3)
      })

      it('correctly generates user to room maps for five participants', () => {
        const fiveUsers = ["user1", "user2", "user3", "user4", "user5"]
        const actualUserRoomMap = UserMapGenerator(fiveUsers)

        expect(actualUserRoomMap["user1"].length).toEqual(3)
        expect(actualUserRoomMap["user2"].length).toEqual(3)
        expect(actualUserRoomMap["user3"].length).toEqual(3)
        expect(actualUserRoomMap["user4"].length).toEqual(3)
        expect(actualUserRoomMap["user5"].length).toEqual(3)
      })

      it('correctly generates user to room maps for six participants', () => {
        const sixUsers = ["user1", "user2", "user3", "user4", "user5", "user6"]
        const actualUserRoomMap = UserMapGenerator(sixUsers)

        expect(actualUserRoomMap["user1"].length).toEqual(3)
        expect(actualUserRoomMap["user2"].length).toEqual(3)
        expect(actualUserRoomMap["user3"].length).toEqual(3)
        expect(actualUserRoomMap["user4"].length).toEqual(3)
        expect(actualUserRoomMap["user5"].length).toEqual(3)
        expect(actualUserRoomMap["user6"].length).toEqual(3)
      })

      it('correctly generates user to room maps for seven participants', () => {
        const sevenUsers = ["user1", "user2", "user3", "user4", "user5", "user6", "user7"]
        const actualUserRoomMap = UserMapGenerator(sevenUsers)

        expect(actualUserRoomMap["user1"].length).toEqual(3)
        expect(actualUserRoomMap["user2"].length).toEqual(3)
        expect(actualUserRoomMap["user3"].length).toEqual(3)
        expect(actualUserRoomMap["user4"].length).toEqual(3)
        expect(actualUserRoomMap["user5"].length).toEqual(3)
        expect(actualUserRoomMap["user6"].length).toEqual(3)
        expect(actualUserRoomMap["user7"].length).toEqual(3)
      })

      it('correctly generates user to room maps for eight participants', () => {
        const eightUsers = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8"]
        const actualUserRoomMap = UserMapGenerator(eightUsers)

        expect(actualUserRoomMap["user1"].length).toEqual(4)
        expect(actualUserRoomMap["user2"].length).toEqual(4)
        expect(actualUserRoomMap["user3"].length).toEqual(4)
        expect(actualUserRoomMap["user4"].length).toEqual(4)
        expect(actualUserRoomMap["user5"].length).toEqual(4)
        expect(actualUserRoomMap["user6"].length).toEqual(4)
        expect(actualUserRoomMap["user7"].length).toEqual(4)
        expect(actualUserRoomMap["user8"].length).toEqual(4)
      })
    });
  });
  