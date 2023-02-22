import React, { useEffect, useState } from "react";
import note from "./../img/note.png";

const addLocalHost = () => {
  let data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(localStorage.getItem("data"));
  }
};

const Todolist = () => {
  const [itemAdd, setItemAdd] = useState("");
  const [addMore, setAddMore] = useState(addLocalHost());
  const [getId, setGetId] = useState(null);
  const [icon, setIcon] = useState(false);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(addMore));
  }, [addMore]);

  const addOne = () => {
    if(itemAdd && icon){
      setAddMore((old)=>{
        return(
          old.map((val)=>{
            if(val.id === getId){
              return {...val,text:itemAdd}
            }
            return val
          })
        )
      })
      setItemAdd("");
      setIcon(false);
    }else if(itemAdd){
      setAddMore((pre) => {
        let setKey = { id: Date.now(), text: itemAdd };
        return [...pre, setKey];
      });
      setItemAdd("");
    }else{
      alert("Plz! add value")
    }
  };

  const oneDelete = (i) => {
    setAddMore((old) => {
      return old.filter((value) => {
        return value.id !== i;
      });
    });
  };

  const oneEdit = (id,text) => {
    setGetId(id);
    setIcon(true);
    setItemAdd(text)
  };

  return (
    <>
      <section className="main">
        <div className="container">
          <img src={note} alt="note" />
          <div className="input">
            <input
              type="text"
              placeholder="✍️ update list"
              value={itemAdd}
              onChange={(val) => {
                setItemAdd(val.target.value);
              }}
            />
            {icon ? (
              <div id="pen" onClick={addOne}>
                <i className="fa-solid fa-file-pen"></i>
              </div>
            ) : (
              <span id="add" onClick={addOne}>
                <i className="fa-solid fa-plus"></i>
              </span>
            )}
          </div>
          {addMore.map((value) => {
            return (
              <div className="add" key={value.id}>
                <h2>{value.text}</h2>
                <div className="more">
                  <span
                    id="edit"
                    onClick={() => {
                      oneEdit(value.id,value.text);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                  <span
                    id="delete"
                    onClick={() => {
                      oneDelete(value.id);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div
        className="btn"
        onClick={() => {
          setAddMore([]);
        }}
      >
        <p
          aria-label="Thanks"
          className="h-button centered"
          data-text="Hi, there"
        >
          <span>d</span>
          <span>e</span>
          <span>l</span>
          <span>e</span>
          <span>t</span>
          <span>e</span>
          <span> </span>
          <span>a</span>
          <span>l</span>
          <span>l</span>
        </p>
      </div>
    </>
  );
};

export default Todolist;
