require("dotenv").config();
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const exp = require("express");
const cors = require("cors");
const {
    MongoClient,
    ObjectId,
    ServerApiVersion
} = require("mongodb");

const app = exp();

app.use(exp.json());
app.use(cors());

const url = process.env.MONGO_URI;

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function startservr() {

    try {

        // CONNECT MONGODB
        await client.connect();

        console.log("MongoDB connected!");

        const db = client.db("school");
        const usercollection = db.collection("students");


        // ==========================================
        // GET ALL STUDENTS
        // ==========================================

        app.get("/users", async (req, res) => {

            try {

                const students = await usercollection
                    .find()
                    .toArray();

                res.json(students);

            } catch (error) {

                console.log("Get students error:", error);

                res.status(500).json({
                    message: "Failed to get students"
                });
            }
        });


        // ==========================================
        // GET STUDENT BY ID
        // ==========================================

        app.get("/users/:id", async (req, res) => {

            try {

                const id = req.params.id;

                const student = await usercollection.findOne({
                    _id: new ObjectId(id)
                });

                if (!student) {

                    return res.status(404).json({
                        message: "Student not found"
                    });
                }

                res.json(student);

            } catch (error) {

                console.log("Get student error:", error);

                res.status(500).json({
                    message: "Failed to get student details"
                });
            }
        });


        // ==========================================
        // GET STUDENTS BY COURSE
        // ==========================================

        app.get("/course/:course", async (req, res) => {

            try {

                const course = req.params.course;

                const students = await usercollection.find({
                    course: {
                        $regex: `^${course}$`,
                        $options: "i"
                    }
                }).toArray();

                res.json(students);

            } catch (error) {

                console.log("Course error:", error);

                res.status(500).json({
                    message: "Failed to get course students"
                });
            }
        });


        // ==========================================
        // GET STUDENT BY NAME
        // ==========================================

        app.get("/username/:name", async (req, res) => {

            try {

                const name = req.params.name;

                const student = await usercollection.findOne({
                    name: name
                });

                res.json(student);

            } catch (error) {

                console.log("Name search error:", error);

                res.status(500).json({
                    message: "Failed to find student"
                });
            }
        });


        // ==========================================
        // ADD STUDENT
        // ==========================================

        app.post("/adduser", async (req, res) => {

            try {

                const { name, age, course } = req.body;


                // NAME VALIDATION
                if (!name || name.trim().length < 3) {

                    return res.status(400).json({
                        message: "Name must contain at least 3 characters"
                    });
                }


                // AGE VALIDATION
                const studentAge = Number(age);

                if (studentAge < 15 || studentAge > 100) {

                    return res.status(400).json({
                        message: "Age must be between 15 and 100"
                    });
                }


                // COURSE VALIDATION
                if (!course || !course.trim()) {

                    return res.status(400).json({
                        message: "Please select a course"
                    });
                }


                // DUPLICATE CHECK
                const existingStudent = await usercollection.findOne({
                    name: name.trim()
                });

                if (existingStudent) {

                    return res.status(409).json({
                        message: "Student already exists"
                    });
                }


                // STUDENT OBJECT
                const student = {

                    name: name.trim(),
                    age: studentAge,
                    course: course.trim()

                };


                // INSERT
                const result = await usercollection.insertOne(student);


                res.status(201).json({

                    message: "Student added successfully",

                    insertedId: result.insertedId

                });

            } catch (error) {

                console.log("Add student error:", error);

                res.status(500).json({
                    message: "Failed to add student"
                });
            }
        });


        // ==========================================
        // UPDATE STUDENT BY ID
        // ==========================================

        app.put("/users/:id", async (req, res) => {

            try {

                const id = req.params.id;

                const { name, age, course } = req.body;


                // NAME VALIDATION
                if (!name || name.trim().length < 3) {

                    return res.status(400).json({
                        message: "Name must contain at least 3 characters"
                    });
                }


                // AGE VALIDATION
                const studentAge = Number(age);

                if (studentAge < 15 || studentAge > 100) {

                    return res.status(400).json({
                        message: "Age must be between 15 and 100"
                    });
                }


                // COURSE VALIDATION
                if (!course || !course.trim()) {

                    return res.status(400).json({
                        message: "Please enter a course"
                    });
                }


                // UPDATE BY ID
                const result = await usercollection.updateOne(

                    {
                        _id: new ObjectId(id)
                    },

                    {
                        $set: {

                            name: name.trim(),
                            age: studentAge,
                            course: course.trim()

                        }
                    }
                );


                // STUDENT NOT FOUND
                if (result.matchedCount === 0) {

                    return res.status(404).json({
                        message: "Student not found"
                    });
                }


                // SUCCESS
                res.json({

                    message: "Student updated successfully"

                });

            } catch (error) {

                console.log("Update error:", error);

                res.status(500).json({
                    message: "Update failed"
                });
            }
        });


        // ==========================================
        // DELETE STUDENT BY ID
        // ==========================================

        app.delete("/users/:id", async (req, res) => {

            try {

                const id = req.params.id;

                const result = await usercollection.deleteOne({

                    _id: new ObjectId(id)

                });


                // STUDENT NOT FOUND
                if (result.deletedCount === 0) {

                    return res.status(404).json({
                        message: "Student not found"
                    });
                }


                // SUCCESS
                res.json({

                    message: "Student deleted successfully"

                });

            } catch (error) {

                console.log("Delete error:", error);

                res.status(500).json({
                    message: "Delete failed"
                });
            }
        });


        // ==========================================
        // SERVER
        // ==========================================

        app.listen(3000, () => {

            console.log(
                "Server running on http://localhost:3000"
            );

        });


    } catch (error) {

        console.log("Server error:", error);

    }
}


startservr();