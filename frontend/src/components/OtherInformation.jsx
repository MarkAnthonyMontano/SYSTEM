import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    Box,

    Container,
    Typography,

    Checkbox
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';


const OtherInformation = () => {
    
    const [step, setStep] = useState(4);
    const steps = [
        { label: 'Personal Information', icon: <PersonIcon />, path: '/applicant' },
        { label: 'Family Background', icon: <FamilyRestroomIcon />, path: '/family_background' },
        { label: 'Educational Attainment', icon: <SchoolIcon />, path: '/educ_attainment' },
        { label: 'Health Medical Records', icon: <HealthAndSafetyIcon />, path: '/health_medical_records' },
        { label: 'Other Information', icon: <InfoIcon />, path: '/other_information' },
    ];

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
    const [activeStep, setActiveStep] = useState(4);
    const [clickedSteps, setClickedSteps] = useState(Array(steps.length).fill(false));

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

    const handleStepClick = (index) => {
        setActiveStep(index);
        const newClickedSteps = [...clickedSteps];
        newClickedSteps[index] = true;
        setClickedSteps(newClickedSteps);
      };

      const handlePreviousPage = () => {
        if (step > 1) setStep(step - 1);
      };
    
      const handleNextStep = () => {
        if (step < 5) setStep(step + 1); // Change '5' to total number of steps you have
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
                        <Typography style={{ fontSize: "15px", padding: "10px" }}>Step 5: Other Information</Typography>
                    </Box>
                </Container>
                <Container maxWidth="100%" sx={{ backgroundColor: "white", padding: 4, borderRadius: 2, boxShadow: 3 }}>
                    <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold" }}>
                        Other Information:
                    </Typography>
                    <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />
                    <Typography style={{ fontWeight: "bold", textAlign: "Center" }}>
                        Data Subject Consent Form
                    </Typography>
                    < br />
                    <Typography style={{ fontSize: "12px", fontFamily: "Arial", textAlign: "Left" }}>
                        In accordance with RA 10173 or Data Privacy Act of 2012, I give my consent to the following terms and conditions on the collection, use, processing, and disclosure of my personal data:
                    </Typography>
                    < br />
                    <Typography style={{ fontSize: "12px", fontFamily: "Arial", textAlign: "Left" }}>
                        1. I am aware that the Eulogio "Amang" Rodriguez Institute of Science and Technology (EARIST) has collected and stored my personal data during my admission/enrollment at EARIST. This data includes my demographic profile, contact details like home address, email address, landline numbers, and mobile numbers.
                    </Typography>
                    <Typography style={{ fontSize: "12px", fontFamily: "Arial", textAlign: "Left" }}>
                        2. I agree to personally update these data through personal request from the Office of the registrar.
                    </Typography>
                    <Typography style={{ fontSize: "12px", fontFamily: "Arial", textAlign: "Left" }}>
                        3. In consonance with the above stated Act, I am aware that the University will protect my school records related to my being a student/graduated of EARIST. However, I have the right to authorize a representative to claim the same subject to the policy of the University.
                    </Typography>

                    <Typography style={{ fontSize: "12px", fontFamily: "Arial", textAlign: "Left" }}>
                        4. In order to promote efficient management of the organization’s records, I authorize the University to manage my data for data sharing with industry partners, government agencies/embassies, other educational institutions, and other offices for the university for employment, statistics, immigration, transfer credentials, and other legal purposes that may serve me best.
                    </Typography>
                    < br />
                    <Typography style={{ fontSize: "12px", fontFamily: "Arial", textAlign: "Left" }}>
                        By clicking the submit button, I warrant that I have read, understood all of the above provisions, and agreed to its full implementation.
                    </Typography>
                    <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />
                    < br />
                    <Typography style={{ fontSize: "12px", fontFamily: "Arial", textAlign: "Left" }}>
                        I certify that the information given above are true, complete, and accurate to the best of my knowledge and belief. I promise to abide by the rules and regulations of Eulogio "Amang" Rodriguez Institute of Science and Technology regarding the ECAT and my possible admission. I am aware that any false or misleading information and/or statement may result in the refusal or disqualification of my admission to the institution.
                    </Typography>
                    <div className="App">
                        <Checkbox
                            style={{ fontSize: '12px', fontFamily: 'Arial', textAlign: 'left' }}
                            label="I agree to the terms and conditions"
                        />
                        I agree with Terms and References
                    </div>
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
                            endIcon={<FolderIcon sx={{ color: '#fff' }} />}
                            sx={{
                                backgroundColor: '#6D2323',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#E8C999',
                                },
                            }}
                        >
                            Submit (Save Information)


                        </Button>
                    </Box>
                </Container>

            </form>
        </Container>
    );
};

export default OtherInformation;
