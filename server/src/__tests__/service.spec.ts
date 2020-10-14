import {UserRoomMapping} from "../models/discussion";

const roomUtils = require("../utils/roomUtils");

describe('Service Tests', () => {

    const roomUtilsInstance = new roomUtils.RoomUtils();

    describe('UserRoomMapping Generator', () => {
        it('correctly generates a map of UUIDs according to participant count and room configuration', () => {
            const users = ["user1", "user2", "user3"];
            const participantCountToRoomId = roomUtilsInstance.participantCountToRoomIdGenerator(users.length);
            expect(participantCountToRoomId.length).toEqual(4);
            expect(participantCountToRoomId[0].participantCount).toEqual(1);
            expect(participantCountToRoomId[1].participantCount).toEqual(1);
            expect(participantCountToRoomId[2].participantCount).toEqual(1);
            expect(participantCountToRoomId[3].participantCount).toEqual(3);
        });

        it('correctly creates room configurations based on participant count', () => {
            let one = [1];
            let two = [1, 1, 2];
            let three = [1, 1, 1, 3];
            let four = [1, 1, 1, 1, 2, 2, 4];
            let five = [1, 1, 1, 1, 1, 2, 3, 5];
            let six = [1, 1, 1, 1, 1, 1, 2, 2, 2, 6];
            let seven = [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 7];
            let eight = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 8];
            let nine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4, 5, 9];
            let ten = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 4, 6, 10];
            let fifteen = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 4, 4, 7, 15];

            expect(roomUtilsInstance.roomConfigurationGenerator(1)).toEqual(one);
            expect(roomUtilsInstance.roomConfigurationGenerator(2)).toEqual(two);
            expect(roomUtilsInstance.roomConfigurationGenerator(3)).toEqual(three);
            expect(roomUtilsInstance.roomConfigurationGenerator(4)).toEqual(four);
            expect(roomUtilsInstance.roomConfigurationGenerator(5)).toEqual(five);
            expect(roomUtilsInstance.roomConfigurationGenerator(6)).toEqual(six);
            expect(roomUtilsInstance.roomConfigurationGenerator(7)).toEqual(seven);
            expect(roomUtilsInstance.roomConfigurationGenerator(8)).toEqual(eight);
            expect(roomUtilsInstance.roomConfigurationGenerator(9)).toEqual(nine);
            expect(roomUtilsInstance.roomConfigurationGenerator(10)).toEqual(ten);
            expect(roomUtilsInstance.roomConfigurationGenerator(15)).toEqual(fifteen);
        });

        it('correctly generates user to room maps for three participants', () => {
            const threeUsers = ["user1", "user2", "user3"];
            const actualUserRoomMap = roomUtilsInstance.userMapGenerator(threeUsers);

            expect(actualUserRoomMap["user1"].stages.length).toEqual(2);
            expect(actualUserRoomMap["user2"].stages.length).toEqual(2);
            expect(actualUserRoomMap["user3"].stages.length).toEqual(2);

            expect(actualUserRoomMap["user1"].stages.filter(value => actualUserRoomMap["user2"].stages.includes(value)).length).toEqual(1);
            expect(actualUserRoomMap["user2"].stages.filter(value => actualUserRoomMap["user3"].stages.includes(value)).length).toEqual(1);
            expect(actualUserRoomMap["user1"].stages.filter(value => actualUserRoomMap["user3"].stages.includes(value)).length).toEqual(1);
        });

        it('correctly generates user to room maps for four participants', () => {
            const fourUsers = ["user1", "user2", "user3", "user4"];
            const actualUserRoomMap = roomUtilsInstance.userMapGenerator(fourUsers);

            expect(actualUserRoomMap["user1"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user2"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user3"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user4"].stages.length).toEqual(3);
        });

        it('correctly generates user to room maps for five participants', () => {
            const fiveUsers = ["user1", "user2", "user3", "user4", "user5"];
            const actualUserRoomMap = roomUtilsInstance.userMapGenerator(fiveUsers);

            expect(actualUserRoomMap["user1"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user2"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user3"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user4"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user5"].stages.length).toEqual(3);
        });

        it('correctly generates user to room maps for six participants', () => {
            const sixUsers = ["user1", "user2", "user3", "user4", "user5", "user6"];
            const actualUserRoomMap = roomUtilsInstance.userMapGenerator(sixUsers);

            expect(actualUserRoomMap["user1"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user2"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user3"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user4"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user5"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user6"].stages.length).toEqual(3);
        });

        it('correctly generates user to room maps for seven participants', () => {
            const sevenUsers = ["user1", "user2", "user3", "user4", "user5", "user6", "user7"];
            const actualUserRoomMap = roomUtilsInstance.userMapGenerator(sevenUsers);

            expect(actualUserRoomMap["user1"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user2"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user3"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user4"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user5"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user6"].stages.length).toEqual(3);
            expect(actualUserRoomMap["user7"].stages.length).toEqual(3);
        });

        it('correctly generates user to room maps for eight participants', () => {
            const eightUsers = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8"];
            const actualUserRoomMap = roomUtilsInstance.userMapGenerator(eightUsers);

            expect(actualUserRoomMap["user1"].stages.length).toEqual(4);
            expect(actualUserRoomMap["user2"].stages.length).toEqual(4);
            expect(actualUserRoomMap["user3"].stages.length).toEqual(4);
            expect(actualUserRoomMap["user4"].stages.length).toEqual(4);
            expect(actualUserRoomMap["user5"].stages.length).toEqual(4);
            expect(actualUserRoomMap["user6"].stages.length).toEqual(4);
            expect(actualUserRoomMap["user7"].stages.length).toEqual(4);
            expect(actualUserRoomMap["user8"].stages.length).toEqual(4);
        });

        it('correctly matches user to rooms for eight participants', () => {
            const eightUsers = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8"];
            const actualUserRoomMap = roomUtilsInstance.userMapGenerator(eightUsers);

            // Checking room pairs draw
            expect(actualUserRoomMap["user1"].stages[1]).toEqual(actualUserRoomMap["user2"].stages[1]);
            expect(actualUserRoomMap["user3"].stages[1]).toEqual(actualUserRoomMap["user4"].stages[1]);
            expect(actualUserRoomMap["user5"].stages[1]).toEqual(actualUserRoomMap["user6"].stages[1]);
            expect(actualUserRoomMap["user7"].stages[1]).toEqual(actualUserRoomMap["user8"].stages[1]);

            // Checking stage 3 match
            expect(actualUserRoomMap["user1"].stages[2]).toEqual(actualUserRoomMap["user3"].stages[2]);
            expect(actualUserRoomMap["user2"].stages[2]).toEqual(actualUserRoomMap["user4"].stages[2]);
            expect(actualUserRoomMap["user5"].stages[2]).toEqual(actualUserRoomMap["user7"].stages[2]);
            expect(actualUserRoomMap["user6"].stages[2]).toEqual(actualUserRoomMap["user8"].stages[2]);

            // Check All stage match
            expect(actualUserRoomMap["user1"].stages[3]).toEqual(actualUserRoomMap["user2"].stages[3]);
            expect(actualUserRoomMap["user2"].stages[3]).toEqual(actualUserRoomMap["user3"].stages[3]);
            expect(actualUserRoomMap["user3"].stages[3]).toEqual(actualUserRoomMap["user4"].stages[3]);
            expect(actualUserRoomMap["user4"].stages[3]).toEqual(actualUserRoomMap["user5"].stages[3]);
            expect(actualUserRoomMap["user5"].stages[3]).toEqual(actualUserRoomMap["user6"].stages[3]);
            expect(actualUserRoomMap["user6"].stages[3]).toEqual(actualUserRoomMap["user7"].stages[3]);
            expect(actualUserRoomMap["user7"].stages[3]).toEqual(actualUserRoomMap["user8"].stages[3]);

        });

        it('correctly matches user to rooms for nine participants', () => {
            const nineUsers = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9"];
            const actualUserRoomMap = roomUtilsInstance.userMapGenerator(nineUsers);

            // Checking room pairs draw
            // Room 1
            expect(actualUserRoomMap["user1"].stages[1]).toEqual(actualUserRoomMap["user2"].stages[1]);
            expect(actualUserRoomMap["user2"].stages[1]).toEqual(actualUserRoomMap["user3"].stages[1]);
            // Room 2
            expect(actualUserRoomMap["user4"].stages[1]).toEqual(actualUserRoomMap["user5"].stages[1]);
            // Room 3
            expect(actualUserRoomMap["user6"].stages[1]).toEqual(actualUserRoomMap["user7"].stages[1]);
            // Room 4
            expect(actualUserRoomMap["user8"].stages[1]).toEqual(actualUserRoomMap["user9"].stages[1]);

            // Checking stage 3 match
            // Room 1
            expect(actualUserRoomMap["user1"].stages[2]).toEqual(actualUserRoomMap["user2"].stages[2]);
            expect(actualUserRoomMap["user2"].stages[2]).toEqual(actualUserRoomMap["user3"].stages[2]);
            expect(actualUserRoomMap["user3"].stages[2]).toEqual(actualUserRoomMap["user4"].stages[2]);
            expect(actualUserRoomMap["user4"].stages[2]).toEqual(actualUserRoomMap["user5"].stages[2]);
            // Room 2
            expect(actualUserRoomMap["user6"].stages[2]).toEqual(actualUserRoomMap["user7"].stages[2]);
            expect(actualUserRoomMap["user7"].stages[2]).toEqual(actualUserRoomMap["user8"].stages[2]);
            expect(actualUserRoomMap["user8"].stages[2]).toEqual(actualUserRoomMap["user9"].stages[2]);

            // Check All stage match
            expect(actualUserRoomMap["user1"].stages[3]).toEqual(actualUserRoomMap["user2"].stages[3]);
            expect(actualUserRoomMap["user2"].stages[3]).toEqual(actualUserRoomMap["user3"].stages[3]);
            expect(actualUserRoomMap["user3"].stages[3]).toEqual(actualUserRoomMap["user4"].stages[3]);
            expect(actualUserRoomMap["user4"].stages[3]).toEqual(actualUserRoomMap["user5"].stages[3]);
            expect(actualUserRoomMap["user5"].stages[3]).toEqual(actualUserRoomMap["user6"].stages[3]);
            expect(actualUserRoomMap["user6"].stages[3]).toEqual(actualUserRoomMap["user7"].stages[3]);
            expect(actualUserRoomMap["user7"].stages[3]).toEqual(actualUserRoomMap["user8"].stages[3]);
            expect(actualUserRoomMap["user8"].stages[3]).toEqual(actualUserRoomMap["user9"].stages[3]);
        })
    });
});
