const express = require('express');
const { supabase } = require('../data/supabase'); 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('brinquedos_festa_junina')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;