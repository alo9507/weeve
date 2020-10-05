import {Injectable, NotFoundException, ForbiddenException, BadRequestException} from '@nestjs/common';
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
    if (!disc.discussionID) {
      disc.discussionID = uuidv4();
      console.log("disc.discussionId", disc.discussionID)
    }

    if (!disc.defaultRoom) {
      disc.defaultRoom = uuidv4();
    }

    if (!disc.startTime) {
      throw new BadRequestException('startTime is required');
    }

    let discFound = await this.databaseService.discussions.findOne({
      discussionID: disc.discussionID
    });

    if (discFound && !discFound.started) {
      await this.databaseService.discussions.updateById(discFound._id, disc);
    } else {
      await this.databaseService.discussions.insert(disc);
    }
    console.log("discussion: ", disc)
    return disc;
  }

  async getDiscussionData(id: string): Promise<Discussion> {
    let discFound = await this.getDiscussionDataInternal(id);
    discFound.userRoomMapping = undefined; //empty mappings to be returned
    return discFound;
  }

  async getDiscussionDataInternal(id: string): Promise<Discussion> {
    let discFound = await this.databaseService.discussions.findOne({
      discussionID: id
    });
    if (!discFound) throw new NotFoundException('Discussion not found');

    return discFound;
  }

  async joinDiscussion(disc: JoinDiscussionBody): Promise<DiscussionResponse> {
    if (disc.userID == '' || disc.userID == undefined || disc.userID == "undefined") {
      disc.userID = uuidv4();
    }
    let discFound = await this.getDiscussionDataInternal(disc.discussionID);

    if (!discFound.users) {
      discFound.users = []
    }
    if (!this.stringInList(discFound.users, disc.userID) && !discFound.started) {
        discFound.users.push(disc.userID);
        await this.databaseService.discussions.updateById(discFound._id, discFound);
    }

    let jdr = new DiscussionResponse();
    jdr.roomID = await this.findRoomForUser(disc.userID, discFound);
    discFound.userRoomMapping = undefined; //empty mappings to be returned
    jdr.discussion = discFound;
    jdr.userID = disc.userID;

    return jdr;
  }

  async calculateNextRoom(userID: string, discID: string): Promise<DiscussionResponse> {
    //lock
    let discFound = await this.getDiscussionData(discID);

    if (!this.stringInList(discFound.users, userID)) {
      throw new ForbiddenException('User not allowed');
    }

    if (!discFound.started) {
      if (discFound.users.length < MIN_PARTICIPANTS) {
        throw new BadRequestException("MIN_PARTICIPANTS not met: "+discFound.users.length+"/"+MIN_PARTICIPANTS);
      }
      discFound.userRoomMapping = this.generateRooms(userID, discFound);
      discFound.currentStage = 0;
      discFound.started = true;
      await this.databaseService.discussions.updateById(discFound._id, discFound);
    }

    // Move to next stage?
    console.log(Date.now());
    let nn: number = discFound.startTime.valueOf() + 10;
    console.log(nn);

    if ((discFound.startTime.valueOf() + this.calculateNextStageOffset(discFound)) >= Date.now() && (discFound.stagesDuration.length <= discFound.currentStage+1)) {
      discFound.currentStage += 1;
      await this.databaseService.discussions.updateById(discFound._id, discFound);
    }

    let jdr = new DiscussionResponse();
    jdr.roomID = this.findRoomForUser(userID, discFound);
    discFound.userRoomMapping = undefined; //empty mappings to be returned
    jdr.discussion = discFound;
    jdr.userID = userID;

    //unlock
    return jdr
  }

  calculateNextStageOffset(disc: Discussion): number {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalMin = disc.stagesDuration.slice(0, disc.currentStage+1).reduce(reducer);
    console.log(totalMin);
    return totalMin * 60000 // convert minutes to milliseconds
  }


  generateRooms(userID:string, disc: Discussion): UserRoomMapping[] {
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
    let roomID = uuidv4();
    disc.users.forEach(function (item) {
      roomMappingsMap.get(item).stages.push(roomID);
    });

    return Array.from(roomMappingsMap.values());

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
    let roomFound = disc.defaultRoom;
    let mapping = disc.userRoomMapping?.find(elem => (elem.userID == userID));
    return mapping?.stages[disc.currentStage] ? mapping?.stages[disc.currentStage] : roomFound
  }

  // move to utils pkg
  stringInList(list: string[], value: string): boolean {
    return list.indexOf(value) != -1;
  }

}
