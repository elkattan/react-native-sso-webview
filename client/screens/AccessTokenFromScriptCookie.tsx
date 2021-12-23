import CookieManager from '@react-native-cookies/cookies';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';

const INIT_URL = 'http://localhost:3000/script-cookie';

export const AccessTokenFromScriptCookieScreen =
  'AccessTokenFromScriptCookieScreen';
export default function AccessTokenFromScriptCookie() {
  const [webViewRef, setWebRef] = useState<WebView | null>();
  const [currentURL, setCurrentURL] = useState(INIT_URL);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    CookieManager.clearAll(true).then(() => {
      console.log(
        '✅ CookieManager.clearAll() - Cleared cookies to prevent false positives',
      );
    });
  }, []);

  // Listening to navigation events
  const handleWebViewNavigationStateChange = (
    newNavState: WebViewNavigation,
  ) => {
    if (newNavState.url !== currentURL) {
      // Checking URL can take place here
      setCurrentURL(newNavState.url);
    }

    // Checking token exists
    CookieManager.getAll(true).then(cookies => {
      if (cookies.auth) {
        setToken(cookies.auth.value);
        console.log(
          '✅ CookieManager.getAll() - Got token: ',
          JSON.stringify(cookies.auth || {}, null, 2),
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>This WebView have a cookie</Text>
        <Text style={styles.pageQuestion}>Can you eat it?!</Text>
      </View>
      {token && (
        <View style={styles.tokenFoundContainer}>
          <Text style={styles.tokenFoundText}>Token found Successfully!</Text>
          <Text style={styles.tokenText}>{token}</Text>
        </View>
      )}
      <View style={styles.toolBar}>
        <TouchableOpacity onPress={webViewRef?.goBack}>
          <Text>⏪ Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={webViewRef?.reload}>
          <Text>🔄 Reload</Text>
        </TouchableOpacity>
      </View>
      <WebView
        ref={ref => setWebRef(ref)}
        // @ts-ignore - this is a mistyping in react-native-webview
        style={styles.webViewFrame}
        source={{uri: INIT_URL}}
        onError={error => console.log('WebView ERROR: ', error)}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        sharedCookiesEnabled={true}
        startInLoadingState={true}
        thirdPartyCookiesEnabled={true}
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
    marginVertical: 20,
  },
  pageTitle: {
    fontSize: 20,
  },
  pageQuestion: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  tokenFoundContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  tokenFoundText: {
    fontSize: 24,
    color: 'teal',
  },
  tokenText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 10,
  },
  webViewFrame: {
    borderWidth: 3,
    borderColor: 'teal',
    borderRadius: 10,
    width: Dimensions.get('window').width - 2,
  },
});
