import {act} from "react-dom/test-utils";

const UserMapGenerator = require("../utils/UserMapGenerator")

describe('Service Tests', () => {

    describe('UserRoomMapping Generator', () => {
      it('correctly generates a map of UUIDs according to participant count and room configuration', () => {
        const users = ["user1", "user2", "user3"]
        const participantCountToRoomId = UserMapGenerator.participantCountToRoomIdGenerator(users.length)
        expect(participantCountToRoomId.length).toEqual(4)
        expect(participantCountToRoomId[0].participantCount).toEqual(1)
        expect(participantCountToRoomId[1].participantCount).toEqual(1)
        expect(participantCountToRoomId[2].participantCount).toEqual(1)
        expect(participantCountToRoomId[3].participantCount).toEqual(3)
      });

      it('correctly creates room configurations based on participant count', () => {
        let one = [1]
        let two = [1,1,2]
        let three = [1,1,1,3]
        let four = [1,1,1,1,2,2,4]
        let five = [1,1,1,1,1,2,3,5]
        let six = [1,1,1,1,1,1,2,2,2,6]
        let seven = [1,1,1,1,1,1,1,2,2,3,7]
        let eight = [1,1,1,1,1,1,1,1,2,2,2,2,4,4,8]
        let nine = [1,1,1,1,1,1,1,1,1,2,2,2,3,4,5,9]
        let ten = [1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,4,6,10]
        let fifteen = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,4,4,7,15]

        expect(UserMapGenerator.roomConfigurationGenerator(1)).toEqual(one)
        expect(UserMapGenerator.roomConfigurationGenerator(2)).toEqual(two)
        expect(UserMapGenerator.roomConfigurationGenerator(3)).toEqual(three)
        expect(UserMapGenerator.roomConfigurationGenerator(4)).toEqual(four)
        expect(UserMapGenerator.roomConfigurationGenerator(5)).toEqual(five)
        expect(UserMapGenerator.roomConfigurationGenerator(6)).toEqual(six)
        expect(UserMapGenerator.roomConfigurationGenerator(7)).toEqual(seven)
        expect(UserMapGenerator.roomConfigurationGenerator(8)).toEqual(eight)
        expect(UserMapGenerator.roomConfigurationGenerator(9)).toEqual(nine)
        expect(UserMapGenerator.roomConfigurationGenerator(10)).toEqual(ten)
        expect(UserMapGenerator.roomConfigurationGenerator(15)).toEqual(fifteen)
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

      it('correctly matches user to rooms for eight participants', () => {
        const eightUsers = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8"]
        const actualUserRoomMap = UserMapGenerator(eightUsers)

        // Checking room pairs draw
        expect(actualUserRoomMap["user1"][1]).toEqual(actualUserRoomMap["user2"][1]);
        expect(actualUserRoomMap["user3"][1]).toEqual(actualUserRoomMap["user4"][1]);
        expect(actualUserRoomMap["user5"][1]).toEqual(actualUserRoomMap["user6"][1]);
        expect(actualUserRoomMap["user7"][1]).toEqual(actualUserRoomMap["user8"][1]);

        // Checking stage 3 match
        expect(actualUserRoomMap["user1"][2]).toEqual(actualUserRoomMap["user3"][2]);
        expect(actualUserRoomMap["user2"][2]).toEqual(actualUserRoomMap["user4"][2]);
        expect(actualUserRoomMap["user5"][2]).toEqual(actualUserRoomMap["user7"][2]);
        expect(actualUserRoomMap["user6"][2]).toEqual(actualUserRoomMap["user8"][2]);

        // Check All stage match
        expect(actualUserRoomMap["user1"][3]).toEqual(actualUserRoomMap["user2"][3]);
        expect(actualUserRoomMap["user2"][3]).toEqual(actualUserRoomMap["user3"][3]);
        expect(actualUserRoomMap["user3"][3]).toEqual(actualUserRoomMap["user4"][3]);
        expect(actualUserRoomMap["user4"][3]).toEqual(actualUserRoomMap["user5"][3]);
        expect(actualUserRoomMap["user5"][3]).toEqual(actualUserRoomMap["user6"][3]);
        expect(actualUserRoomMap["user6"][3]).toEqual(actualUserRoomMap["user7"][3]);
        expect(actualUserRoomMap["user7"][3]).toEqual(actualUserRoomMap["user8"][3]);

      })

      it('correctly matches user to rooms for nine participants', () => {
        const nineUsers = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9"]
        const actualUserRoomMap = UserMapGenerator(nineUsers)

        // Checking room pairs draw
        // Room 1
        expect(actualUserRoomMap["user1"][1]).toEqual(actualUserRoomMap["user2"][1]);
        expect(actualUserRoomMap["user2"][1]).toEqual(actualUserRoomMap["user3"][1]);
        // Room 2
        expect(actualUserRoomMap["user4"][1]).toEqual(actualUserRoomMap["user5"][1]);
        // Room 3
        expect(actualUserRoomMap["user6"][1]).toEqual(actualUserRoomMap["user7"][1]);
        // Room 4
        expect(actualUserRoomMap["user8"][1]).toEqual(actualUserRoomMap["user9"][1]);

        // Checking stage 3 match
        // Room 1
        expect(actualUserRoomMap["user1"][2]).toEqual(actualUserRoomMap["user2"][2]);
        expect(actualUserRoomMap["user2"][2]).toEqual(actualUserRoomMap["user3"][2]);
        expect(actualUserRoomMap["user3"][2]).toEqual(actualUserRoomMap["user4"][2]);
        expect(actualUserRoomMap["user4"][2]).toEqual(actualUserRoomMap["user5"][2]);
        // Room 2
        expect(actualUserRoomMap["user6"][2]).toEqual(actualUserRoomMap["user7"][2]);
        expect(actualUserRoomMap["user7"][2]).toEqual(actualUserRoomMap["user8"][2]);
        expect(actualUserRoomMap["user8"][2]).toEqual(actualUserRoomMap["user9"][2]);

        // Check All stage match
        expect(actualUserRoomMap["user1"][3]).toEqual(actualUserRoomMap["user2"][3]);
        expect(actualUserRoomMap["user2"][3]).toEqual(actualUserRoomMap["user3"][3]);
        expect(actualUserRoomMap["user3"][3]).toEqual(actualUserRoomMap["user4"][3]);
        expect(actualUserRoomMap["user4"][3]).toEqual(actualUserRoomMap["user5"][3]);
        expect(actualUserRoomMap["user5"][3]).toEqual(actualUserRoomMap["user6"][3]);
        expect(actualUserRoomMap["user6"][3]).toEqual(actualUserRoomMap["user7"][3]);
        expect(actualUserRoomMap["user7"][3]).toEqual(actualUserRoomMap["user8"][3]);
        expect(actualUserRoomMap["user8"][3]).toEqual(actualUserRoomMap["user9"][3]);
      })
    });
  });
