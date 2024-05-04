import { ComponentResource, ComponentResourceOptions } from "@pulumi/pulumi";
import FmBucket from "../resources/bucket";

type FmFrontendArgs = {
    Name: string,
    Product: string
}

export default class FmFrontend extends ComponentResource {
    constructor(args: FmFrontendArgs, opts?: ComponentResourceOptions) {
        const resourceName = `${args.Product}-${args.Name}`
        super("pkg:index:FmFrontend", resourceName, {}, opts);

        const source = new FmBucket({
            Name: args.Name,
            Product: args.Product
        }, {
            parent: this
        })
    }
}