export class Discussion {
    _id: string;
    topic: string = '';
    startTime: Date = null;
    discussionID: string = '';
    users: string[] = [];
    defaultRoom: string;
    userRoomMapping?: UserRoomMapping[] = [];
    stagesDuration: number[] = [];
    currentStage: number;
    started: boolean = false;
}

export class UserRoomMapping {
    userID: string = '';
    stages: string[] = [];
}

export class JoinDiscussionBody {
    discussionID?: string = '';
    userID?: string = '';
}

export class DiscussionResponse {
    userID?: string = '';
    discussion?: Discussion;
    roomID?: string = '';
}
