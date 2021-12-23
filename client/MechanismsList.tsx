import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {AccessTokenFromHttpCookieScreen} from './screens/AccessTokenFromHttpCookie';
import {AccessTokenFromScriptCookieScreen} from './screens/AccessTokenFromScriptCookie';
import {CommunicateTokenScreen} from './screens/CommunicateTokenScreen';

interface MechanismsListProps {
  componentId: string;
}

export const MechanismsListScreen = 'MechanismsListScreen';
export default function MechanismsList({componentId}: MechanismsListProps) {
  const openScreen = (screen: string) => {
    Navigation.push(componentId, {
      component: {
        options: {
          topBar: {
            title: {
              text: screen.replace('Screen', ''),
            },
          },
        },
        name: screen,
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>SSO provide token to the web page</Text>
        <Text style={styles.pageQuestion}>Can we get that token?!</Text>
      </View>
      <ScrollView>
        <TouchableOpacity
          style={styles.mechanismButton}
          onPress={() => openScreen(AccessTokenFromHttpCookieScreen)}>
          <Text style={styles.mechanismTitle}>
            Access token from HTTP cookie
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mechanismButton}
          onPress={() => openScreen(AccessTokenFromScriptCookieScreen)}>
          <Text style={styles.mechanismTitle}>
            Access token from Script cookie
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mechanismButton}
          onPress={() => openScreen(CommunicateTokenScreen)}>
          <Text style={styles.mechanismTitle}>
            Communicate token with web page
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  mechanismButton: {
    backgroundColor: 'teal',
    padding: 15,
    marginVertical: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  mechanismTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
