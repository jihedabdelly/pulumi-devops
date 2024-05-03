import pulumi, { getStack } from "@pulumi/pulumi";
import aws from "@pulumi/aws";


type FmBucketArgs = {
    Name: string,
    Product: string
}

class FmBucket extends pulumi.ComponentResource {
    constructor(args: FmBucketArgs, opts: pulumi.ComponentResourceOptions) {
        const resourceName = `${args.Product}-${args.Name}`
        super("pkg:index:FmBucket", resourceName, {}, opts);

        const stack = getStack();

        const bucketName = `${resourceName}-${stack}`

        const bucket = new aws.s3.Bucket(args.Name, {
            bucket: bucketName,
            acl: aws.s3.CannedAcl.Private,
            tags: {
                Environment: stack,
            },
        });

        new aws.s3.BucketPublicAccessBlock(args.Name, {
            bucket: bucket.id,
            blockPublicAcls: true,
            blockPublicPolicy: true,
            ignorePublicAcls: true,
            restrictPublicBuckets: true,
        });
    }

    
}

