import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // const [splashComplete, setSplashComplete] = useState(false);
  return (
    <>
      <StatusBar hidden />
      <Redirect href={'/(auth)/sign-in'} />
    </>
  );
}
