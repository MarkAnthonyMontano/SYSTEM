import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Card,
    CardContent,
    IconButton,
    InputAdornment
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const DepartmentProf = () => {
    const [prof, setProf] = useState({
        fname: '',
        mname: '',
        lname: '',
        password: '',
        department_id: '',
    });

    const [profList, setProfList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [expandedDepartmentProf, setExpandedDepartmentProf] = useState(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const fetchDepartment = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get_department');
            setDepartmentList(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProf = async (departmentId) => {
        try {
            const response = await axios.get(`http://localhost:5000/get_prof?department_id=${departmentId}`);
            setProfList(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDepartment();
    }, []);

    useEffect(() => {
        if (selectedDepartmentId) {
            fetchProf(selectedDepartmentId);
        }
    }, [selectedDepartmentId]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setProf(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfRegistration = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/register_prof', prof);
            fetchProf(selectedDepartmentId);
            setProf({ fname: '', mname: '', lname: '', password: '', department_id: '' });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDropDownForProf = (departmentId) => {
        setExpandedDepartmentProf(expandedDepartmentProf === departmentId ? null : departmentId);
    };

    const statusConverter = (status) => {
        return status === 0 ? "Active" : "Inactive";
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4,}}>
            <Typography variant="h4" gutterBottom>Professor Registration</Typography>

            <Card variant="outlined" sx={{ p: 3, mb: 4 }}>
                <form onSubmit={handleProfRegistration}>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
                        <TextField label="First Name" name="fname" value={prof.fname} onChange={handleChanges} fullWidth />
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={prof.password}
                            onChange={handleChanges}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            select
                            label="Department"
                            name="department_id"
                            value={prof.department_id}
                            onChange={handleChanges}
                            fullWidth
                        >
                            <MenuItem value="">Select a Department</MenuItem>
                            {departmentList.map(dept => (
                                <MenuItem key={dept.dprtmnt_id} value={dept.dprtmnt_id}>
                                    {dept.dprtmnt_name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                        Register
                    </Button>
                </form>
            </Card>

            <Typography variant="h5" gutterBottom>Professors by Department</Typography>
            {departmentList.map((department) => (
                <Card key={department.dprtmnt_id} variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" onClick={() => {
                            setSelectedDepartmentId(department.dprtmnt_id);
                            handleDropDownForProf(department.dprtmnt_id);
                        }} sx={{ cursor: 'pointer' }}>
                            <Typography variant="h6">{department.dprtmnt_name}</Typography>
                            <IconButton size="small">
                                {expandedDepartmentProf === department.dprtmnt_id ? <ArrowDropUp /> : <ArrowDropDown />}
                            </IconButton>
                        </Box>

                        {expandedDepartmentProf === department.dprtmnt_id && (
                            profList.length > 0 ? (
                                <Table size="small" sx={{ mt: 2 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>First Name</TableCell>
                                            <TableCell>Middle Name</TableCell>
                                            <TableCell>Last Name</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {profList.map(prof => (
                                            <TableRow key={prof.prof_id}>
                                                <TableCell>{prof.prof_id}</TableCell>
                                                <TableCell>{prof.fname}</TableCell>
                                                <TableCell>{prof.mname}</TableCell>
                                                <TableCell>{prof.lname}</TableCell>
                                                <TableCell>{statusConverter(prof.status)}</TableCell>
                                                <TableCell>
                                                    <Button variant="outlined" size="small" color="primary" sx={{ mr: 1 }}>Edit</Button>
                                                    <Button variant="outlined" size="small" color="error">Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Typography variant="body2" sx={{ mt: 2 }}>No Registered Professors.</Typography>
                            )
                        )}
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default DepartmentProf;
