import { Box, Paragraph } from "@contentful/f36-components"; //https://f36.contentful.com/
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit"; //@contentful/react-apps-toolkit
import React, { useCallback, useEffect, useState } from "react";

const ConfigScreen = () => {
  const [parameters, setParameters] = useState({});
  const sdk = useSDK();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();
    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters = await sdk.app.getParameters(); //https://www.contentful.com/developers/docs/extensibility/app-framework/sdk/#configuration-of-an-extension-with-parameters

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <Box padding="spacingM" marginTop="spacingL">
      <Paragraph>Here you can add app configuration</Paragraph>
    </Box>
  );
};
export default ConfigScreen;
