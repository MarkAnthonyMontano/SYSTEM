import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const DepartmentRoom = () => {
  const [room, setRoom] = useState({
    room_name: "",
    department_id: "",
  });

  const [departmentList, setDepartmentList] = useState([]);
  const [departmentRoomList, setDepartmentRoomList] = useState([]);
  const [expandedDepartmentRoom, setExpandedDepartmentRoom] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get_department");
      setDepartmentList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoom = async (departmentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get_room?department_id=${departmentId}`
      );
      setDepartmentRoomList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  useEffect(() => {
    if (selectedDepartmentId) {
      fetchRoom(selectedDepartmentId);
    }
  }, [selectedDepartmentId]);

  const handleAddingRoom = async () => {
    try {
      await axios.post("http://localhost:5000/room", room);
      fetchRoom(selectedDepartmentId);
      setRoom({ room_name: "", department_id: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangesForEverything = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropDownForRooms = (departmentId) => {
    setSelectedDepartmentId(departmentId);
    setExpandedDepartmentRoom(
      expandedDepartmentRoom === departmentId ? null : departmentId
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add Room to Department
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Room Name"
            name="room_name"
            value={room.room_name}
            onChange={handleChangesForEverything}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            select
            fullWidth
            label="Select Department"
            name="department_id"
            value={room.department_id}
            onChange={handleChangesForEverything}
          >
            <MenuItem value="">-- Select Department --</MenuItem>
            {departmentList.map((department) => (
              <MenuItem key={department.dprtmnt_id} value={department.dprtmnt_id}>
                {department.dprtmnt_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" onClick={handleAddingRoom} fullWidth>
            Save
          </Button>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Departments and Rooms
        </Typography>

        {departmentList.map((department) => (
          <Accordion
            key={department.dprtmnt_id}
            expanded={expandedDepartmentRoom === department.dprtmnt_id}
            onChange={() => handleDropDownForRooms(department.dprtmnt_id)}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1">{department.dprtmnt_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expandedDepartmentRoom === department.dprtmnt_id &&
              departmentRoomList.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {departmentRoomList.map((room) => (
                    <Chip
                      key={room.room_id}
                      label={`Room ${room.room_description}`}
                      color="secondary"
                      sx={{ fontWeight: "bold" }}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">No rooms available.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default DepartmentRoom;
