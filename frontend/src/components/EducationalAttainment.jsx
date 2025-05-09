import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Box,
  TextField,
  Container,
  Typography,

} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EducationalAttainment = () => {
  const steps = [
    { label: 'Personal Information', icon: <PersonIcon />, path: '/applicant' },
    { label: 'Family Background', icon: <FamilyRestroomIcon />, path: '/family_background' },
    { label: 'Educational Attainment', icon: <SchoolIcon />, path: '/educ_attainment' },
    { label: 'Health Medical Records', icon: <HealthAndSafetyIcon />, path: '/health_medical_records' },
    { label: 'Other Information', icon: <InfoIcon />, path: '/other_information' },
  ];

  const [step, setStep] = useState(1); // Initialize step at 1

  const handlePreviousPage = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNextStep = () => {
    if (step < 5) setStep(step + 1); // Change '5' to total number of steps you have
  };


  const [newEducationalAttainment, setNewEducationalAttainment] = useState({
    id: "",
    schoolLevel: "",
    schoolLastAttended: "",
    schoolAddress: "",
    courseProgram: "",
    honor: "",
    generalAverage: "",
    yearGraduated: "",
    strand: "",
  });

  const [editingEducationalAttainment, setEditingEducationalAttainment] = useState(null);
  const [activeStep, setActiveStep] = useState(2);
  const [clickedSteps, setClickedSteps] = useState(Array(steps.length).fill(false));

  const handleStepClick = (index) => {
    setActiveStep(index);
    const newClickedSteps = [...clickedSteps];
    newClickedSteps[index] = true;
    setClickedSteps(newClickedSteps);
  };

  useEffect(() => {
    fetchEducationalAttainment();
  }, []);

  const fetchEducationalAttainment = async () => {
    try {
      const result = await axios.get("http://localhost:5000/educational_attainment");

    } catch (error) {
      console.error("Error fetching Educational Attainment:", error);
    }
  };

  const addOrUpdateEducationalAttainment = async () => {
    try {
      if (editingEducationalAttainment) {
        await axios.put(
          `http://localhost:5000/educational_attainment/${EducationalAttainment}`,
          newEducationalAttainment
        );
      } else {
        if (!newEducationalAttainment.schoolLevel) return;
        await axios.post("http://localhost:5000/educational_attainment", newEducationalAttainment);
      }
      setEditingEducationalAttainment(null);
      fetchEducationalAttainment();
      resetNewEducationalAttainment();
      setActiveStep(0); // Reset stepper after submission
    } catch (error) {
      console.error("Failed to add or update educational attainment:", error);
    }
  };

  const resetNewEducationalAttainment = () => {
    setNewEducationalAttainment({
      id: "",
      schoolLevel: "",
      schoolLastAttended: "",
      schoolAddress: "",
      courseProgram: "",
      honor: "",
      generalAverage: "",
      yearGraduated: "",
      strand: "",
    });
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center", color: "maroon", marginTop: "-50px" }}>APPLICANT FORM</h1>
      <div style={{ textAlign: "Center", }}>Complete the applicant form to secure your place for the upcoming academic year at EARIST.</div>
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', px: 4 }}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Wrap the step with Link for routing */}
            <Link to={step.path} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleStepClick(index)}
              >
                {/* Step Icon */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: activeStep === index ? '#6D2323' : '#E8C999',
                    color: activeStep === index ? '#fff' : '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </Box>

                {/* Step Label */}
                <Typography
                  sx={{
                    mt: 1,
                    color: activeStep === index ? '#6D2323' : '#000',
                    fontWeight: activeStep === index ? 'bold' : 'normal',
                    fontSize: 14,
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
            </Link>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  height: '2px',
                  backgroundColor: '#6D2323',
                  flex: 1,
                  alignSelf: 'center',
                  mx: 2,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>

      <br />
      <form>
        <Container maxWidth="100%" sx={{ backgroundColor: "#6D2323", color: "white", borderRadius: 2, boxShadow: 3, padding: "4px" }}>
          <Box sx={{ width: "100%" }}>
            <Typography style={{ fontSize: "15px", padding: "10px" }}>Step 3: Educational Attainment</Typography>
          </Box>
        </Container>
        <Container maxWidth="100%" sx={{ backgroundColor: "white", padding: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>
            Educational Attainment:
          </Typography>
          <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />
          <Box display="flex" gap={2} mt={2}>
            {/* School Level */}
            <Box flex={1}>
              <div>
                School Level: <span style={{ color: "red" }}>*</span>
              </div>
              <TextField
                label="Enter School Level"
                required
                fullWidth
                size="small"
                value={newEducationalAttainment.schoolLevel || ""}
                onChange={(e) =>
                  setNewEducationalAttainment({
                    ...newEducationalAttainment,
                    schoolLevel: e.target.value,
                  })
                }
              />
            </Box>

            {/* School Last Attended */}
            <Box flex={1}>
              <div>
                School Last Attended: <span style={{ color: "red" }}>*</span>
              </div>
              <TextField
                label="Enter School Last Attended"
                required
                fullWidth
                size="small"
                value={newEducationalAttainment.schoolLastAttended || ""}
                onChange={(e) =>
                  setNewEducationalAttainment({
                    ...newEducationalAttainment,
                    schoolLastAttended: e.target.value,
                  })
                }
              />
            </Box>

            {/* School Address */}
            <Box flex={1}>
              <div>
                School Address: <span style={{ color: "red" }}>*</span>
              </div>
              <TextField
                label="Enter School Address"
                required
                fullWidth
                size="small"
                value={newEducationalAttainment.schoolAddress || ""}
                onChange={(e) =>
                  setNewEducationalAttainment({
                    ...newEducationalAttainment,
                    schoolAddress: e.target.value,
                  })
                }
              />
            </Box>

            {/* Course/Program */}
            <Box flex={1}>
              <div>Course/Program:</div>
              <TextField
                label="Enter Course/Program"
                fullWidth
                size="small"
                value={newEducationalAttainment.courseProgram || ""}
                onChange={(e) =>
                  setNewEducationalAttainment({
                    ...newEducationalAttainment,
                    courseProgram: e.target.value,
                  })
                }
              />
            </Box>
          </Box>

          <Box display="flex" gap={3} width="100%">
            <Box flexBasis="32%" marginTop="10px">
              <div>Honor:</div>
              <TextField
                label="Enter Honor"
                style={{ width: "100%" }}
                size="small"
                value={newEducationalAttainment.honor || ""}
                onChange={(e) =>
                  setNewEducationalAttainment({ ...newEducationalAttainment, honor: e.target.value })
                }
              />
            </Box>
            <Box flexBasis="32%" marginTop="10px">
              <div>Gen Ave. <span style={{ color: "red" }}>*</span></div>
              <TextField
                label="Enter General Average"
                required
                style={{ width: "100%" }}
                size="small"
                value={newEducationalAttainment.generalAverage || ""}
                onChange={(e) =>
                  setNewEducationalAttainment({ ...newEducationalAttainment, generalAverage: e.target.value })
                }
              />
            </Box>
            <Box flexBasis="32%" marginTop="10px">
              <div>Year Graduated: <span style={{ color: "red" }}>*</span></div>
              <TextField
                label="Enter Year Graduated"
                required
                style={{ width: "100%" }}
                size="small"
                value={newEducationalAttainment.yearGraduated || ""}
                onChange={(e) =>
                  setNewEducationalAttainment({ ...newEducationalAttainment, yearGraduated: e.target.value })
                }
              />
            </Box>
          </Box>



          < br />
          <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>
            Strand (For Senior High School)
          </Typography>
          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <InputLabel id="strand">Strand</InputLabel>
            <Select
              labelId="strand"
              value={newEducationalAttainment.strand}
              label="Family Annual Income"
              style={{ width: "100%", marginTop: "5px" }}
              size="small"

              onChange={(e) =>
                setNewEducationalAttainment({ ...newEducationalAttainment, strand: e.target.value })
              }
            >
              <MenuItem value="">--</MenuItem>
              <MenuItem value="Accountancy, Business and Management (ABM)">Accountancy, Business and Management (ABM)</MenuItem>
              <MenuItem value="Humanities and Social Sciences (HUMSS)">Humanities and Social Sciences (HUMSS)</MenuItem>
              <MenuItem value="Science, Technology, Engineering, and Mathematics (STEM)">Science, Technology, Engineering, and Mathematics (STEM)</MenuItem>
              <MenuItem value="General Academic Strand (GAS)">General Academic Strand (GAS)</MenuItem>
              <MenuItem value="Home Economics (HE) Strand">Home Economics (HE) Strand</MenuItem>
              <MenuItem value="Information and Communications Technology (ICT) Strand ">Information and Communications Technology (ICT) Strand </MenuItem>
              <MenuItem value="Agri-Fishery Arts (AFA) Strand">Agri-Fishery Arts (AFA) Strand</MenuItem>
              <MenuItem value="Industrial Arts (IA) Strand">Industrial Arts (IA) Strand</MenuItem>
              <MenuItem value="Sports Track">Sports Track</MenuItem>
              <MenuItem value="Design and Arts Track">Design and Arts Track </MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="space-between" mt={4}>
            {/* Previous Page Button */}
            <Button
              variant="contained"
              component={Link}
              to="/educ_attainment" // The path where the button will link to
              startIcon={<ArrowBackIcon sx={{ color: '#000' }} />} // Icon at the start
              sx={{
                backgroundColor: '#E8C999',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#6D2323',
                },
              }}
            >
              Previous Step
            </Button>


            {/* Next Step Button */}
            <Button
              variant="contained"
              component={Link}
              to="/health_medical_records" // The path where the button will link to
              endIcon={<ArrowForwardIcon sx={{ color: '#fff' }} />}
              sx={{
                backgroundColor: '#6D2323',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#E8C999',
                },
              }}
            >
              Next Step
            </Button>

          </Box>
        </Container>

      </form>
    </Container>
  );
};

export default EducationalAttainment;
