// Third party modules
import { firestore } from 'firebase-admin';

// DashboardHub imports
import { GitHubEventModel } from './event.mapper';
import { GitHubContributorModel } from './index.mapper';
import { GitHubIssueModel } from './issue.mapper';
import { GitHubPullRequestModel } from './pullRequest.mapper';
import { GitHubReleaseModel } from './release.mapper';

export interface GitHubRepositoryInput {
  id: string;
  uid: string;
  name?: string;
  full_name?: string;
  description?: string;
  url: string;
  private: boolean;
  fork: string;
}

export interface GitHubRepositoryModel {
  id: string;
  uid: string;
  fullName?: string;
  description?: string;
  url: string;
  private: boolean;
  fork: string;
  pullRequests?: GitHubPullRequestModel[];
  events?: GitHubEventModel[];
  releases?: GitHubReleaseModel[];
  issues?: GitHubIssueModel[];
  contributors?: GitHubContributorModel[];
  updatedAt: firestore.Timestamp;
}

export class GitHubRepositoryMapper {
  static fullNameToUid(fullName: string) {
    return fullName.replace('/', '+');
  }

  static import(input: GitHubRepositoryInput, type: 'minimum' | 'all' | 'event' = 'minimum'): GitHubRepositoryModel {
    const output: any = {};

    if (type === 'all') {
        output.fork = input.fork;
    }

    if (type === 'event' || type === 'all') {
        output.id = input.id;
        output.fullName = input.name;
        output.url = input.url;
    }

    if (type === 'minimum' || type === 'all') {
        output.uid = GitHubRepositoryMapper.fullNameToUid(input.full_name);
        output.fullName = input.full_name;
        output.description = input.description;
        output.private = input.private;
    }

    return output;
  }
}
