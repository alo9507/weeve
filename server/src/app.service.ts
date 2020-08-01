import { Injectable } from '@nestjs/common';
import { Discussion, JoinDiscussionBody, JoinDiscussionResponse } from "./models/discussion";
const { v4: uuidv4 } = require('uuid');
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {

  constructor(
      private readonly databaseService: DatabaseService
  ) {
  }

  async storeDiscussion(disc: Discussion) {
    await this.databaseService.discussions.insert(disc);
    return;
  }

  getDiscussionData(): Discussion {
    let disc = new Discussion();
    disc.topic = "sample topic";
    disc.discussionID = "randomID";
    disc.startTime = new Date();
    return disc;
  }

  joinDiscussion(disc: JoinDiscussionBody): JoinDiscussionResponse {
    console.log("Service Discussion", disc);
    if (disc.userID == '' || disc.userID == undefined) {
      disc.userID = uuidv4()
    }
    let dd0 = new Discussion();
    dd0.topic = "sample topic";
    dd0.discussionID = disc.discussionID;
    dd0.startTime = new Date();
    let dd = new JoinDiscussionResponse();
    dd.discussion = dd0;
    dd.userID = disc.userID;
    dd.roomID = 'roomUUID';
    return dd;
  }

}
