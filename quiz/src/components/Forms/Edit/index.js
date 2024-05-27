import * as React from 'react'
import { Alert, View, Image, TextInput, Button, Text } from "react-native";
import * as SQLite from 'expo-sqlite'
import { styles } from './style';

const db = SQLite.openDatabase("quizu.db");

export function FormEdit() {

    const [quiz, setQuiz] = React.useState({})
    const [total, setTotal] = React.useState()

    const totalQuiz = () => {
        db.transaction(tx => {
            tx.executeSql("SELECT count(id) as total FROM tbl_quiz;", [],
                (_, { rows }) => {
                    let res = rows._array[0].total
                    console.log(res)
                    setTotal(res)
                })
        })
    }

    React.useEffect(() => {
        totalQuiz()
    }, [])

    const quizLoad = () => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM tbl_quiz ORDER BY id LIMIT 1;", [],
                (_, { rows }) => {
                    let res = rows._array[0]
                    console.log(res)
                    setQuiz(res)
                })
        })
    }

    React.useEffect(() => {
        quizLoad()
    }, [])

    const quizUpdate = () => {
        db.transaction(tx => {
            tx.executeSql('UPDATE tbl_quiz SET quest = ?, altA = ?, altB = ?, altC = ?, altD = ?, alt_correctly = ? WHERE id = ?;',
                [quiz.quest, quiz.altA, quiz.altB, quiz.altC, quiz.altD, quiz.alt_correctly, quiz.id], () => {
                    Alert.alert('Sucesso!', 'Pergunta atualizada com sucesso!');
                    quizLoad()
                });
        });
    }

    const quizDelete = () => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM tbl_quiz WHERE id = ?;", [quiz.id], () => {
                Alert.alert('Sucesso!', 'Pergunta deletada com sucesso!');
                quizLoad()
            })
        })
    }

    const nextQuiz = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM tbl_quiz WHERE id > ? ORDER BY id LIMIT 1;', [quiz.id], (_, { rows }) => {
                if (rows.length > 0) {
                    let res = rows._array[0];
                    setQuiz(res)
                } else {
                    Alert.alert('Informação', 'Esta é a última pergunta.');
                }
            });
        });

    }

    const previousQuiz = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM tbl_quiz WHERE id < ? ORDER BY id DESC LIMIT 1;', [quiz.id], (_, { rows }) => {
                if (rows.length > 0) {
                    let res = rows._array[0];
                    setQuiz(res)
                } else {
                    Alert.alert('Informação', 'Esta é a primeira pergunta.');
                }
            });
        });
    };

    function handlerOnChange({ _name, _value }) {
        setQuiz({ ...quiz, [_name]: _value })
    }

    return (
        <View style={styles.container}>

            <Image source={require('../../../../assets/logo.png')} style={styles.img} />

            <TextInput placeholder="Digite o texto da pergunta" value={quiz ? quiz.quest : ""} multiline={true} onChangeText={event => handlerOnChange({ _name: "quest", _value: event })} numberOfLines={4}
                style={[styles.input, { height: 80 }]} />

            <TextInput placeholder="Digite o texto da alternativa A" value={quiz ? quiz.altA : ""} onChangeText={event => handlerOnChange({ _name: "altA", _value: event })}
                style={styles.input} />

            <TextInput placeholder="Digite o texto da alternativa B" value={quiz ? quiz.altB : ""} onChangeText={event => handlerOnChange({ _name: "altB", _value: event })}
                style={styles.input} />

            <TextInput placeholder="Digite o texto da alternativa C" value={quiz ? quiz.altC : ""} onChangeText={event => handlerOnChange({ _name: "altC", _value: event })}
                style={styles.input} />

            <TextInput placeholder="Digite o texto da alternativa D" value={quiz ? quiz.altD : ""} onChangeText={event => handlerOnChange({ _name: "altD", _value: event })}
                style={styles.input} />

            <TextInput placeholder="Digite a letra da resposta correta" value={quiz ? quiz.alt_correctly : ""} onChangeText={event => handlerOnChange({ _name: "alt_correctly", _value: event })}
                style={styles.input} />

            <View style={{ marginBottom: 15 }}>
                <Button title="Atualizar Pergunta" onPress={quizUpdate} style={styles.button} />
            </View>

            <Button title="Deletar Pergunta" onPress={quizDelete} color={'red'} style={styles.button} />

            <View style={styles.contentBtn}>
                <Button title="Voltar" onPress={previousQuiz} />
                <Button title="Avançar" onPress={nextQuiz} />
            </View>

            <Text style={styles.total_text}>TOTAL DE REGISTROS: {total}</Text>
        </View>
    );

}