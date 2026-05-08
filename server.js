require('dotenv').config();
const express = require('express');
const cors = require('cors');

// ─── 2. Importação dos Middlewares Customizados ───────────────
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// ─── 3. Criação da Aplicação Express ─────────────────────────
const app = express();

// ─── 4. Middlewares Globais ──────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(logger);

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