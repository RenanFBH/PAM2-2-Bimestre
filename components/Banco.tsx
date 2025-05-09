import React from 'react';
import { Text, View, Pressable, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import estilo from './css/Estilo';

//variáveis do crud
let nome = "usuario1";
let alterar = "usuario2";
let editar = "usuario1";
let selecionar = "usuario2";
let deletar = "usuario2";

let db;

const Banco = () => {

    async function Banco() {
        db = await SQLite.openDatabaseAsync('PAM2');
        if (db) {
            console.log("Banco criado");
            Alert.alert("Banco", "Banco criado com sucesso!");
            return db;
        } else {
            console.log("Erro ao criar Banco");
            Alert.alert("Erro", "Erro ao criar banco!");
        }
    }

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
            Alert.alert("Tabela", "Tabela criada com sucesso!");
        } catch (erro) {
            console.error("Erro ao criar tabela:", erro);
            Alert.alert("Erro", "Erro ao criar tabela!");
        }
    }

    async function Inserir(nomes) {
        try {
            const db = await Banco();
            const valores = nomes.map(nome => `('${nome}')`).join(',');
            await db.execAsync(`
                INSERT INTO TB_USUARIO (nome) VALUES ${valores};
            `);
            console.log('Dados inseridos com sucesso!');
            Alert.alert("Inserção", "Dados inseridos com sucesso!");
        } catch (erro) {
            console.error('Erro ao inserir:', erro);
            Alert.alert("Erro", "Erro ao inserir dados!");
        }
    }

    async function Editar(nome, alterar) {
        try {
            const db = await Banco();
            await db.execAsync(`
                UPDATE TB_USUARIO
                SET nome = '${alterar}'
                WHERE nome = '${nome}';
            `);
            console.log('Usuário editado com sucesso!');
            Alert.alert("Edição", "Usuário editado com sucesso!");
        } catch (erro) {
            console.error('Erro ao editar usuário:', erro);
            Alert.alert("Erro", "Erro ao editar usuário!");
        }
    }

    async function SelecionarTudo() {
        try {
            db = await Banco();
            const allRows = await db.getAllAsync('SELECT * FROM TB_USUARIO;');
    
            if (allRows.length === 0) {
                console.log("Nenhum usuário encontrado.");
                Alert.alert("Consulta", "Nenhum usuário encontrado.");
                return;
            }
    
            const dadosFormatados = allRows
                .map(row => `ID: ${row.id} - Nome: ${row.nome}`)
                .join('\n');
    
            console.log("Usuários encontrados:\n" + dadosFormatados);
            Alert.alert("Usuários cadastrados", dadosFormatados);
        } catch (erro) {
            console.error("Erro ao selecionar dados:", erro);
            Alert.alert("Erro", "Erro ao consultar usuários!");
        }
    }
    
    

    async function Selecionar(nome) { 
        db = await Banco();
        const firstRow = await db.getFirstAsync(`SELECT * FROM TB_USUARIO WHERE nome = '${nome}';`);
        if (firstRow) {
            console.log("Usuário encontrado: ID: " + firstRow.id + " - Nome: " + firstRow.nome);
            Alert.alert("Consulta", `Usuário encontrado: ID - ${firstRow.id}, Nome: ${firstRow.nome}`);
        } else {
            console.log("Nenhum usuário encontrado.");
            Alert.alert("Consulta", "Usuário não encontrado.");
        }
    }

    async function Deletar(nome) {
        try {
            const db = await Banco();
            await db.execAsync(`
                DELETE FROM TB_USUARIO WHERE nome = '${nome}';
            `);
            console.log(`Usuários com nome "${nome}" deletados com sucesso!`);
            Alert.alert("Exclusão", `Usuário "${nome}" deletado com sucesso!`);
        } catch (erro) {
            console.error('Erro ao deletar usuários:', erro);
            Alert.alert("Erro", "Erro ao deletar usuário!");
        }
    }

    return (
        <View>
            <Pressable style={estilo.btn} onPress={Banco} >
                <Text style={estilo.txt}>Criar Banco</Text>
            </Pressable>
            <Pressable style={estilo.btn} onPress={CriarTabela} >
                <Text style={estilo.txt}>Criar tabela</Text>
            </Pressable>
            <Pressable style={estilo.btn} onPress={() => Inserir([nome])} >
                <Text style={estilo.txt}>Inserir dados</Text>
            </Pressable>
            <Pressable style={estilo.btn} onPress={() => Editar(editar, alterar)} >
                <Text style={estilo.txt}>Editar Dados</Text>
            </Pressable>
            <Pressable style={estilo.btn} onPress={SelecionarTudo} >      
                <Text style={estilo.txt}>Selecionar Tudo</Text>
            </Pressable>
            <Pressable style={estilo.btn} onPress={() => Selecionar(selecionar)} >    
                <Text style={estilo.txt}>Selecionar</Text>
            </Pressable>
            <Pressable style={estilo.btn} onPress={() => Deletar(deletar)} >    
                <Text style={estilo.txt}>Deletar Dados</Text>
            </Pressable> 
        </View>
    )
}

export default Banco;
