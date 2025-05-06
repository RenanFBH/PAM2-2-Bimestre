import React from 'react';
import { Text, View, Button, Pressable, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import estilo from './css/Estilo'

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
            <Pressable style={estilo.btn} onPress={() => SelecionarTudo()} >      
                <Text style={estilo.txt}>Selecionar Tudo</Text>
            </Pressable>
            <Pressable style={estilo.btn} onPress={() => Selecionar([selecionar])} >    
                <Text style={estilo.txt}>Selecionar</Text>
            </Pressable>
            <Pressable style={estilo.btn} onPress={() => Deletar([deletar])} >    
                <Text style={estilo.txt}>Deletar Dados</Text>
            </Pressable> 
        </View>
    )
}

export default Banco;