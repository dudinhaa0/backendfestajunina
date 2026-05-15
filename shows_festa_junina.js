const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json([
        'Show Sertanejo',
        'Quadrilha',
        'Forró'
    ]);
});

module.exports = router;