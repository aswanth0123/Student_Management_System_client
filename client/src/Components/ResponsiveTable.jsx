import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  useTheme,
  useMediaQuery,
  Divider,
  Chip
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const ResponsiveTable = ({ 
  data, 
  columns, 
  mobileConfig, 
  onRowClick,
  emptyMessage = "No data found",
  elevation = 2
}) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!data || data.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  // Mobile Card View
  if (isMobile) {
    return (
      <Box sx={{ mt: 2 }}>
        {data.map((item, index) => (
          <Accordion
            key={item.id || item._id || index}
            expanded={expandedCard === (item.id || item._id || index)}
            onChange={() => setExpandedCard(
              expandedCard === (item.id || item._id || index) 
                ? null 
                : (item.id || item._id || index)
            )}
            sx={{
              mb: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }
            }}
            onClick={() => onRowClick && onRowClick(item)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px 8px 0 0',
              }}
            >
              {mobileConfig.renderSummary(item)}
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {mobileConfig.renderDetails(item)}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }

  // Desktop Table View
  return (
    <TableContainer component={Paper} elevation={elevation}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                <strong>{column.label}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id || item._id || index}
              onClick={() => onRowClick && onRowClick(item)}
              sx={{
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                  cursor: onRowClick ? 'pointer' : 'default'
                }
              }}
            >
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResponsiveTable; 