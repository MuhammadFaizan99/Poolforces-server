const { blogModel } = require("../model/blogSch");

const createBlog = async (req, res) => {
  try {
    const { UserName , CreationDate , BlogName, BlogDescription } = req.body;
    const Image = req.file ? req.file.filename : null;

    const newBlog = new blogModel({
      BlogName,
      BlogDescription,
      UserName,
      CreationDate, // Include the CreationDate field
      Image,
    });

    await newBlog.save();

    return res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.error("Error creating Blog:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find()
    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createBlog, getBlogs };
