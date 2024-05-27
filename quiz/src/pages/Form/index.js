import * as React from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native'
import { FormAdd } from '../../components/Forms/Add'
import { FormEdit } from '../../components/Forms/Edit'
import { styles } from './style'

export function Forms() {

    const [form, setForm] = React.useState("")

    switch (form) {
        case "":
            return (
                <View style={styles.container}>
                    <Image source={require('../../../assets/logo.png')} style={styles.logo} />

                    <View style={styles.content}>
                        <Button title='Adicionar Pergunta' onPress={() => setForm("add")} />
                    </View>

                    <View style={styles.content}>
                        <Button color="green" title='Editar Pergunta' onPress={() => setForm("edit")} />
                    </View>
                </View>
            )

        case "add":
            return <FormAdd />
        case "edit":
            return <FormEdit />
    }
}