require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js'); // Certifique-se de ter essa linha

const app = express();

// Conexão com Supabase (use as variáveis que você já tem no .env)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ─── 2. Importação dos Middlewares Customizados ───────────────
//const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// ─── 3. Criação da Aplicação Express ─────────────────────────


// ─── 4. Middlewares Globais ──────────────────────────────────
app.use(cors());
app.use(express.json());
//app.use(logger);

// ─── 5. Rota de Boas-Vindas ───────────────────────────────────
app.get('/', (req, res) => {
    res.json({ mensagem: '🤠 Bem-vindo à API do Arraial (Festa Junina)!' });
});

// ─── 6. Importação e Registro das Rotas ───────────────────────
const rotasShows = require('./routes/shows_festa_junina');
const rotasComidas = require('./routes/comidas_festa_junina');
const rotasBrinquedos = require('./routes/brinquedos_festa_junina');

app.use('/api/shows', rotasShows);
app.use('/api/comidas', rotasComidas);
app.use('/api/brinquedos', rotasBrinquedos);

// --- COLOQUE ISSO NA SEÇÃO 6 DO SEU CÓDIGO ---

// ROTA PARA BUSCAR OS RECADOS (O Mural lê daqui)
// --- COLOQUE ISSO NO SEU SERVER.JS (Substituindo as rotas antigas do correio se houver) ---

// ROTA PARA BUSCAR RECADOS (Mural)
app.get('/api/correio', async (req, res) => {
    const { data, error } = await supabase
        .from('correio_elegante') // Nome da tabela que você mandou no print
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error("Erro Supabase:", error);
        return res.status(400).json(error);
    }
    res.json(data);
});

// ROTA PARA ENVIAR RECADO (Formulário)
app.post('/api/correio', async (req, res) => {
    const { remetente, destinatario, mensagem } = req.body;
    
    const { data, error } = await supabase
        .from('correio_elegante')
        .insert([{ 
            remetente: remetente || 'Anônimo', 
            destinatario: destinatario, 
            mensagem: mensagem 
        }]);

    if (error) {
        console.error("Erro ao inserir:", error);
        return res.status(400).json(error);
    }
    res.status(201).json({ sucesso: true, mensagem: "Recado guardado no Supabase!" });
});

// ─── 7. Tratamento de Rota não encontrada (404) ───────────────
app.use((req, res, next) => {
    res.status(404).json({
        sucesso: false,
        mensagem: `Rota '${req.url}' não encontrada no nosso Arraial.`
    });
});

// ─── 8. Middleware de Erros Global ────────────────────────────
app.use(errorHandler);

// ─── 9. Iniciando o Servidor ──────────────────────────────────
const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log('');
    console.log('🔥 ==============================================');
    console.log('🔥 O ARRAIAL COMEÇOU! SERVIDOR RODANDO!');
    console.log(`🔥 Link Local: http://localhost:${PORTA}`);
    console.log('🔥 ==============================================');
    console.log('');
    console.log('📋 Programação e Barracas disponíveis:');
    console.log(`   🎤 SHOWS:     http://localhost:${PORTA}/api/shows`);
    console.log(`   🌽 COMIDAS:   http://localhost:${PORTA}/api/comidas`);
    console.log(`   🎡 BRINQUEDOS: http://localhost:${PORTA}/api/brinquedos`);
    console.log('');
    console.log('🚀 Pronto para o deploy na Vercel!');
    console.log('');
});

module.exports = app;