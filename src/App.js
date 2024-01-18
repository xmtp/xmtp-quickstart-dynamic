import { useEffect, useState } from "react";
import InboxPage from "./InboxPage-hooks";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function App({}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <DynamicContextProvider
          settings={{
            environmentId: "f0b977d0-b712-49f1-af89-2a24c47674da",
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <InboxPage />
        </DynamicContextProvider>
      ) : null}
    </>
  );
}
