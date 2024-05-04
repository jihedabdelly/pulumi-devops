import FmBucket from "./resources/bucket";

const bucketList: string[] = [
    "example-1",
    "example-2"
]

for(const bucket in bucketList) {
    new FmBucket({
        Name: bucket,
        Product: "devops-with-pulumi"
    })
}


