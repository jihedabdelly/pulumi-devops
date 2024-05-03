import pulumi from "@pulumi/pulumi";
import aws from "@pulumi/aws";


type FmBucketArgs = {
    Name: string,
    Product: string
}

class FmBucket extends pulumi.ComponentResource {
    constructor(args: FmBucketArgs, opts: pulumi.ComponentResourceOptions) {
        const resourceName = `${args.Product}-${args.Name}`
        super("pkg:index:FmBucket", resourceName, {}, opts);

        const bucket = new aws.s3.Bucket(args.Name, {
            bucket: resourceName,
            acl: aws.s3.CannedAcl.Private,
            tags: {
                Environment: "Dev",
                Name: resourceName,
            },
        });
    }

    
}

