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
  async storeDiscussion(@Body() discussion: Discussion, @Res() res: Response) {
    await this.appService.storeDiscussion(discussion);
    return res.status(HttpStatus.OK).send();
  }

  @Post('/join')
  async joinDiscussion(@Body() joinDiscussion: JoinDiscussionBody, @Res() res: Response) {
    let dd = await this.appService.joinDiscussion(joinDiscussion);
    return res.status(HttpStatus.OK).json(dd);
  }
}
