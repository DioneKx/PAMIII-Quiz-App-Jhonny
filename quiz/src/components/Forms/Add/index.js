import * as React from 'react'
import { Alert, View, TextInput, Button, Image } from "react-native";
import * as SQLite from 'expo-sqlite'
import { styles } from './style';

const db = SQLite.openDatabase("quizu.db");

export function FormAdd() {

    const [quiz, setQuiz] = React.useState({})

    db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_quiz (id INTEGER PRIMARY KEY AUTOINCREMENT, quest TEXT, altA TEXT, altB TEXT, altC TEXT, altD TEXT, alt_correctly TEXT);');
    });

    // Função para adicionar uma pergunta ao banco de dados
    async function questAdd() {
        if (!quiz.quest) {
            Alert.alert('Alerta!', 'Por favor, insira o texto da pergunta...');
            return
        }
        if (!quiz.altA) {
            Alert.alert('Alerta!', 'Por favor, insira o texto da alternativa (A)...');
            return
        }
        if (!quiz.altB) {
            Alert.alert('Alerta!', 'Por favor, insira o texto da alternativa (B)...');
            return
        }
        if (!quiz.altC) {
            Alert.alert('Alerta!', 'Por favor, insira o texto da alternativa (C)...');
            return
        }
        if (!quiz.altD) {
            Alert.alert('Alerta!', 'Por favor, insira o texto da alternativa (D)...');
            return
        }
        if (!quiz.alt_correctly) {
            Alert.alert('Alerta!', 'Por favor, insira a letra da alternativa (Correta)...');
            return
        }

        db.transaction(tx => {
            tx.executeSql('INSERT INTO tbl_quiz (quest, altA, altB, altC, altD, alt_correctly) VALUES(?, ?, ?, ?, ?, ?);',
                [quiz.quest, quiz.altA, quiz.altB, quiz.altC, quiz.altD, quiz.alt_correctly], (_, { insertId }) => {
                    setQuiz({});
                    Alert.alert('Sucesso!', 'Pergunta adicionada com sucesso!');
                });
        });
    };

    function handlerOnChange({ _name, _value }) {
        setQuiz({ ...quiz, [_name]: _value })
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/logo.png')} style={styles.img} />

            <TextInput placeholder='Digite a Pergunta' value={quiz.quest} multiline={true} onChangeText={event => handlerOnChange({ _name: "quest", _value: event })} numberOfLines={4} style={[styles.input, {height: 80}]} />
            <TextInput placeholder='Digite a Alternativa (A)' value={quiz.altA || ""} onChangeText={event => handlerOnChange({ _name: "altA", _value: event })} style={styles.input} />
            <TextInput placeholder='Digite a Alternativa (B)' value={quiz.altB || ""} onChangeText={event => handlerOnChange({ _name: "altB", _value: event })} style={styles.input} />
            <TextInput placeholder='Digite a Alternativa (C)' value={quiz.altC || ""} onChangeText={event => handlerOnChange({ _name: "altC", _value: event })} style={styles.input} />
            <TextInput placeholder='Digite a Alternativa (D)' value={quiz.altD || ""} onChangeText={event => handlerOnChange({ _name: "altD", _value: event })} style={styles.input} />
            <TextInput placeholder='Digite a letra da Alternativa (Correta)' value={quiz.alt_correctly || ""} onChangeText={event => handlerOnChange({ _name: "alt_correctly", _value: event })} style={styles.input} />

            <Button title='Adicionar Pergunta' onPress={questAdd} />
        </View>
    )
}