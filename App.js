import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/StackNavigator";
import { StateProvider } from "./src/hooks/appState";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <StateProvider>
        <StackNavigator />
      </StateProvider>
    </NavigationContainer>
  );
}
