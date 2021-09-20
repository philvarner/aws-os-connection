import { ClientOptions } from '@opensearch-project/opensearch';
import { Credentials } from 'aws-sdk/global';
export declare function createAWSConnection(awsCredentials: Credentials): ClientOptions;
export declare const awsGetCredentials: () => Promise<Credentials>;
