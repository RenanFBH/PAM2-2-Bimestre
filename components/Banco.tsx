import React from 'react';
import { View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

//variáveis do crud
let nome = "Renan" 
let alterar = "Renan Edit"
let editar = "Renan Alterado"
let selecionar = "Renan Edit"
let deletar = "Renan Edit"

let db;

//componente
const Banco = () => {
    
    //criar banco
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
        try {
            db = await Banco();  
            const result = await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS TB_USUARIO (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    nome TEXT NOT NULL
                );
            `);
            console.log("Tabela TB_USUARIO criada");
        } catch (erro) {
            console.error("Erro ao criar tabela:", erro);
        }
    }
    
    //inserir dados 
    async function Inserir(nomes) {
        try {
            const db = await Banco();

            // Montar dinamicamente os valores
            const valores = nomes.map(nome => `('${nome}')`).join(',');

            await db.execAsync(`
                INSERT INTO TB_USUARIO (nome) VALUES ${valores};
            `);
            console.log('✅ Dados inseridos com sucesso!');
        } catch (erro) {
            console.error('❌ Erro ao inserir:', erro);
        }
    }

    //editar dados
    async function Editar(nome, alterar) {
        try {
            const db = await Banco();
            await db.execAsync(`
                UPDATE TB_USUARIO
                SET nome = '${alterar}'
                WHERE nome = '${nome}';
            `);
            console.log('✏️ Usuário editado com sucesso!');
        } catch (erro) {
            console.error('❌ Erro ao editar usuário:', erro);
        }
    }

    //selecionar todos os dados
    async function SelecionarTudo() { 
        db = await Banco();
        const allRows = await db.getAllAsync('SELECT * FROM TB_USUARIO;');
        for (const row of allRows) {
            console.log(row.id, row.nome);
        }
    }

    //selecionar dados
    async function Selecionar(nome) { 
        db = await Banco();
        const firstRow = await db.getFirstAsync(`SELECT * FROM TB_USUARIO WHERE nome = '${nome}';`);
        console.log(firstRow.id, firstRow.nome);
    }

    //deletar dados
    async function Deletar(nome) {
        try {
            const db = await Banco();
            await db.execAsync(`
                DELETE FROM TB_USUARIO WHERE nome = '${nome}';
            `);
            console.log(`🗑️ Usuários com nome "${nome}" deletados com sucesso!`);
        } catch (erro) {
            console.error('❌ Erro ao deletar usuários:', erro);
        }
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
                onPress={() => Inserir([nome])}
            />

            <Button
                title="Editar"
                onPress={() => Editar(editar, alterar)}
            />

            <Button
                title="Exibir Tudo"
                onPress={() => SelecionarTudo()}
            />      

            <Button
                title="Exibir"
                onPress={() => Selecionar([selecionar])}
            />    

            <Button
                title="Deletar"
                onPress={() => Deletar([deletar])}
            />     
        </View>
    )
}

export default Banco;