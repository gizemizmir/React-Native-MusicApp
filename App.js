import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import MainStackNavigation from "./src/navigation/mainStackNavigation";
import { store } from "./src/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MainStackNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
