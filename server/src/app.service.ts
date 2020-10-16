import {Injectable, NotFoundException, ForbiddenException, BadRequestException} from '@nestjs/common';
import {Discussion, JoinDiscussionBody, DiscussionResponse, UserRoomMapping} from "./models/discussion";
const { v4: uuidv4 } = require('uuid');
const roomUtils = require("./utils/roomUtils");
import { DatabaseService } from './database/database.service';

const MIN_PARTICIPANTS: number = 2;

@Injectable()
export class AppService {

  constructor(
      private readonly databaseService: DatabaseService
  ) {
  }

  async storeDiscussion(disc: Discussion) {
    if (!disc.discussionID) {
      disc.discussionID = uuidv4();
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
      throw new ForbiddenException(`User ${userID} not allowed authorized to enter discussion ${discFound.discussionID}`);
    }

    if (!discFound.started) {
      if (discFound.users.length < MIN_PARTICIPANTS) {
        throw new BadRequestException("MIN_PARTICIPANTS not met: "+discFound.users.length+"/"+MIN_PARTICIPANTS);
      }
      const roomUtilsInstance = new roomUtils.RoomUtils();
      const umg = roomUtilsInstance.userMapGenerator(discFound.users);
      // Convert to array to store in DB
      discFound.userRoomMapping = Array.from(umg.values());
      console.log("user room mapping", discFound.userRoomMapping);
      discFound.currentStage = 0;
      discFound.started = true;
      await this.databaseService.discussions.updateById(discFound._id, discFound);
    }

    // Move to next stage?
    console.log(Date.now());
    let nn: number = discFound.startTime.valueOf() + 10;
    console.log(nn);

    const currentStageTime = (discFound.startTime.valueOf() + this.calculateNextStageOffset(discFound));

    if (currentStageTime >= Date.now() && (discFound.stagesDuration.length <= discFound.currentStage+1)) {
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
    // return mapping?.stages[disc.currentStage] ? : roomFound
    return mapping?.stages[disc.currentStage] ? mapping?.stages[disc.currentStage] : roomFound
  }

  // move to utils pkg
  stringInList(list: string[], value: string): boolean {
    return list.indexOf(value) != -1;
  }

}
