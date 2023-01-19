import { INetworkSummary } from "../_network/i-network-summary.dto";
import { INetworkUser } from "../_network/i-network-user.dto";

export const apiNetworkUserResponse =
{
  "userName": "follower 1",
  "avatar": "https://img.icons8.com/color/96/000000/user.png",
  "isFollowing": true,
  "isOwnProfile": false
};

export const fakeNetworkUserModel: INetworkUser = {
  userName: 'follower 1',
  avatar: 'https://img.icons8.com/color/96/000000/user.png',
  isFollowing: true,
  isOwnProfile: false
};

export const apiNetworkUserArrayResponse = [
  {
    "userName": "follower 1",
    "avatar": "https://img.icons8.com/color/96/000000/user.png",
    "isFollowing": true,
    "isOwnProfile": false
  },
  {
    "userName": "follower 2",
    "avatar": "https://img.icons8.com/color/96/000000/user.png",
    "isFollowing": true,
    "isOwnProfile": false
  }
];

export const fakeNetworkUserModelArray: INetworkUser[] = [
  {
    userName: 'follower 1',
    avatar: 'https://img.icons8.com/color/96/000000/user.png',
    isFollowing: true,
    isOwnProfile: false
  },
  {
    userName: 'follower 2',
    avatar: 'https://img.icons8.com/color/96/000000/user.png',
    isFollowing: true,
    isOwnProfile: false
  }
];

export const apiNetworkSummaryResponse = {
  "followersCount": 5,
  "followingCount": 7
}

export const fakeNetworkSummary: INetworkSummary = {
  followersCount: 5,
  followingCount: 7
}