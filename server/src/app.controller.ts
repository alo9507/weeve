import {Controller, Get, HttpStatus, Post, Res, Body} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import {JoinDiscussionBody, Discussion} from "./models/discussion";

@Controller('discussions')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDiscussion(@Res() res: Response) {
    let dd = this.appService.getDiscussionData();
    return res.status(HttpStatus.OK).json(dd);
  }

  @Post()
  storeDiscussion(@Body() discussion: Discussion, @Res() res: Response) {
    this.appService.storeDiscussion(discussion);
    return res.status(HttpStatus.OK).send();
  }

  @Post('/join')
  joinDiscussion(@Body() joinDiscussion: JoinDiscussionBody, @Res() res: Response) {
    let dd = this.appService.joinDiscussion(joinDiscussion);
    return res.status(HttpStatus.OK).json(dd);
  }
}
