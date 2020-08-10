import {Injectable, NotFoundException, ForbiddenException} from '@nestjs/common';
import {Discussion, JoinDiscussionBody, DiscussionResponse, UserRoomMapping} from "./models/discussion";
const { v4: uuidv4 } = require('uuid');
import { DatabaseService } from './database/database.service';

const MIN_PARTICIPANTS: number = 8;

@Injectable()
export class AppService {

  constructor(
      private readonly databaseService: DatabaseService
  ) {
  }

  async storeDiscussion(disc: Discussion) {
    let discFound = await this.databaseService.discussions.findOne({
      discussionID: disc.discussionID
    });

    if (discFound && !discFound.started) {
      await this.databaseService.discussions.updateById(discFound._id, disc);
    } else {
      await this.databaseService.discussions.insert(disc);
    }
    return;
  }

  async getDiscussionData(id: string): Promise<Discussion> {
    let discFound = await this.databaseService.discussions.findOne({
      discussionID: id
    });
    if (!discFound) throw new NotFoundException('Discussion not found');

    return discFound;
  }

  async joinDiscussion(disc: JoinDiscussionBody): Promise<DiscussionResponse> {
    if (disc.userID == '' || disc.userID == undefined) {
      disc.userID = uuidv4();
    }
    let discFound = await this.getDiscussionData(disc.discussionID);

    if (!discFound.users) {
      discFound.users = []
    }
    if (!this.stringInList(discFound.users, disc.userID)) {
        discFound.users.push(disc.userID);
        await this.databaseService.discussions.updateById(discFound._id, discFound);
    }

    let jdr = new DiscussionResponse();
    jdr.discussion = discFound;
    jdr.userID = disc.userID;
    jdr.roomID = await this.findRoomForUser(disc.userID, discFound);

    return jdr;
  }

  async calculateNextRoom(userID: string, discID: string): Promise<DiscussionResponse> {
    //lock
    let discFound = await this.getDiscussionData(discID);

    if (!this.stringInList(discFound.users, userID)) {
      throw new ForbiddenException('User not allowed');
    }

    if (!discFound.started) {
      discFound.userRoomMapping = this.generateRooms(userID, discFound);
      discFound.currentStage = 0;
      discFound.started = true;
      await this.databaseService.discussions.updateById(discFound._id, discFound);
    }

    // Move to next stage?
    if ((discFound.startTime.valueOf() + this.calculateNextStageOffset(discFound)) >= Date.now() && (discFound.stagesDuration.length <= discFound.currentStage+1)) {
      discFound.currentStage += 1;
      await this.databaseService.discussions.updateById(discFound._id, discFound);
    }

    let jdr = new DiscussionResponse();
    jdr.discussion = discFound;
    jdr.userID = userID;
    jdr.roomID = this.findRoomForUser(userID, discFound);

    //unlock
    return jdr
  }

  calculateNextStageOffset(disc: Discussion): number {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalMin = disc.stagesDuration.slice(0, disc.currentStage+1).reduce(reducer);
    return totalMin * 60000 // convert minutes to milliseconds
  }


  generateRooms(userID:string, disc: Discussion): UserRoomMapping[] {
    let roomMappings = [];
    let roomMappingsMap = new Map<string, UserRoomMapping>();

    // Setup stage ONE "rooms"
    disc.users.forEach(function (item) {
      let mapping = new UserRoomMapping();
      mapping.stages = [];
      mapping.stages.push(uuidv4());
      mapping.userID = item;

      roomMappingsMap.set(item, mapping);
    });

    // Setup stage TWO rooms
    let paired: number[] = [];
    let stage2Pairs: number[][]  = [];
    for (let i = 0; i < disc.users.length/2; i++) {
      let pair0 = this.generateRandomAllowedNumber(paired, disc.users.length);
      paired.push(pair0);
      let pair1 = this.generateRandomAllowedNumber(paired, disc.users.length);
      paired.push(pair1);
      let roomID = uuidv4();
      roomMappingsMap.get(disc.users[pair0]).stages.push(roomID);
      roomMappingsMap.get(disc.users[pair1]).stages.push(roomID);
      stage2Pairs.push([pair0, pair1])
    }

    // Setup stage FOUR "rooms"
    paired = [];
    for (let i = 0; i < stage2Pairs.length/2; i++) {
      let pair0 = this.generateRandomAllowedNumber(paired, stage2Pairs.length);
      paired.push(pair0);
      let pair1 = this.generateRandomAllowedNumber(paired, stage2Pairs.length);
      paired.push(pair1);
      let roomID = uuidv4();
      let set0 = stage2Pairs[pair0];
      let set1 = stage2Pairs[pair1];
      roomMappingsMap.get(disc.users[set0[0]]).stages.push(roomID);
      roomMappingsMap.get(disc.users[set0[1]]).stages.push(roomID);
      roomMappingsMap.get(disc.users[set1[0]]).stages.push(roomID);
      roomMappingsMap.get(disc.users[set1[1]]).stages.push(roomID);
    }

    // Setup ALL "room"
    disc.users.forEach(function (item) {
      let roomID = uuidv4();
      roomMappingsMap.get(item).stages.push(roomID);
    });
    
    return roomMappings;

  }

  generateRandomAllowedNumber(list: number[], sampleSize: number): number {
    let f: number;
    while(true) {
      f = Math.floor(Math.random() * sampleSize);
      if (list.indexOf(f) == -1) {
        return f;
      }
    }

  }
  findRoomForUser(userID: string, disc: Discussion): string {
    let roomFound = 'lobbyUUID';
    let mapping = disc.userRoomMapping.find(elem => (elem.userID == userID));
    return mapping?.stages[disc.currentStage] ? mapping?.stages[disc.currentStage] : roomFound
  }

  // move to utils pkg
  stringInList(list: string[], value: string): boolean {
    return list.indexOf(value) != -1;
  }

}
