export class CreatePostPayload {
    CommunityName?: string;
    url?: string;
    description: string;
    city : string[];
    country : string[];
    stateOrProvince : string[];
}