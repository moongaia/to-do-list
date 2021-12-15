import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const Wrapper = styled.form``;

const Input = styled.input`
  font-family: "CookieRun-Regular";
  font-size: 18px;
  padding: 6px 8px;
  border-radius: 5px;
  border: transparent;
  border-bottom: #4e2b00 4px solid;
  outline: none;
  background-color: #a8bb5c;
  margin: 0px 8px;
  @media screen and (max-width: 370px) {
    width: 150px;
  }
`;
const Button = styled.button`
  font-size: 25px;
  color: #4e2b00;
  cursor: pointer;
  padding: 10px 8px;
  border-radius: 5px;
  border: transparent;
  background-color: #a8bb5c;
  :hover {
    color: #fff8e6;
    transition: all 0.2s ease-in-out;
    transform: scale(1.2);
  }
`;
function CreateToDo() {
  const TODOS_KEY = "toDos";
  const savedToDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  localStorage.setItem(TODOS_KEY, JSON.stringify(savedToDos));
  // const savedToDos = localStorage.getItem(TODOS_KEY);
  // if (savedToDos) {
  //   const parsedToDos = JSON.parse(savedToDos);
  //   toDos = parsedToDos;
  //   console.log(parsedToDos);
  // }

  return (
    <Wrapper onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: "Please write a To-Do" })}
        placeholder="Write a to do"
      />
      <Button>
        <i className="fas fa-pencil-alt"></i>
      </Button>
    </Wrapper>
  );
}

export default CreateToDo;
