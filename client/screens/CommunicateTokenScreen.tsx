import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';

export const CommunicateTokenScreen = 'CommunicateTokenScreen';
export default function CommunicateToken() {
  const [webViewRef, setWebRef] = useState<WebView | null>();
  // Using the reference
  webViewRef?.injectJavaScript('console.log(window)');

  // Listening to navigation events
  const handleWebViewNavigationStateChange = (
    newNavState: WebViewNavigation,
  ) => {
    console.log('NAV STATE: ', newNavState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>This WebView have a cookie</Text>
        <Text style={styles.pageQuestion}>Can you eat it?!</Text>
      </View>
      <WebView
        ref={ref => setWebRef(ref)}
        // @ts-ignore - this is a mistyping in react-native-webview
        style={styles.webViewFrame}
        source={{uri: 'http://localhost:3000'}}
        onError={error => console.log('WebView ERROR: ', error)}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        sharedCookiesEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 50,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  pageTitle: {
    fontSize: 20,
  },
  pageQuestion: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  webViewFrame: {
    borderWidth: 3,
    borderColor: 'teal',
    borderRadius: 10,
    width: Dimensions.get('window').width - 2,
  },
});
