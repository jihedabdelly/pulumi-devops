import { getStack, ComponentResource, ComponentResourceOptions } from "@pulumi/pulumi";
import { s3 } from "@pulumi/aws";


type FmBucketArgs = {
    Name: string,
    Product: string,
    Public?: boolean,
}

export default class FmBucket extends ComponentResource {
    constructor(args: FmBucketArgs, opts?: ComponentResourceOptions) {
        const resourceName = `${args.Product}-${args.Name}`
        super("pkg:index:FmBucket", resourceName, {}, opts);

        const stack = getStack();

        const bucketName = `${resourceName}-${stack}`;

        let bucketArgs: s3.BucketArgs = {
            bucket: bucketName,
            acl: s3.CannedAcl.Private,
            tags: {
                Environment: stack,
            },
        };

        if (args.Public) {
            bucketArgs.acl = s3.CannedAcl.PublicRead,
            bucketArgs.website = {
                indexDocument: "index.html",
                errorDocument: "error.html",
                routingRules: `[{
                    "Condition": {
                        "KeyPrefixEquals": "docs/"
                    },
                    "Redirect": {
                        "ReplaceKeyPrefixWith": "documents/"
                    }
                }]`,
            }
        }

        const bucket = new s3.Bucket(args.Name, bucketArgs, {
            parent: this
        });

        if (!args.Public) {
            new s3.BucketPublicAccessBlock(args.Name, {
                bucket: bucket.id,
                blockPublicAcls: true,
                blockPublicPolicy: true,
                ignorePublicAcls: true,
                restrictPublicBuckets: true,
            }, {
                parent: this
            });
        }

        
    }

    
}