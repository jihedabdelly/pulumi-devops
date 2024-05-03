import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import FmBucket from "./resources/bucket";

new FmBucket({
    Name: "example",
    Product: "devops-with-pulumi"
})