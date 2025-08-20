import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const faqs = [
  { q: 'How does the AI personalization work?', a: 'Our AI analyzes each student\'s interaction, pace, and quiz results to recommend the most effective content and create an adaptive learning path that focuses on their specific needs.' },
  { q: 'Is student data secure?', a: 'Absolutely. We use end-to-end encryption and comply with all major data privacy regulations like GDPR and FERPA to ensure student data is always secure and confidential.' },
  { q: 'Can BrainFog integrate with our existing SIS?', a: 'Yes, our Enterprise plan includes support for seamless integration with most major Student Information Systems (SIS) for easy rostering and grade syncing.' },
];

export default function FaqSection() {
  return (
    <Box id="resources" sx={{ py: 12, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom>
              Frequently Asked Questions
            </Typography>
        </motion.div>
        <Box sx={{ mt: 4 }}>
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 * index }}>
                <Accordion sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight={500}>{faq.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">{faq.a}</Typography>
                    </AccordionDetails>
                </Accordion>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}