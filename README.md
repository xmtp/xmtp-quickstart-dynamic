# XMTP Dynamic

![xmtp](https://github.com/xmtp/xmtp-quickstart-reactjs/assets/1447073/3f2979ec-4d13-4c3d-bf20-deab3b2ffaa1)

## Installation

```bash
yarn install
yarn dev
```

## Concepts

Head to our docs to understand XMTP's concepts

- [Get started](https://xmtp.org/docs/build/get-started/overview?sdk=react)
- [Authentication](https://xmtp.org/docs/build/authentication?sdk=react)
- [Conversations](https://xmtp.org/docs/build/conversations?sdk=react)
- [Messages](https://xmtp.org/docs/build/messages/?sdk=react)
- [Streams](https://xmtp.org/docs/build/streams/?sdk=react)

#### Troubleshooting

If you get into issues with `Buffer` and `polyfills` check out the fix below:

- [Check out Buffer issue](https://github.com/xmtp/xmtp-js/issues/487)

## Dynamic

### Setup

First, you need to import the necessary libraries and components. In your index.js file, import the `DynamicProvider` and wrap your main component with it.

```jsx
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
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

### User authentication

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
  // Get the internal wallet client from the primary wallet's connector
  const internalWalletClient = await primaryWallet.connector.getWalletClient();
  // Create a new wallet client with the chain, transport, and account from the internal wallet client
  const walletClient = createWalletClient({
    chain: internalWalletClient.chain,
    transport: custom(internalWalletClient.transport),
    account: primaryWallet.address,
  });
  // Set the signer to the new wallet client
  setSigner(walletClient);
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
