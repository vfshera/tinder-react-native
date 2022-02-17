import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { StateProvider } from "./hooks/appState";

export default function App() {
  return (
    <NavigationContainer>
      <StateProvider>
        <StackNavigator />
      </StateProvider>
    </NavigationContainer>
  );
}
