import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderColor: 'blue',
        borderWidth: 1,
        marginBottom: 5,
        width: '90%'
    },
    img: {
        width: '90%',
        height: 150,
        marginBottom: 45
    },
    button: {
        marginBottom: 5
    },
    contentBtn: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '90%'
    },
    total_text: {
        fontSize: 16,
        alignSelf: "center",
        fontWeight: "bold"
    }
});