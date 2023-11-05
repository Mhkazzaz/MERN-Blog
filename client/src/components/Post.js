
const Post = () => {
  return (
    <div className="post">
      <div className="img">
        <img
          src="https://media.istockphoto.com/id/537331500/photo/programming-code-abstract-technology-background-of-software-deve.jpg?b=1&s=612x612&w=0&k=20&c=B1O_UHuhlV34GJnQxQgxGDqmtBKMJkMf_FGssI1WEVE="
          alt=""
        />
      </div>
      <div className="text">
        <h2>Lorem ipsum dolor sit</h2>
        <p className="info">
          <a href="_" className="author">John Doe</a>
          <time>2023-10-24</time>
        </p>
        <p className="summary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default Post;
