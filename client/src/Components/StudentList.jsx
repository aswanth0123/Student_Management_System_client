import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Visibility, 
  ExpandMore,
  School,
  Person,
  Phone,
  Email,
  Circle
} from '@mui/icons-material';

const StudentList = ({ students, onEdit, onDelete, onView, userRole, permissions }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      'Kindergarten': '#FF9800',
      '1st Grade': '#4CAF50',
      '2nd Grade': '#4CAF50',
      '3rd Grade': '#4CAF50',
      '4th Grade': '#4CAF50',
      '5th Grade': '#4CAF50',
      '6th Grade': '#2196F3',
      '7th Grade': '#2196F3',
      '8th Grade': '#2196F3',
      '9th Grade': '#9C27B0',
      '10th Grade': '#9C27B0',
      '11th Grade': '#9C27B0',
      '12th Grade': '#9C27B0'
    };
    return gradeColors[grade] || '#757575';
  };

  const getGradeDot = (grade) => {
    return (
      <Circle 
        sx={{ 
          fontSize: 16, 
          color: getGradeColor(grade)
        }} 
      />
    );
  };

  if (!students || students.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No students found
        </Typography>
      </Box>
    );
  }

  // Mobile Card View
  if (isMobile) {
    return (
      <Box sx={{ mt: 2 }}>
        {students.map((student) => (
          <Accordion
            key={student._id}
            expanded={expandedCard === student._id}
            onChange={() => setExpandedCard(expandedCard === student._id ? null : student._id)}
            sx={{
              mb: 2,
              '&:before': { display: 'none' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              borderRadius: '8px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px 8px 0 0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                <School sx={{ color: '#1976d2', fontSize: 24 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {student.name}
                  </Typography>
                </Box>
                {getGradeDot(student.grade)}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Email sx={{ color: '#666', fontSize: 16 }} />
                    <Typography variant="body2">
                      <strong>Email:</strong> {student.contactInfo?.email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Phone sx={{ color: '#666', fontSize: 16 }} />
                    <Typography variant="body2">
                      <strong>Phone:</strong> {student.contactInfo?.phone}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Person sx={{ color: '#666', fontSize: 16 }} />
                    <Typography variant="body2">
                      <strong>Parent:</strong> {student.parentName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Enrolled:</strong> {formatDate(student.enrollmentDate)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => onView(student)}
                      sx={{ 
                        color: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.2)' }
                      }}
                      title="View Student"
                    >
                      <Visibility />
                    </IconButton>
                    {(userRole === 'Super_Admin' || permissions?.students?.canUpdate) && (
                      <IconButton
                        size="small"
                        onClick={() => onEdit(student)}
                        sx={{ 
                          color: '#FF9800',
                          backgroundColor: 'rgba(255, 152, 0, 0.1)',
                          '&:hover': { backgroundColor: 'rgba(255, 152, 0, 0.2)' }
                        }}
                        title="Edit Student"
                      >
                        <Edit />
                      </IconButton>
                    )}
                    {(userRole === 'Super_Admin' || permissions?.students?.canDelete) && (
                      <IconButton
                        size="small"
                        onClick={() => onDelete(student._id)}
                        sx={{ 
                          color: '#F44336',
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.2)' }
                        }}
                        title="Delete Student"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }

  // Desktop Table View
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Age</strong></TableCell>
            <TableCell><strong>Grade</strong></TableCell>
            <TableCell><strong>Contact</strong></TableCell>
            <TableCell><strong>Parent</strong></TableCell>
            <TableCell><strong>Enrolled</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student._id}
              onMouseEnter={() => setHoveredRow(student._id)}
              onMouseLeave={() => setHoveredRow(null)}
              sx={{
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer'
                }
              }}
            >
              <TableCell>
                <Typography variant="subtitle2" fontWeight="medium">
                  {student.name}
                </Typography>
              </TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>
                <Chip
                  label={student.grade}
                  size="small"
                  sx={{
                    backgroundColor: getGradeColor(student.grade),
                    color: 'white',
                    fontWeight: 'medium'
                  }}
                />
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2">{student.contactInfo?.email}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {student.contactInfo?.phone}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="body2">{student.parentName}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {student.parentContact}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{formatDate(student.enrollmentDate)}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onView(student)}
                    sx={{ color: '#2196F3' }}
                  >
                    <Visibility />
                  </IconButton>
                  {(userRole === 'Super_Admin' || permissions?.students?.canUpdate) && (
                    <IconButton
                      size="small"
                      onClick={() => onEdit(student)}
                      sx={{ color: '#FF9800' }}
                    >
                      <Edit />
                    </IconButton>
                  )}
                  {(userRole === 'Super_Admin' || permissions?.students?.canDelete) && (
                    <IconButton
                      size="small"
                      onClick={() => onDelete(student._id)}
                      sx={{ color: '#F44336' }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentList; 