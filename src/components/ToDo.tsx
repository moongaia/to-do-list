import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ToDoContent = styled.span`
  font-size: 22px;
  color: #005b4d;
  margin-top: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, #907d4c 90%);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 5px 3px;
  cursor: pointer;
  border: transparent;
  border-radius: 50%;
  background-color: #a8bb5c;
  font-size: 15px;
  color: #fff8e6;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //   const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    if (name === "delete") {
      setToDos((oldToDos) => {
        return oldToDos.filter((toDo) => toDo.id !== id);
      });
    }
  };

  return (
    <Wrapper>
      <ToDoContent>{text}</ToDoContent>
      {category !== Categories.DOING && (
        <Button name={Categories.DOING} onClick={onClick}>
          <i className="fas fa-business-time"></i>
        </Button>
      )}
      {category !== Categories.TO_DO && (
        <Button name={Categories.TO_DO} onClick={onClick}>
          <i className="fas fa-list-ul"></i>
        </Button>
      )}
      {category !== Categories.DONE && (
        <Button name={Categories.DONE} onClick={onClick}>
          <i className="fas fa-check-circle"></i>
        </Button>
      )}
      <Button name="delete" onClick={onDelete}>
        <i className="fas fa-trash-alt"></i>
      </Button>
    </Wrapper>
  );
}

export default ToDo;
