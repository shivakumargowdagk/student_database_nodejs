const Student = require('../models/student_db');

exports.createStudent = ((req, res, next) => {
    let { studentId, name, standard, marks } = req.body;
    const { english, hindi, kannada, mathematics, science, socialScience } = marks;

    let errors = [];
    const isInteger = (value) => {
        return /^(\d+|0)$/.test(value);
    };
    const isAlphabetsOnly = (value) => {
        return /^[a-zA-Z ]+$/.test(value);
    };
    if (!isInteger(studentId)) {
        errors.push("StudentId must be a non-empty integer");
    }
    if (!isAlphabetsOnly(name)) {
        errors.push("Name must be a non-empty string containing only alphabets");
    }

    if (!isInteger(standard)) {
        errors.push("Standard must be a non-empty integer");
    }
    if (!isInteger(english)) {
        errors.push("Please Enter Valid English Marks");
    }
    if (!isInteger(hindi)) {
        errors.push("Please Enter Valid hindi Marks");
    }
    if (!isInteger(kannada)) {
        errors.push("Please Enter Valid kannada Marks");
    }
    if (!isInteger(mathematics)) {
        errors.push("Please Enter Valid Mathematics Marks");
    }
    if (!isInteger(science)) {
        errors.push("Please Enter Valid Social Marks");
    }
    if (!isInteger(socialScience)) {
        errors.push("Please Enter Valid socialScience Marks");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    Student.findOne({ studentId: studentId })
        .then((data) => {
            if (data) {
                errors.push('StudentId is already present')
                res.status(200).json({ errors });
            }
            else {
                const student = new Student({
                    studentId: studentId,
                    name: name,
                    standard: standard,
                    marks: {
                        english: english,
                        hindi: hindi,
                        kannada: kannada,
                        mathematics: mathematics,
                        science: science,
                        socialScience: socialScience
                    }
                })
                student.save().then((result) => {
                    res.status(200).json(result)
                })
            }
        })
});

exports.getAllStudents = (req, res, next) => {
    Student.find({ isDeleted: false })
        .then((data) => {
            if (data.length > 0) { 
                res.json(data);
            } else {
                res.send('Student list not present');
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while fetching student data');
        });
}

exports.deleteStudent = (req, res, next) => {
    const studentId = req.params.studentId; 

    Student.findOneAndUpdate(
        { studentId: studentId }, 
        { $set: { isDeleted: true } },
        { new: true }
    )
        .then((data) => {
            if (data) {
                res.json(data);
            } else {
                res.json('Student not found');
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while updating student data');
        });
}

exports.viewStudentById = (req, res, next) => {
    const studentId = req.params.studentId;
    Student.findOne({ studentId: studentId, isDeleted: false })
        .then((data) => {
            if (!data) {
                res.json('Student not found');
            }
            else {
                res.json(data)
            }
        })
}

exports.updateStudentById = (req, res, next) => {
    const studentId = req.params.studentId;

    let errors = [];
    const isInteger = (value) => {
        return /^(\d+|0)$/.test(value);
    };
    const isAlphabetsOnly = (value) => {
        return /^[a-zA-Z ]+$/.test(value);
    };
    Student.findOne({ studentId: studentId })
        .then((data) => {
            if (!data) {
                res.json("Student Not Present");
            } else {
                data.name = req.body.name;
                data.standard = req.body.standard;
                data.marks.english = req.body.marks.english;
                data.marks.hindi = req.body.marks.hindi;
                data.marks.mathematics = req.body.marks.mathematics;
                data.marks.science = req.body.marks.science;
                data.marks.socialScience = req.body.marks.socialScience;

                if (!isAlphabetsOnly(data.name)) {
                    errors.push("Name must be a non-empty string containing only alphabets");
                }

                if (!isInteger(data.standard)) {
                    errors.push("Standard must be a non-empty integer");
                }
                if (!isInteger(data.marks.english)) {
                    errors.push("Please Enter Valid English Marks");
                }
                if (!isInteger(data.marks.hindi)) {
                    errors.push("Please Enter Valid hindi Marks");
                }
                if (!isInteger(data.marks.kannada)) {
                    errors.push("Please Enter Valid kannada Marks");
                }
                if (!isInteger(data.marks.mathematics)) {
                     errors.push("Please Enter Valid Mathematics Marks");
                }
                if (!isInteger(data.marks.science)) {
                    errors.push("Please Enter Valid Social Marks");
                }
                if (!isInteger(data.marks.socialScience)) {
                errors.push("Please Enter Valid socialScience Marks");
                }

                if (errors.length > 0) {
                    return res.status(400).json({ errors });
                }
                else {
                    
                    data.save()
                    .then((updatedData) => {
                        res.send(updatedData);
                     })
                }
            }
        })       
}


