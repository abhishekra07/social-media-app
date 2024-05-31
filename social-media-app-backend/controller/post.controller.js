import query from "../util/db.js";

export const createPost = async (req, res) => {
  try {
    const { id } = req.user;
    const { description, image } = req.body;
    const insertPostQuery = `INSERT INTO posts (user_id, post_img, post_description)
        VALUES ($1, $2, $3)`;
    const values = [id, image, description];
    const post = await query(insertPostQuery, values);
    return res.status(201).json({ success: true, message: "Created Post" });
  } catch (e) {
    console.log("Error : ", e, "Message : ", e.message);
    return res
      .status(500)
      .json({ success: false, status: "Server Error", message: e.message });
  }
};

export const getPosts = async (req, res) => {
  let pageNum = parseInt(req.query.page || "1");
  if (!Number.isInteger(pageNum)) pageNum = 1;
  const limit = 6;
  const offset = (pageNum - 1) * limit;
  const selectAllPostsQuery = `
        SELECT p.*, u.username as user_name 
        FROM posts p 
        INNER JOIN users u ON p.user_id=u.id 
        ORDER BY p.created_at DESC 
        LIMIT $1 OFFSET $2`;

  try {
    const countQuery = "SELECT COUNT(*) FROM posts";
    const countResult = await query(countQuery);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    const postsQueryResult = await query(selectAllPostsQuery, [limit, offset]);
    const posts = postsQueryResult.rows;

    const postObjects = posts.map((post) => ({
      id: post.id,
      userId: post.user_id,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      postImg: post.post_img,
      postDescription: post.post_description,
      userName: post.user_name,
    }));

    return res.status(200).json({
      success: true,
      status: "Success",
      data: postObjects,
      metadata: {
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: pageNum,
        limit: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      success: false,
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const getPostQuery = `
            SELECT p.*, u.username as user_name 
            FROM posts p 
            INNER JOIN users u ON p.user_id = u.id 
            WHERE p.id = $1`;

    const { rows } = await query(getPostQuery, [postId]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, status: "Error", message: "Post not found" });
    }

    const post = rows[0];

    const postObject = {
      id: post.id,
      userId: post.user_id,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      postImg: post.post_img,
      postDescription: post.post_description,
      userName: post.user_name,
    };

    return res
      .status(200)
      .json({ success: true, status: "Success", data: postObject });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({
      success: false,
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { postImg, postDescription } = req.body;

    const updatePostQuery = `
            UPDATE posts 
            SET 
                post_img = $1, 
                post_description = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE 
                id = $3
            RETURNING *`;

    const { rows } = await query(updatePostQuery, [
      postImg,
      postDescription,
      postId,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, status: "Error", message: "Post not found" });
    }

    const updatedPost = rows[0];

    return res
      .status(200)
      .json({ success: true, status: "Success", data: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      success: false,
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Begin transaction
    await query("BEGIN");

    const deleteCommentsQuery = `
            DELETE FROM comments 
            WHERE post_id = $1`;
    await query(deleteCommentsQuery, [postId]);

    const deleteLikesQuery = `
            DELETE FROM likes 
            WHERE post_id = $1`;

    await query(deleteLikesQuery, [postId]);

    const deletePostQuery = `
            DELETE FROM posts 
            WHERE id = $1
            RETURNING *`;

    const { rows } = await query(deletePostQuery, [postId]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, status: "Error", message: "Post not found" });
    }

    // Commit transaction
    await query("COMMIT");

    return res.status(200).json({
      success: true,
      status: "Success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    await query("ROLLBACK");
    console.error("Error deleting post:", error);
    return res.status(500).json({
      success: false,
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
