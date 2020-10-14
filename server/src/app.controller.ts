import {Controller, Get, HttpStatus, Post, Res, Body, Param} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import {JoinDiscussionBody, Discussion} from "./models/discussion";

@Controller('discussions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getDiscussion(@Param() params, @Res() res: Response) {
    let dd = await this.appService.getDiscussionData(params.id);
    return res.status(HttpStatus.OK).json(dd);
  }

  @Post()
  async createDiscussion(@Body() discussion: Discussion, @Res() res: Response) {
    const newDiscussion = await this.appService.storeDiscussion(discussion);
    return res.status(HttpStatus.OK).json(newDiscussion)
  }

  @Post('/join')
  async joinDiscussion(@Body() joinDiscussion: JoinDiscussionBody, @Res() res: Response) {
    let dd = await this.appService.joinDiscussion(joinDiscussion);
    return res.status(HttpStatus.OK).json(dd);
  }

  @Post('/nextRoom')
  async calculateNextRoom(@Body() joinDiscussion: JoinDiscussionBody, @Res() res: Response) {
    let dd = await this.appService.calculateNextRoom(joinDiscussion.userID, joinDiscussion.discussionID);
    return res.status(HttpStatus.OK).json(dd);
  }

}
