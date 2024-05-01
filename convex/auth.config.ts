
// TODO: put in env file
const hostname = "https://allowing-chipmunk-76.clerk.accounts.dev"
const authConfig = {
    providers: [
        {
            domain: hostname,
            applicationID: "convex",
        },
    ]
}

export default authConfig;