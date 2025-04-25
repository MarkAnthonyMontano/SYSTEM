import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Dashboard } from '@mui/icons-material';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SideBar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Register from './components/Register';
import Login from './components/Login';
import AdmissionDashboard from './pages/Adm_Dashboard';
import EnrolledDashboard from './pages/Erlm_Dashboard';
import StudentPage from './pages/Erlm_Student_Page';

// Department Modules
import DepartmentRegistration from './components/DprtmntRegistration';
import DepartmentRoom from './components/DprtmntRoom';
import DepartmentProf from './components/DprtmntProf';
import DepartmentCourse from './components/DprtmntCourse';
import ProgramTagging from './components/ProgramTagging';
import CourseManagement from './components/CourseManagement';
import CoursePanel from './components/CoursePanel';
import ProgramPanel from './components/ProgramPanel';
import CurriculumPanel from './components/CurriculumPanel';
import SectionPanel from './components/SectionPanel';
import DepartmentSection from './components/DepartmentSection';


// Forms
import AdmForm from './components/adm_form';
import ApplicantForm from './components/Applicant';
import HealthMedicalRecords from './components/HealthMedicalRecords';
import ApplicantRequirement from './components/applicant_requirement';
import StudentProfileForm from './components/StudentProfile';
import CertificateOfRegistration from './components/CertificateOfRegistration';
import EducationalAttainmentForm from './components/EducationalAttainment';
import FamilyBackgroundForm from './components/FamilyBackground';
import OtherInformation from './components/OtherInformation';
import UploadPhoto from './components/UploadPhoto';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchAuthentication = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    fetchAuthentication();
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <header>
          <Navbar isAuthenticated={isAuthenticated} />
        </header>

        <div className="app-format">
          {isAuthenticated && (
            <article>
              <SideBar setIsAuthenticated={setIsAuthenticated} />
            </article>
          )}

          <main>
            <Routes>
              <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admission_dashboard" element={<ProtectedRoute><AdmissionDashboard /></ProtectedRoute>} />
              <Route path="/enrollment_dashboard" element={<ProtectedRoute><EnrolledDashboard /></ProtectedRoute>} />
              <Route path="/enrolled_student" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />

              <Route path="/room_registration" element={<ProtectedRoute><DepartmentRoom /></ProtectedRoute>} />
         
              <Route path="/course_registration" element={<ProtectedRoute><DepartmentCourse /></ProtectedRoute>} />
              <Route path="/course_management" element={<ProtectedRoute><CourseManagement /></ProtectedRoute>} />
              <Route path="/program_tagging" element={<ProtectedRoute><ProgramTagging /></ProtectedRoute>} />
              <Route path="/course_panel" element={<ProtectedRoute><CoursePanel /></ProtectedRoute>} />
              <Route path="/program_panel" element={<ProtectedRoute><ProgramPanel /></ProtectedRoute>} />
              <Route path="/department_section_panel" element={<ProtectedRoute><DepartmentSection /></ProtectedRoute>} />
              <Route path="/curriculum_panel" element={<ProtectedRoute><CurriculumPanel /></ProtectedRoute>} />
              <Route path="/department_registration" element={<ProtectedRoute><DepartmentRegistration /></ProtectedRoute>} />
              <Route path="/section_panel" element={<ProtectedRoute><SectionPanel /></ProtectedRoute>} />
              <Route path="/professor_registration" element={<ProtectedRoute><DepartmentProf /></ProtectedRoute>} />

              {/* Forms */}
              <Route path="/adm_form" element={<ProtectedRoute><AdmForm /></ProtectedRoute>} />
              <Route path="/applicant" element={<ProtectedRoute><ApplicantForm /></ProtectedRoute>} />
              <Route path="/applicant_requirement" element={<ProtectedRoute><ApplicantRequirement /></ProtectedRoute>} />
              <Route path="/student_profile" element={<ProtectedRoute><StudentProfileForm /></ProtectedRoute>} />
              <Route path="/educ_attainment" element={<ProtectedRoute><EducationalAttainmentForm /></ProtectedRoute>} />
              <Route path="/health_medical_records" element={<ProtectedRoute><HealthMedicalRecords /></ProtectedRoute>} />
              <Route path="/other_information" element={<ProtectedRoute><OtherInformation /></ProtectedRoute>} />
              <Route path="/family_background" element={<ProtectedRoute><FamilyBackgroundForm /></ProtectedRoute>} />
              <Route path="/certificateofregistration" element={<ProtectedRoute><CertificateOfRegistration /></ProtectedRoute>} />
              <Route path="/upload_photo" element={<ProtectedRoute><UploadPhoto /></ProtectedRoute>} />

            </Routes>
          </main>
        </div>

        <footer>
          <Footer />
        </footer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
