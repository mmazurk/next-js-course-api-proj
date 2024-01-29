import { useEffect, useState } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const eventId = props.eventId;

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const response = await fetch(`/api/comments/${eventId}`);
      const data = await response.json();
      console.log("data fetched", data);
      setComments(data.comments);
    }
    loadData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p className={classes.comments}>Loading...</p>;
  }

  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
