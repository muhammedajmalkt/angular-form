import Student from "../Model/StudentModel.js";

// create-student
export const createStudent = async (req, res) => {
  try {
    const { name, email, age, place } = req.body;

    const exists = await Student.findOne({ email });
    if (exists) return res.status(400).json({ error: "Student already exists with this email" });

    const student = new Student({ name, email, age, place });
    await student.save();

    res.status(201).json({ message: "Student added", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update 
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, place } = req.body;

    const updated = await Student.findByIdAndUpdate(
      id,
      { name, email, age, place },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Student not found" });

    res.json({ message: "Student updated", student: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Student not found" });

    res.json({ message: "Student deleted", student: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
