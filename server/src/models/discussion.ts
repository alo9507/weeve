export class Discussion {
    _id?: string;
    topic: string = '';
    startTime: Date = null;
    discussionID?: string = '';
    users?: string[];
    ready: boolean = false;
}

export class JoinDiscussionBody {
    discussionID?: string = '';
    userID?: string = '';
}

export class JoinDiscussionResponse {
    userID?: string = '';
    discussion?: Discussion;
    roomID?: string = '';
}
