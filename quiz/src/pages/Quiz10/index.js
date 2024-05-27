import * as React from 'react'
import { Alert, View, Image, TextInput, Button, Text } from "react-native";
import * as SQLite from 'expo-sqlite'
import { styles } from './style';

const db = SQLite.openDatabase("quizu.db");

export function Quiz10() {

    const [quiz, setQuiz] = React.useState({})
    const [quizes, setQuizes] = React.useState([])
    const [alt, setAlt] = React.useState([])
    const [state, setState] = React.useState(0)
    const [start, setStart] = React.useState(1)
    const [finished, setFinished] = React.useState(0)
    const [points, setPoints] = React.useState(0)

    const getQuizes = () => {
        if (state === 1) {
            setPoints(0)
            setFinished(0)
            setState(0)
        }

        db.transaction(tx => {
            tx.executeSql("SELECT * FROM tbl_quiz ORDER BY RANDOM() LIMIT 10;", [], (_, { rows }) => {
                let res = rows._array
                setQuizes(res)
            })
        })
    }

    React.useEffect(() => {
        getQuizes()
    }, [])

    const quizLoad = () => {
        try {
            if (quizes) {
                const actual = quizes[finished]
                setStart(0)

                setQuiz({
                    id: actual.id,
                    quest: actual.quest,
                    alt_correctly: actual.alt_correctly,
                })

                setAlt([actual.altA, actual.altB, actual.altC, actual.altD])
            }
        } catch {
            if (start === 0) {
                setState(1)
            }
        }
    }

    React.useEffect(() => {
        quizLoad()
    }, [finished, quizes])

    const answerVerify = (answer) => {
        if (answer == quiz.alt_correctly) {
            Alert.alert("Parabéns!!!", "Você acertou a resposta!")
            setPoints(points + 1)
        } else {
            Alert.alert("Vish!", "Você errou a resposta...")
        }

        setFinished(finished + 1)
        setState(0)
    }

    const listAlts = alt ? alt.map((element, index) => {
        return (
            <View style={styles.item} key={index}>
                <Button key={index} title={`${String.fromCharCode(65 + index)}. ${element}`} onPress={() => answerVerify(String.fromCharCode(65 + index))} />
            </View>
        )
    }) : []

    const message = () => {
        if (points >= 9) {
            return "VOCE EH UM EXPERT NO ASSUNTO"
        }else if (points < 9 && points > 6) {
            return "VOCE TEM UM BOM CONHECIMENTO DO ASSUNTO"
        }else if (points < 7 && points > 4) {
            return "VOCE TEM UM CERTO CONHECIMENTO DO ASSUNTO"
        }else if (points < 5 && points > 2) {
            return "SEU CONHECIMENTO EH BASIC"
        }else {
            return "VOCE EH UM MERDA!"
        }
    }

    return (
        // Criando uma View com alinhamento centralizado e ocupando 90% da tela
        <View style={styles.container}>

            <Image source={require('../../../assets/logo.png')} style={styles.img} />

            <Text style={styles.quiz_text} multiline={true}>
                {quiz && state === 0 ? quiz.quest : ""}
            </Text>

            {listAlts.length > 0 && state === 0 ? listAlts : <></>}

            {state === 1 && (
                <View style={styles.button}>
                    <Text style={styles.quiz_text} >TOTAL DE PONTOS: {points}</Text>
                    <Text style={styles.quiz_text}>{message()}</Text>
                    <Button title="Tentar Novamente..." onPress={() => getQuizes()} />
                </View>
            )}
        </View>
    );
}