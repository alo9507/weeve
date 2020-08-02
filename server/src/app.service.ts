import {Injectable, NotFoundException} from '@nestjs/common';
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
    let discFound = await this.databaseService.discussions.findOne({
      discussionID: disc.discussionID
    });

    if (discFound) {
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

  async joinDiscussion(disc: JoinDiscussionBody): Promise<JoinDiscussionResponse> {
    if (disc.userID == '' || disc.userID == undefined) {
      disc.userID = uuidv4();
    }
    let discFound = await this.databaseService.discussions.findOne({
      discussionID: disc.discussionID
    });
    if (!discFound) throw new NotFoundException('Discussion not found');

    if (!discFound.users) {
      discFound.users = []
    }
    if (!this.stringInList(discFound.users, disc.userID)) {
        discFound.users.push(disc.userID);
        await this.databaseService.discussions.updateById(discFound._id, discFound);
    }

    let jdr = new JoinDiscussionResponse();
    jdr.discussion = discFound;
    jdr.userID = disc.userID;
    if (discFound.ready) {
      jdr.roomID = 'roomUUID';
    }

    return jdr;
  }

  // move to utils pkg
  stringInList(list: string[], value: string): boolean {
    return list.indexOf(value) != -1;
  }

}
