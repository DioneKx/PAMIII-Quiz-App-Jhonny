import * as React from 'react'
import { Alert, Button, Image, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite'
import { styles } from './style';

const db = SQLite.openDatabase("quizu.db");

export function Quiz() {

    const [quiz, setQuiz] = React.useState({})
    const [alt, setAlt] = React.useState([])
    const [state, setState] = React.useState(false)

    const quizLoad = () => {
        if (state === true) {
            setState(false)
        }
        
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM tbl_quiz ORDER BY RANDOM() LIMIT 1;", [], (_, { rows }) => {
                let res = rows._array[0]
                console.log(res)

                setQuiz({
                    id: res.id,
                    quest: res.quest,
                    alt_correctly: res.alt_correctly,
                })

                setAlt([res.altA, res.altB, res.altC, res.altD])
            })
        })
    }

    React.useEffect(() => {
        quizLoad()
    }, [])

    const answerVerify = (answer) => {
        if (answer == quiz.alt_correctly) {
            Alert.alert("Parabéns!!!", "Você acertou a resposta!")
            setState(true)
        } else {
            Alert.alert("Vish!", "Você errou a resposta...")
        }
    }

    const listAlts = alt ? alt.map((element, index) => {
        return (
            <View key={index} style={styles.item}>
                <Button title={`${String.fromCharCode(65 + index)}. ${element}`} onPress={() => answerVerify(String.fromCharCode(65 + index))} />
            </View>
        )
    }) : []

    return (
        // Criando uma View com alinhamento centralizado e ocupando 90% da tela
        <View style={styles.container}>

            <Image source={require('../../../assets/logo.png')} style={styles.img} />

            <Text style={styles.quiz_text} multiline={true}>
                {!quiz ? "" : quiz.quest}
            </Text>

            {listAlts.length > 0 ? listAlts : <></>}

            {state == true && (
                <View style={styles.button}>
                    <Button title="Próxima pergunta" onPress={quizLoad} />
                </View>
            )}
        </View>
    );
}