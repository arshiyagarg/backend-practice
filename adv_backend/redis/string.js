const client = require("./client")

async function init() {
    const data = await client.get("aimodel:1");
    console.log(data);
}

init()