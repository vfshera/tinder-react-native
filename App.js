import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { StateProvider } from "./hooks/appState";
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
