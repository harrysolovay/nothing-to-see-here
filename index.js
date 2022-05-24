import * as smoldot from "@substrate/smoldot-light";
import fs from "fs";
import * as C from "the-temporary-super-secret-name";

// Create a client factory (to-be reused for instantiating multiple clients for different chains)
const Client = C.smoldotRpcClientFactory(smoldot.start);

// Create a client for Polkadot
const client = await Client(fs.readFileSync(new URL("./polkadot-spec.json", import.meta.url).pathname, "utf8"));

// Start listening to chain head messages
const stopListening = C.subscribe(client, "chain_subscribeAllHeads", [], (messages) => {
  console.log(messages);
});

// Stop listening after 30 seconds
setTimeout(async () => {
  await stopListening();
}, 1000 * 30);
