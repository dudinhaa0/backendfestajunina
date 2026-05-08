import express from 'express';
import { supabase } from '../data/supabase.js';

const express = require('express');
const { supabase } = require('../data/supabase'); // Importação CommonJS
const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('shows_festa_junina').select('*');
  if (error) return res.status(400).json(error);
  res.json(data);
});

module.exports = router; // Exportação CommonJS

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('shows_festa_junina').select('*');
  if (error) return res.status(400).json(error);
  res.json(data);
});

export default router;