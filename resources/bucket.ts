import pulumi from "@pulumi/pulumi";

class FmBucket extends pulumi.ComponentResource {
    constructor(name: string, opts: pulumi.ComponentResourceOptions) {
        super("pkg:index:FmBucket", name, {}, opts);
    }
}

