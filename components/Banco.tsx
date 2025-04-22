import React from 'react';
import { View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;

//componente
const Banco = () => {
    
    async function Banco() {
        db = await SQLite.openDatabaseAsync('PAM2');
        if (db) {
            console.log("Banco criado");
            return db;
        }
        else {
            console.log("Erro ao criar Banco");
        }
    }

    //criar tabela
    async function CriarTabela() {

        db = await Banco();

        try {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS TB_USUARIO (
                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                 nome TEXT NOT NULL);`
            )
            console.log("tabela criada")
        } catch (erro) {
            console.log("Erro")
        }
    }

    async function Inserir() {

        db = await Banco();

        try {
            db.execAsync(
                ` INSERT INTO TB_USUARIO (nome)
                   VALUES ('Ricardo'),
                          ('Zé Matraca'),
                          ('Maria ');                          
                 `
            );
            console.log('Inserido');

        } catch (erro) {
            console.log('Erro' + erro)
        }
    }

    async function Editar() { 
        
        db = await Banco();


    }

    async function Exibir() {
        
        db = await Banco();

        const allRows = await db.getAllAsync('SELECT * FROM tb_usuario');
        for (const row of allRows) {
            console.log(row.id, row.nome);
        }
    }

    async function Deletar() { 

        db = await Banco();

        await db.runAsync('DELETE FROM TB_USUARIO WHERE nome = $value', { $value: 'Renan 1' });
        console.log("Usuário deletado");
    }

    return (
        <View>
            <Button
                title="Criar BD"
                onPress={Banco}
            />
            <Button
                title="Criar Tabela"
                onPress={CriarTabela}
            />

            <Button
                title="Inserir"
                onPress={Inserir}
            />

            <Button
                title="Editar"
                onPress={Editar}
            />

            <Button
                title="Exibir"
                onPress={Exibir}
            />

            <Button
                title="Deletar"
                onPress={Deletar}
            />
        </View>
    )
}

export default Banco;