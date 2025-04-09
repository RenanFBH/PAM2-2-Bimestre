import react from 'react';
import { View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;

//componente
const Banco =()=>{
    async function Banco(){
        db = await SQLite.openDatabaseAsync('PAM2');
        if (db) {
            console.log("Banco criado");
        }
        else {
            console.log("Erro ao criar Banco");
        }
    }

    //criar tabela
    async function CriarTabela() {   
        try {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);`
            )
            console.log("tabela criada")
        }  catch (erro) {
            console.log("Erro")
        }
       

    }

    return(
        <View>
            <Button 
                title="Criar BD"
                onPress={Banco}
            />
            <Button 
                title="Criar Tabela"
                onPress={CriarTabela}
            />
        </View>
    )
}

export default Banco;