# XMTP PWA with Dynamic Tutorial

This tutorial will guide you through the process of creating an XMTP app with Dynamic.

### Installation

```bash
bun install
bun start
```

<details >
  <summary><h4>Troubleshooting</h4></summary>

If you are experiencing package issues you can install Craco and this is `craco.config.js`

```jsx
const path = require("path");
const webpack = require("webpack");

module.exports = {
  webpack: {
    alias: {
      "date-fns/min": path.resolve(__dirname, "node_modules/date-fns/index.js"),
      "date-fns/subSeconds": path.resolve(
        __dirname,
        "node_modules/date-fns/index.js"
      ),
      "date-fns/isAfter": path.resolve(
        __dirname,
        "node_modules/date-fns/index.js"
      ),
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        buffer: require.resolve("buffer/"),
      },
    },
  },
};
```

</details>

### Step 1: Setup

First, you need to import the necessary libraries and components. In your index.js file, import the `DynamicProvider` from @Dynamic-io/react-auth and wrap your main component with it.

```jsx
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum-all";
```

```jsx
<DynamicContextProvider
  settings={{
    environmentId: "f0b977d0-b712-49f1-af89-2a24c47674da",
    walletConnectors: [EthereumWalletConnectors],
  }}
>
  <InboxPage />
</DynamicProvider>
```

### Step 2: User Authentication

In your main component, use the `useDynamicContext` hook to get the user's authentication status and other details.

```jsx
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

const [signer, setSigner] = useState(null);
// Use the DynamicContext to get the primaryWallet and handleLogOut function
const { primaryWallet, handleLogOut } = useDynamicContext();
// Check if the primaryWallet is connected
const isConnected = !!primaryWallet;
// Define a function to get and set the signer
const getAndSetSigner = async () => {
  // Get the signer from the primaryWallet's connector
  const signer = await primaryWallet.connector.getSigner();
  // Set the signer
  setSigner(signer);
};
// Use an effect to get and set the signer when the primaryWallet changes
useEffect(() => {
  // If there is a primaryWallet and no signer, get and set the signer
  if (primaryWallet && !signer) {
    getAndSetSigner();
  }
  // If there is no primaryWallet and there is a signer, set the signer to null
  else if (!primaryWallet && signer) {
    setSigner(null);
  }
}, [primaryWallet]);
```

### Step 3: XMTP Integration

In your `Home` component, use the `useClient` hook from `@xmtp/react-sdk` to get the XMTP client.

```jsx
import { Client, useClient } from "@xmtp/react-sdk";
await initialize({ keys, options, signer });
```

### Step 4: Message Handling

In your `MessageContainer` component, use the `useMessages` and `useSendMessage` hooks from `@xmtp/react-sdk` to get the messages and send messages.

```jsx
const { messages, isLoading } = useMessages(conversation);
const { sendMessage } = useSendMessage();
```

### Step 5: Conversation Handling

In your ListConversations component, use the useConversations and useStreamConversations hooks from @xmtp/react-sdk to get the conversations and stream new conversations.

```jsx
const { conversations } = useConversations();
const { error } = useStreamConversations(onConversation);
```

That's it! You've now created an XMTP app with Dynamic.
