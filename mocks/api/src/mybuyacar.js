import express from 'express'
const router = express.Router()

// emailExists
router.post('/AJAXisEmailPresent.jhtml', (req, res) => {
  return res.send(false);
});

//sign-out
router.get('/Logout.jhtml', (req, res) => res.send(null));

export default router;
