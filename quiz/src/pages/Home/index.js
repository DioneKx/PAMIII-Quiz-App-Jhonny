import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { styles } from './style';

export function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')} style={styles.logo}/>
            
            <View style={styles.content}>
                <Button title='Formularios' onPress={() => navigation.navigate('Forms')} />
            </View>

            <View style={styles.content}>
                <Button color="gold" title='começar Quiz' onPress={() => navigation.navigate('Quiz')} />
            </View>

            <View style={styles.content}>
                <Button color="red" title='Minigame (Quiz10)' onPress={() => navigation.navigate('Quiz10')} />
            </View>
        </View>
    )
}