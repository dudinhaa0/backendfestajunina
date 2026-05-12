const express = require('express');
const { supabase } = require('../data/supabase'); // Apontando para o arquivo que corrigimos
const router = express.Router();

// Esta é a função que o navegador chama quando você entra no link
router.get('/', async (req, res) => {
    try {
        // 1. Pega os dados brutos do Supabase
        const { data, error } = await supabase
            .from('comidas_festa_junina')
            .select('*');

        // 2. Verifica se o Supabase respondeu com erro
        if (error) {
            console.error("Erro no Supabase:", error.message);
            return res.status(400).json({ erro: error.message });
        }
        
        // 3. Envia o pacote 'data' (que é uma lista []) para o frontend
        // IMPORTANTE: Não use a palavra 'item' aqui dentro!
        res.json(data);

    } catch (err) {
        // Se algo muito grave acontecer (ex: falta de internet), cai aqui
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;