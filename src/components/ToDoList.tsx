import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Wrapper = styled.div`
  font-family: "CookieRun-Regular";
  height: 100vh;
`;

const WrapperItem = styled.div`
  background-color: #a8bb5c;
  /* background-color: #ffc75f; */
  border-radius: 15px;
  /* width: 35%; */
  max-width: 620px;
  height: 80%;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #005b4d;
  text-align: center;
  padding-top: 55px;
`;

const SelectorInput = styled.div`
  display: flex;
  justify-content: center;
  & > select {
    font-family: "CookieRun-Regular";
    padding: 0px 5px;
    margin-top: 10px;
    height: 35px;
    border-radius: 5px;
    border: transparent;
  }
`;
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState); // atom value & modifier함수 반환

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Wrapper>
      <WrapperItem>
        <Title>TO DO LIST</Title>
        {/* <hr /> */}
        <SelectorInput>
          <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </select>
          <CreateToDo />
        </SelectorInput>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </WrapperItem>
    </Wrapper>
  );
}

export default ToDoList;
