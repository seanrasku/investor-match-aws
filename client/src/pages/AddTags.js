import { addTag, allTags, deleteTag } from "../actions/tag";
import { AuthContext } from "../App";
import { useContext, useState, useEffect } from "react";
import Tag from "../components/Tag";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddTags() {
  const { auth, setAuth } = useContext(AuthContext);
  const [tags, setTags] = useState({});
  useEffect(() => {
    const getTags = async () => {
      const res = await allTags(auth.token);
      setTags(res);
    };
    getTags();
  }, []);

  const handleTagAdd = async (tag) => {
    const check = auth.userInfo.tags.some(
      (t) => t.name === tag.name && t.community === tag.community
    );
    if (check) {
      toast.error("Tag already exists!");
      return;
    }
    try {
      const added = await addTag(
        auth.token,
        auth.userInfo._id,
        tag.name,
        tag._id
      );
      setAuth({ token: auth.token, userInfo: added.data });
      toast.success(`${tag.name} added to your tags!`);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleTagDelete = async (tag) => {
    try {
      const deleted = await deleteTag(auth.token, auth.userInfo._id, tag._id);
      setAuth({ token: auth.token, userInfo: deleted.data });
      console.log(deleted);
      toast.success(`${tag.name} deleted successfully!`);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {tags.data?.map((t) => (
        <div style={{ display: "flex", padding: "10px" }}>
          <Tag key={t.id} name={t.name} />
          <button
            onClick={() => handleTagAdd(t)}
            style={{
              marginLeft: "10px",
              background: "green",
              marginTop: "10px",
              border: "2px solid black",
              borderRadius: "5px",
              width: "60px",
            }}
          >
            Add
          </button>
          <button
            onClick={() => handleTagDelete(t)}
            style={{
              marginLeft: "10px",
              background: "red",
              marginTop: "10px",
              border: "2px solid black",
              borderRadius: "5px",
              width: "60px",
            }}
          >
            Del
          </button>
        </div>
      ))}
    </div>
  );
}
