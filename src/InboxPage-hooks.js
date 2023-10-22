import React, { useEffect, useState } from "react";
import { FloatingInbox } from "./FloatingInbox-hooks";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";

const InboxPage = () => {
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

  const [loggingOut, setLoggingOut] = useState(false); // Add this line
  // Define a function to handle logout
  const handleLogout = async () => {
    // Set loggingOut to true when logout begins
    setLoggingOut(true);
    // Call the handleLogOut function from the DynamicContext
    await handleLogOut();
    // Set loggingOut to false when logout ends
    setLoggingOut(false);
  };

  const isPWA = true;
  const styles = {
    uContainer: {
      height: "100vh",
      backgroundColor: "#f9f9f9",
      borderRadius: isPWA == true ? "0px" : "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    xmtpContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    btnXmtp: {
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#000",
      justifyContent: "center",
      border: "1px solid grey",
      padding: isPWA == true ? "20px" : "10px",
      borderRadius: "5px",
      fontSize: isPWA == true ? "20px" : "14px", // Increased font size
    },
  };

  return (
    <div style={styles.uContainer}>
      {!signer && (
        <div style={styles.xmtpContainer}>
          <DynamicWidget />
        </div>
      )}
      {signer && (
        <FloatingInbox isPWA={isPWA} wallet={signer} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default InboxPage;
