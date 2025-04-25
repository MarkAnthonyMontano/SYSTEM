import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  TextField,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

const HealthMedicalRecords = () => {
  const steps = [
    { label: 'Personal Information', icon: <PersonIcon />, path: '/applicant' },
    { label: 'Family Background', icon: <FamilyRestroomIcon />, path: '/family_background' },
    { label: 'Educational Attainment', icon: <SchoolIcon />, path: '/educ_attainment' },
    { label: 'Health Medical Records', icon: <HealthAndSafetyIcon />, path: '/health_medical_records' },
    { label: 'Other Information', icon: <InfoIcon />, path: '/other_information' },
  ];


  const [activeStep, setActiveStep] = useState(3);
  const handleStepClick = (index) => setActiveStep(index);

  return (
    <Container maxWidth="lg">
      <h1 style={{ textAlign: "center", color: "maroon", marginTop: "-50px" }}>APPLICANT FORM</h1>
      <div style={{ textAlign: "Center", }}>Complete the applicant form to secure your place for the upcoming academic year at EARIST.</div>
      < br />
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
      < br />

      <Container maxWidth="100%" sx={{ backgroundColor: "#6D2323", color: "white", borderRadius: 2, boxShadow: 3, padding: "4px" }}>
        <Box sx={{ width: "100%" }}>
          <Typography style={{ fontSize: "15px", padding: "10px" }}>Step 4: HEALTH AND MEDICAL RECORD</Typography>
        </Box>
      </Container>




      <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2, boxShadow: 2 }}>
        <style>
          {`
            .custom-radio {
              appearance: none;
              -webkit-appearance: none;
              background-color: rgb(165, 165, 165); 
              border: 1px solid #000;
              width: 16px;
              height: 16px;
              cursor: pointer;
              position: relative;
              border-radius: 2px;
              display: inline-block;
              margin: 0 4px;
              transition: background-color 0.2s ease;
            }

            .custom-radio:checked {
              background-color: rgb(65, 63, 63);
            }

            .custom-radio:checked::after {
              content: '✔';
              position: absolute;
              top: -1px;
              left: 2px;
              font-size: 14px;
              color: white;
            }

            textarea, input[type="text"], input[type="date"] {
              width: 100%;
              padding: 8px;
              font-size: 14px;
              border: 1px solid #ccc;
              border-radius: 8px;
              background-color: white;
              color: black;
              box-sizing: border-box;
            }
          `}
        </style>

        <div style={{ paddingRight: '10px' }}>

          <form style={{ maxWidth: "1500px", margin: "0 auto", fontSize: "14px" }}>
            <Typography style={{ fontSize: "20px", color: "#6D2323", fontWeight: "bold", textAlign: "Left" }}>
              HEALTH AND MEDICAL RECORD:
            </Typography>
            <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />

            {/* Section I */}
            <div style={{ marginBottom: "16px" }}>
              <p style={{ marginBottom: "8px" }}>
                I. Do you have any of the following symptoms today?{" "}
                <label style={{ marginLeft: "8px" }}>
                  <input type="checkbox" className="custom-radio" style={{ marginLeft: "100px" }} />
                  Cough
                </label>
                <label style={{ marginLeft: "16px" }}>
                  <input type="checkbox" className="custom-radio" style={{ marginLeft: "100px" }} />
                  Colds
                </label>
                <label style={{ marginLeft: "16px" }}>
                  <input type="checkbox" className="custom-radio" style={{ marginLeft: "100px" }} />
                  Fever
                </label>
              </p>
            </div>






            {/* Section II - Medical History */}
            <div style={{ marginBottom: "16px", overflow: "auto" }}>
              <p style={{ marginBottom: "8px", fontWeight: "600" }}>
                II. MEDICAL HISTORY: Have you suffered from, or been told you had, any of the following conditions:
              </p>

              <table
                style={{
                  width: "100%",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    {[...Array(3)].map((_, index) => (
                      <React.Fragment key={index}>
                        <td
                          colSpan={20}
                          style={{
                            height: "0.25in",
                            fontSize: "100%",
                            border: "1px solid black",
                          }}
                        ></td>
                        <td
                          colSpan={8}
                          style={{
                            height: "0.25in",
                            fontSize: "100%",
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          <div>Yes No</div>
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>

                  {[
                    "Asthma",
                    "Fainting Spells and seizures",
                    "Heart Disease",
                    "Tuberculosis",
                    "Frequent Headaches",
                    "Hernia",
                    "Chronic cough",
                    "Head or neck injury",
                    "H.I.V",
                    "High blood pressure",
                    "Diabetes Mellitus",
                    "Allergies",
                    "Cancer",
                    "Smoking of cigarette/day",
                    "Alcohol Drinking"
                  ].reduce((rows, label, index) => {
                    if (index % 3 === 0) rows.push([]);
                    rows[rows.length - 1].push({ label, index });
                    return rows;
                  }, []).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map(({ label, index }) => (
                        <React.Fragment key={index}>
                          <td
                            colSpan={20}
                            style={{
                              height: "0.25in",
                              fontSize: "100%",
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            {label}
                          </td>
                          <td
                            colSpan={8}
                            style={{
                              height: "0.25in",
                              fontSize: "100%",
                              border: "1px solid black",
                              textAlign: "center",
                              padding: "8px",
                            }}
                          >
                            <label style={{ marginLeft: "5px" }}>
                              <input
                                className="custom-radio"
                                type="radio"
                                name={`q${index}`}
                                value="yes"
                              />
                            </label>
                            <label style={{ marginLeft: "8px" }}>
                              <input
                                className="custom-radio"
                                type="radio"
                                name={`q${index}`}
                                value="no"
                              />
                            </label>
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>






            {/* Hospitalization history */}
            <div className="mt-4">
              <label className="inline-block mr-2">
                Do you have any previous history of hospitalization or operation?
              </label>

              <span className="inline-flex items-center ml-6 mr-2"> NO</span>
              <label>
                <input
                  type="radio"
                  className="custom-radio"
                  name="hospitalization"
                  value="no"
                />
              </label>

              <span className="inline-flex items-center ml-4 mr-2">YES</span>
              <label>
                <input
                  type="radio"
                  className="custom-radio"
                  name="hospitalization"
                  value="yes"
                />
              </label>
            </div>


            <div style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "8px" }}>IF YES, PLEASE SPECIFY:</label>
              <input
                type="text"
                style={{
                  width: "50%",
                  padding: "8px",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "black",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                placeholder=""
              />
            </div>

            <div style={{ marginTop: "16px" }}>
              <p>III. MEDICATIONS:</p>
              <textarea
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "black",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
                rows="2"
                placeholder=""
              />
            </div>




         {/* IV. COVID PROFILE */}
<div>
  <p style={{ fontWeight: "600",  }}>IV. COVID PROFILE:</p>
  <table
    style={{
      border: "1px solid black",
      borderCollapse: "collapse",
      fontFamily: "Arial, Helvetica, sans-serif",
      width: "100%",
      tableLayout: "fixed",
    }}
  >
    <tbody>
      {/* A. History of COVID */}
      <tr>
        <td
          style={{
            height: "90px",
            fontSize: "100%",
            border: "1px solid black",
            padding: "8px",
          }}
        >
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={2}>
            <span>A. Do you have history of COVID-19?</span>
            <Box display="flex" alignItems="center" gap={1}>
              <label>
                <input
                  type="radio"
                  name="covidHistory"
                  value="yes"
                  className="custom-radio"
                />{" "}
                YES
              </label>
              <label>
                <input
                  type="radio"
                  name="covidHistory"
                  value="no"
                  className="custom-radio"
                />{" "}
                NO
              </label>
            </Box>
            <span style={{ marginLeft: "30px" }}>IF YES, WHEN:</span>
            <TextField
              label="Select Date"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              required
              style={{ width: "200px", }}
            
            />
          </Box>
        </td>
      </tr>
   



                  {/* B. COVID Vaccinations */}
                  <tr>
                    <td
                      style={{
                        fontSize: "100%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      <div style={{ fontWeight: "600", marginBottom: "8px" }}>
                        B. COVID Vaccinations:
                      </div>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          tableLayout: "fixed",
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ textAlign: "left", width: "20%" }}></th>
                            <th style={{ textAlign: "center" }}>1st Dose</th>
                            <th style={{ textAlign: "center" }}>2nd Dose</th>
                            <th style={{ textAlign: "center" }}>Booster 1</th>
                            <th style={{ textAlign: "center" }}>Booster 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: "4px 0" }}>Brand</td>
                            {[...Array(4)].map((_, i) => (
                              <td key={i} style={{ padding: "4px" }}>
                                <input
                                  type="text"
                                  style={{
                                    width: "100%",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "6px",
                                    boxSizing: "border-box",
                                    backgroundColor: "white",
                                    color: "black",
                                  }}
                                />
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td style={{ padding: "4px 0" }}>Date</td>
                            {[...Array(4)].map((_, i) => (
                              <td key={i} style={{ padding: "4px" }}>
                                <input
                                  type="date"
                                  style={{
                                    width: "100%",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "6px",
                                    boxSizing: "border-box",
                                    backgroundColor: "white",
                                    color: "black",
                                  }}
                                />
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


            {/* V. Test Results */}
            <div>
              <p style={{ fontWeight: "600" }}>V. Please Indicate Result of the Following:</p>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  {[
                    "Chest X-ray",
                    "Complete Blood Count (CBC)",
                    "Urinalysis",
                    "Others (Please specify work-ups and results)",
                  ].map((label, i) => (
                    <tr key={i}>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                          width: "30%",
                          fontSize: "100%",
                        }}
                      >
                        {label}:
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                          width: "70%",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "6px",
                            boxSizing: "border-box",
                            backgroundColor: "white",
                            color: "black",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            {/* VI. Diagnosis */}
            <div>
              <p style={{ fontWeight: "600" }}>VI. Diagnosis:</p>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        fontSize: "100%",
                      }}
                    >
                      Do you have any of the following symptoms today?
                      <div style={{ marginTop: "8px" }}>
                        <label style={{ marginRight: "20px" }}>
                          <input
                            type="checkbox"
                            name="physically_fit"
                            value="physically_fit"
                            className="custom-radio"
                          />{" "}
                          Physically Fit
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            name="compliance"
                            value="compliance"
                            className="custom-radio"
                          />{" "}
                          For Compliance
                        </label>
                      </div>
                    </td>
                  </tr>


                </tbody>
              </table>
            </div>

            {/* VII. Remarks */}
            <div style={{ marginTop: "16px" }}>
              <p style={{ fontWeight: "600" }}>VII. Remarks:</p>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      <textarea
                        rows="2"
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "8px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          color: "black",
                          resize: "none",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
        < br/>
        <hr style={{ color: "yellow" }} className="my-4 border-t border-red-300" />
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
            to="/other_information" // The path where the button will link to
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
      </Box>

    </Container>

  );
};

export default HealthMedicalRecords;
