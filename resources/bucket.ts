import pulumi from "@pulumi/pulumi";
import aws from "@pulumi/aws";


type FmBucketArgs = {
    Name: string,
    Product: string
}

class FmBucket extends pulumi.ComponentResource {
    constructor(args: FmBucketArgs, opts: pulumi.ComponentResourceOptions) {
        const name = `${args.Product}-${args.Name}`
        super("pkg:index:FmBucket", name, {}, opts);

        const b = new aws.s3.Bucket("b", {
            bucket: "my-tf-test-bucket",
            acl: aws.s3.CannedAcl.Private,
            tags: {
                Name: "My bucket",
                Environment: "Dev",
            },
        });
    }

    
}

